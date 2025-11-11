const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user", // If you have a User model; otherwise you can remove `ref`
    required: false,
  },
  geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    console.log("Deleting listing:", listing._id);
    console.log("Associated reviews:", listing.reviews);

    const deleted = await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(`Deleted ${deleted.deletedCount} reviews.`);
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
