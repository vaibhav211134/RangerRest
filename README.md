<div align="center">

# 🏕️ RangerRest

### *Discover. Book. Explore.*

**A full-stack campground discovery and booking platform for the modern outdoor enthusiast.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=render)](https://rangerrest.onrender.com/listings)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)](https://www.mapbox.com/)

</div>

---

## 🌲 Overview

**RangerRest** is a sophisticated full-stack web application that reimagines how outdoor enthusiasts discover and share campgrounds. From interactive maps to community-driven reviews, RangerRest delivers a seamless, end-to-end experience — whether you're posting a hidden gem or finding your next base camp.

> 🔗 **Live Application**: [rangerrest.onrender.com/listings](https://rangerrest.onrender.com/listings)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Secure register/login system powered by Passport.js with local strategy |
| 🏕️ **Campground Listings** | Full CRUD operations — create, browse, edit, and delete campground entries |
| 🗺️ **Interactive Maps** | Mapbox-powered location visualization for every campground |
| ⭐ **Review System** | Community-driven ratings and reviews for every listing |
| 🖼️ **Image Uploads** | Cloudinary-integrated image management for high-quality campground photos |
| 📱 **Responsive Design** | Mobile-friendly UI built with EJS templating and custom CSS |
| 🔒 **Session Management** | Persistent sessions stored securely with MongoDB |
| ⚠️ **Error Handling** | Custom middleware and error classes for graceful failure recovery |
| ✅ **Data Validation** | Schema-level validation using Joi to ensure data integrity |

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Local Strategy)
- **Session Store**: connect-mongo
- **Validation**: Joi
- **File Uploads**: Multer

### Frontend
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Custom CSS
- **Client-side JS**: Vanilla JavaScript

### Cloud & Third-Party Services
- **Maps**: Mapbox SDK
- **Image Storage**: Cloudinary
- **Hosting**: Render

### Dev Utilities
- `method-override` — RESTful verb support in HTML forms
- `connect-flash` — Flash messages for user feedback
- `dotenv` — Environment variable management

---

## 📁 Project Structure

```
RangerRest/
├── app.js                    # Main application entry point
├── cloudConfig.js            # Cloudinary configuration
├── middleware.js             # Custom middleware functions
├── schema.js                 # Joi validation schemas
│
├── controllers/              # MVC — Route logic handlers
│   ├── listings.js           # Campground CRUD operations
│   ├── reviews.js            # Review management
│   └── users.js              # User account operations
│
├── models/                   # Mongoose schemas
│   ├── listing.js            # Campground model
│   ├── review.js             # Review model
│   └── user.js               # User model
│
├── routes/                   # Express route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/                    # EJS templates
│   ├── listings/             # Campground pages (index, show, new, edit)
│   ├── users/                # Auth pages (login, signup)
│   ├── includes/             # Reusable partials (navbar, footer, flash)
│   └── layouts/              # Base layout (boilerplate.ejs)
│
├── public/                   # Static assets
│   ├── css/                  # Stylesheets
│   └── js/                   # Client-side scripts (map.js, script.js)
│
├── utils/                    # Utilities
│   ├── ExpressError.js       # Custom error class
│   └── wrapAsync.js          # Async error wrapper
│
└── init/                     # Database seed scripts
    ├── data.js
    └── index.js
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account
- A [Mapbox](https://www.mapbox.com/) account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd RangerRest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=<your-mongodb-atlas-connection-string>
SECRET=<your-session-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET=<your-cloudinary-api-secret>
MAPBOX_TOKEN=<your-mapbox-access-token>
```

### 4. Seed the Database *(Optional)*

Populate the database with sample campground data:

```bash
node init/index.js
```

### 5. Start the Application

```bash
node app.js
```

Then open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## 🗺️ Key Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/listings` | Browse all campgrounds |
| `GET` | `/listings/new` | Create a new campground |
| `GET` | `/listings/:id` | View campground details |
| `PUT` | `/listings/:id` | Update a campground |
| `DELETE` | `/listings/:id` | Delete a campground |
| `POST` | `/listings/:id/reviews` | Post a review |
| `GET` | `/users/register` | User registration page |
| `GET` | `/users/login` | User login page |

---

## 🤝 Contributing

Contributions are always welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add: YourFeatureName"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open** a Pull Request

Please make sure your code follows the existing structure and is well-commented.

---

<div align="center">

Built with ❤️ for the outdoors

**[🌐 Visit RangerRest](https://rangerrest.onrender.com/listings)**

</div>
