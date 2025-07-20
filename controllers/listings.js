const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  console.log("OWNER:", listing.owner);

  if (!listing) {
    req.flash("error", "Listing you requested doesnot exist");
    return res.redirect("/listings");
  }
  console.log(listing);
  console.log("Listing reviews and authors:");
  for (let review of listing.reviews) {
    console.log({
      id: review._id,
      author: review.author,
    });
  }

  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  // let listing = req.body.listing; // Extracting the listing data from the request body. its like a blurprint of the listing.
  const newListing = new Listing(req.body.listing); // this creates a new instance of the Listing model with the data from the request body.
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry; //ye value mapbox se return ho raha h

  let savedListing = await newListing.save(); // Saving the new listing to the database
  console.log(savedListing);
  req.flash("success", "New Listing Created");
  res.redirect("/listings"); // Redirecting to the index route after saving the listing
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested doesnot exist");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload/w_250");
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  // let { id } = req.params;
  // let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Using the spread operator to update the listing with the new data from the request body

  let { id } = req.params;

  // Fetch full document
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  // Update basic fields
  Object.assign(listing, req.body.listing);

  if (req.body.listing.location) {
    const response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    listing.geometry = response.body.features[0].geometry;
    console.log("Updated Geometry:", listing.geometry);
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename }; // new image ka value set kar rahe
    // await listing.save();
  }

  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id); // Deleting the listing by its ID
  console.log(deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings"); // Redirecting to the index route after deleting the listing
};
