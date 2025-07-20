const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js"); // Importing the wrapAsync utility for error handling
const ExpressError = require("../utils/ExpressError.js"); // Importing the ExpressError class for custom error handling
const Review = require("../models/review.js"); // Importing the Review model
const Listing = require("../models/listing.js"); // Importing the Listing model
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Post Review route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
