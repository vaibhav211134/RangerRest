const mongoose = require("mongoose");
const Listing = require("./models/listing"); // Adjust if your path is different

// Connect to your MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wanderlust", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return fixListings();
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Function to add default geometry to listings missing it
async function fixListings() {
  try {
    const listings = await Listing.find({ geometry: { $exists: false } });

    if (listings.length === 0) {
      console.log("✅ All listings already have geometry.");
      mongoose.connection.close();
      return;
    }

    for (let listing of listings) {
      listing.geometry = {
        type: "Point",
        coordinates: [77.209, 28.6139], // Default location: Delhi
      };
      await listing.save();
      console.log(`✅ Fixed: ${listing.title}`);
    }

    console.log("🎉 All missing geometry fields added!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error updating listings:", err);
    mongoose.connection.close();
  }
}
