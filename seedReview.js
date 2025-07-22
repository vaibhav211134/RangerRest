require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/review");
const User = require("./models/user");
const dbUrl = process.env.ATLASDB_URL;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const comments = [
  "Amazing experience! Will come again.",
  "Great place to relax and enjoy.",
  "Very clean and well maintained.",
  "Hosts were kind and responsive.",
  "Not worth the price.",
  "Too noisy, couldn't sleep well.",
  "Location was perfect, near the main attractions.",
  "Facilities could be better.",
  "Would definitely recommend to others.",
  "Okay for one night stay.",
  "Excellent hospitality.",
  "The view was breathtaking.",
  "WiFi was weak, but everything else was great.",
  "Loved the interior and vibe.",
  "Had some cleanliness issues.",
  "Perfect for weekend getaway.",
  "Overpriced and not well managed.",
  "Friendly host, smooth check-in.",
  "Felt like home!",
  "Room smelled musty.",
  "Value for money.",
  "Below average experience.",
  "Could use better lighting.",
  "Really cozy and beautiful.",
  "Didn't meet expectations.",
  "Beautiful property, peaceful environment.",
  "Too far from main city.",
  "Security was an issue.",
  "Had an amazing stay.",
  "A hidden gem!",
  "Basic amenities were missing.",
  "Pictures were misleading.",
  "Host went out of their way to help.",
  "Perfect for couples.",
  "Family friendly and spacious.",
  "Noise from neighborhood disturbed us.",
  "Super clean and hygienic.",
  "Broken shower and poor service.",
  "Great food options nearby.",
  "Felt unsafe at night.",
  "Easy to check in and out.",
  "A bit overpriced for what it offers.",
  "Interior was outdated.",
  "Enjoyed the backyard garden.",
  "Wouldn't recommend for families.",
  "Furnishing was top notch.",
  "Great for work-from-home setup.",
  "No hot water at night.",
  "Outstanding stay!",
  "Host did not respond in time.",
  "Tranquil and relaxing space.",
  "Sheets were not clean.",
  "Host was very accommodating.",
  "Terrible smell in the room.",
  "Loved every moment here.",
  "TV did not work.",
  "Perfect balance of luxury and comfort.",
  "Really disappointing stay.",
  "Everything was just right.",
  "Bug problem in the room.",
  "Impressive service and attention to detail.",
  "Too cramped for 3 people.",
  "Very safe neighborhood.",
  "Bad experience overall.",
  "Affordable and great location.",
  "Host forgot to provide towels.",
  "Lots of fun activities nearby.",
  "Mediocre at best.",
  "Would come again!",
  "Room was damp and cold.",
  "Loved the pool area.",
  "Bathroom could be cleaner.",
  "Smooth check-in process.",
  "Worst stay ever.",
  "Peaceful and scenic surroundings.",
  "Would not recommend this place.",
  "Excellent in every way.",
  "Not as described in the listing.",
  "Loved the hosts hospitality.",
  "Smelled like smoke.",
  "High quality furniture and appliances.",
  "Poor customer service.",
  "Truly a 5-star experience!",
  "Rundown and dirty.",
  "Such a calm vibe.",
  "Sketchy neighborhood.",
  "The place exceeded my expectations.",
  "Disappointing service.",
  "Very kid-friendly.",
  "Thin walls, could hear neighbors.",
  "So aesthetic!",
  "Will definitely be back.",
  "The kitchen was not functional.",
  "Loved the natural light inside.",
  "Terrible communication with host.",
  "Lots of nearby cafes and shops.",
  "Dirty linens and towels.",
  "Peaceful place for retreat.",
  "Poorly maintained property.",
  "I am definitely coming again.",
  "Not worth the hype.",
  "Would rate 10/10!",
  "Nothing special.",
  "Exceeded expectations!",
  "Not clean at all.",
  "Everything we needed was there.",
];

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const seedReviews = async () => {
  const listings = await Listing.find({}).populate("owner");
  const users = await User.find({});

  for (let listing of listings) {
    for (let i = 0; i < 3; i++) {
      let randomUser;
      do {
        randomUser = users[Math.floor(Math.random() * users.length)];
      } while (randomUser._id.equals(listing.owner._id)); // Avoid reviewing own listing

      const review = new Review({
        comment: sample(comments),
        rating: Math.floor(Math.random() * 5) + 1,
        author: randomUser._id,
      });

      await review.save();
      listing.reviews.push(review);
    }

    await listing.save();
  }

  console.log("✅ Seeding reviews complete.");
};

seedReviews().then(() => mongoose.connection.close());

// const mongoose = require("mongoose");
// const Listing = require("./models/listing");
// const Review = require("./models/review");
// const User = require("./models/user");

// mongoose.connect("mongodb+srv://<your_connection_string>", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", async () => {
//   console.log("✅ Database connected");

//   try {
//     const users = await User.find({});
//     const listings = await Listing.find({});

//     if (users.length < 2 || listings.length < 1) {
//       console.log("🚫 Not enough users or listings to create reviews.");
//       process.exit();
//     }

// const sampleComments = [
//   "Amazing experience! Will come again.",
//   "Great place to relax and enjoy.",
//   "Very clean and well maintained.",
//   "Hosts were kind and responsive.",
//   "Not worth the price.",
//   "Too noisy, couldn't sleep well.",
//   "Location was perfect, near the main attractions.",
//   "Facilities could be better.",
//   "Would definitely recommend to others.",
//   "Okay for one night stay.",
//   "Excellent hospitality.",
//   "The view was breathtaking.",
//   "WiFi was weak, but everything else was great.",
//   "Loved the interior and vibe.",
//   "Had some cleanliness issues.",
//   "Perfect for weekend getaway.",
//   "Overpriced and not well managed.",
//   "Friendly host, smooth check-in.",
//   "Felt like home!",
//   "Room smelled musty.",
//   "Value for money.",
//   "Below average experience.",
//   "Could use better lighting.",
//   "Really cozy and beautiful.",
//   "Didn't meet expectations.",
//   "Beautiful property, peaceful environment.",
//   "Too far from main city.",
//   "Security was an issue.",
//   "Had an amazing stay.",
//   "A hidden gem!",
//   "Basic amenities were missing.",
//   "Pictures were misleading.",
//   "Host went out of their way to help.",
//   "Perfect for couples.",
//   "Family friendly and spacious.",
//   "Noise from neighborhood disturbed us.",
//   "Super clean and hygienic.",
//   "Broken shower and poor service.",
//   "Great food options nearby.",
//   "Felt unsafe at night.",
//   "Easy to check in and out.",
//   "A bit overpriced for what it offers.",
//   "Interior was outdated.",
//   "Enjoyed the backyard garden.",
//   "Wouldn't recommend for families.",
//   "Furnishing was top notch.",
//   "Great for work-from-home setup.",
//   "No hot water at night.",
//   "Outstanding stay!",
//   "Host did not respond in time.",
//   "Tranquil and relaxing space.",
//   "Sheets were not clean.",
//   "Host was very accommodating.",
//   "Terrible smell in the room.",
//   "Loved every moment here.",
//   "TV did not work.",
//   "Perfect balance of luxury and comfort.",
//   "Really disappointing stay.",
//   "Everything was just right.",
//   "Bug problem in the room.",
//   "Impressive service and attention to detail.",
//   "Too cramped for 3 people.",
//   "Very safe neighborhood.",
//   "Bad experience overall.",
//   "Affordable and great location.",
//   "Host forgot to provide towels.",
//   "Lots of fun activities nearby.",
//   "Mediocre at best.",
//   "Would come again!",
//   "Room was damp and cold.",
//   "Loved the pool area.",
//   "Bathroom could be cleaner.",
//   "Smooth check-in process.",
//   "Worst stay ever.",
//   "Peaceful and scenic surroundings.",
//   "Would not recommend this place.",
//   "Excellent in every way.",
//   "Not as described in the listing.",
//   "Loved the hosts hospitality.",
//   "Smelled like smoke.",
//   "High quality furniture and appliances.",
//   "Poor customer service.",
//   "Truly a 5-star experience!",
//   "Rundown and dirty.",
//   "Such a calm vibe.",
//   "Sketchy neighborhood.",
//   "The place exceeded my expectations.",
//   "Disappointing service.",
//   "Very kid-friendly.",
//   "Thin walls, could hear neighbors.",
//   "So aesthetic!",
//   "Will definitely be back.",
//   "The kitchen was not functional.",
//   "Loved the natural light inside.",
//   "Terrible communication with host.",
//   "Lots of nearby cafes and shops.",
//   "Dirty linens and towels.",
//   "Peaceful place for retreat.",
//   "Poorly maintained property.",
//   "I am definitely coming again.",
//   "Not worth the hype.",
//   "Would rate 10/10!",
//   "Nothing special.",
//   "Exceeded expectations!",
//   "Not clean at all.",
//   "Everything we needed was there.",
// ];

//     for (let i = 0; i < 100; i++) {
//       const comment = sampleComments[i];
//       const rating = Math.floor(Math.random() * 5) + 1;

//       // Choose a random user and random listing
//       const randomUser = users[Math.floor(Math.random() * users.length)];
//       const randomListing =
//         listings[Math.floor(Math.random() * listings.length)];

//       const review = new Review({
//         comment,
//         rating,
//         author: randomUser._id,
//       });

//       await review.save(); // Save review

//       // Push review into listing
//       randomListing.reviews.push(review._id);
//       await randomListing.save(); // Save updated listing
//     }

//     console.log("✅ Seeded 100 reviews successfully!");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// });
