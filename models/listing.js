const mongoose = require("mongoose");
const Schema = mongoose.Schema; //ye aisa likhe toh baar baar mongoose.Schema likhne ki zarurat nahi padti
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId, // This is a reference to the ObjectId of the Review model
      ref: "Review", // Reference to the Review model
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); // listing.reviews array ke andar jitni bhi review id hai uska list bana lenge aur agar _is uss list ka part ho toh sabko delete kar denge
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
// This code defines a Mongoose schema for a listing in a MongoDB database.
