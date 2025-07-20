const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Importing the wrapAsync utility for error handling
const Listing = require("../models/listing.js"); // Importing the Listing model
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route
  .post(
    //create route
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//new route with middleware
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //show route
  .put(
    // update route
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"), // multer will save imaage first then we will validate
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // delete route

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
