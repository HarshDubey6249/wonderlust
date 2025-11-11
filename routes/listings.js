const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const Listing = require("../models/listing.js"); // ✅ make sure Listing model is imported


//-----------------------------router.route---------------------------------------------

// 🔍 Search route should come BEFORE /:id
router.get("/search", async (req, res) => {
  const { search } = req.query;

  let searchResults = [];
  if (search && search.trim() !== "") {
    searchResults = await Listing.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ]
    });
  }

  res.render("listings/searchResults", { searchResults, search });
});


// 🏡 Index route
router
  .route("/")
  .get(wrapAsync(listingControllers.index)) // index route
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingControllers.createListing) // create route
  );

// 🆕 New listing form
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

// 🧾 Show / Update / Delete route (keep this LAST)
router
  .route("/:id")
  .get(wrapAsync(listingControllers.showListing)) // show route
  .put(
    validateListing,
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingControllers.updateListing) // update route
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.destroyListing) // delete route
  );

//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingControllers.renderEditForm));
module.exports = router;
