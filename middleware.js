const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js"); // Importing the ExpressError class for custom error handling
const { listingSchema, reviewSchema } = require("./schema.js"); // Importing the listing schema

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Passport automaticaly does the authentication task
    // creating new parameter to get to original requested page
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); // Validating the request body against the listing schema
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", "); // Extracting error messages from the validation result
    throw new ExpressError(400, errMsg); // Throwing an error if the validation fails
  } else {
    next(); // Proceeding to the next middleware if validation is successful
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); // Validating the request body against the listing schema
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", "); // Extracting error messages from the validation result
    throw new ExpressError(400, errMsg); // Throwing an error if the validation fails
  } else {
    next(); // Proceeding to the next middleware if validation is successful
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
