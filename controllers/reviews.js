const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id); // Finding the listing by its ID
  let newReview = new Review(req.body.review); // Creating a new review instance with the data from the request body
  newReview.author = req.user._id;
  listing.reviews.push(newReview); // Pushing the new review into the listing's reviews array

  await newReview.save();
  await listing.save(); // Saving the updated listing with the new review
  req.flash("success", "New Review Created");

  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //review wale array me jo bhi review id match karega usko array se delete/pull karenge
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");

  res.redirect(`/listings/${id}`);
};
