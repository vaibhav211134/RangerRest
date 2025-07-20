const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // Delete all existing listings
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "687883c34ad83a69c8093003",
    image: {
      url: obj.image?.url || "",
      filename: obj.image?.filename || "",
    },
  })); // adding owner to each data in db
  await Listing.insertMany(initData.data); // Insert initial data
  console.log("Database was initialized");
};

initDB();
