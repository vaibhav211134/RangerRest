if (process.env.NODE_ENV != "production") {
  // at time of deployment
  require("dotenv").config();
}
const express = require("express");
const app = express(); // link from the mongoose documentation
const dbUrl = process.env.ATLASDB_URL;

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js"); // Importing the ExpressError class for custom error handling
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(methodOverride("_method")); // Middleware to allow PUT and DELETE methods in HTML forms
app.engine("ejs", ejsMate); // Using ejsMate for layout support in EJS templates
app.use(express.static(path.join(__dirname, "/public"))); // Serving static files from the public directory

const store = MongoStore.create({
  //this code is to connect mongo
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, //Update data after 24hrs
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  // using middleware to access flash message
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // curr-user stores info about req.user so that it can be used in ejs file
  next();
});

app.use("/listings", listingRouter); // all routes are in listing.js file in route folder
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*rest", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found")); // Handling all other routes that are not defined
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
