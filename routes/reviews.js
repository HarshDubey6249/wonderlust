const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utlis/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Post Review  Route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//Delete Route for review
router.delete("/:reviewID",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;