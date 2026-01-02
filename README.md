🌍 WanderLust – Travel Listing Web Application

WanderLust is a full-stack web application that allows users to explore, create, and manage travel destinations.
The project is inspired by platforms like Airbnb and is built to understand full-stack development, REST APIs, authentication, authorization, and MVC architecture.

🚀 Features

🔐 User Authentication & Authorization

🏡 Create, Read, Update, Delete (CRUD) listings

🖼️ Image upload with cloud storage

⭐ Reviews & ratings system

📍 Location-based listings with maps

🛡️ Secure routes using middleware

📱 Fully responsive UI

⚠️ Error handling & validations

🛠️ Tech Stack
Frontend

HTML

CSS

Bootstrap

EJS (Embedded JavaScript Templates)

Backend

Node.js

Express.js

Database

MongoDB

Mongoose ODM

Tools & Services

Cloudinary (Image Storage)

Mapbox (Maps & Geolocation)

Passport.js (Authentication)

Express-session

Joi (Validation)
------------------------------------------------------------------
📂 Project Structure
wanderlust/
│
├── controllers/           # Business logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/                # MongoDB schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/                # Application routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/                 # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── error.ejs
│
├── public/                # Static assets
│   ├── css/
│   └── js/
│
├── middleware/            # Custom middleware
│   ├── isLoggedIn.js
│   └── isOwner.js
│
├── utils/                 # Utility files
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── app.js                 # Main application file
├── package.json
└── README.md
-------------------------------------------------------------

🔄 Application Flow (Flowchart)
User
 │
 ▼
Browser (EJS + Bootstrap)
 │
 ▼
Routes (Express.js)
 │
 ▼
Controllers
 │
 ▼
Models (Mongoose)
 │
 ▼
MongoDB Database
 │
 ▼
Response back to User

🔐 Authentication Flow
User Signup/Login
        │
        ▼
 Passport.js Strategy
        │
        ▼
 Session Created
        │
        ▼
 Protected Routes Access
 -------------------------------------------------------------------------

🧩 MVC Architecture Used
Layer	Responsibility
Model	Database schema & queries
View	UI using EJS templates
Controller	Business logic & request handling
🧪 Validation & Error Handling

Joi used for server-side validation

Custom ExpressError class

Global error handler middleware

Flash messages for better UX
--------------------------------------------------------

📸 Image Upload Flow
User Upload Image
       │
       ▼
 Multer Middleware
       │
       ▼
 Cloudinary Storage
       │
       ▼
 Image URL saved in MongoDB

🗺️ Maps Integration

Uses Mapbox API

Displays listing location on interactive maps

Geocoding converts place names to coordinates

🔒 Security Features

Password hashing using Passport-local-mongoose

Authorization checks (Owner-only edit/delete)

Session-based authentication

Protected routes with middleware

🧑‍💻 Installation & Setup
# Clone repository
git clone https://github.com/your-username/wanderlust.git

# Install dependencies
npm install

# Run application
node app.js


Create a .env file and add:

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MAPBOX_TOKEN=your_token

📈 Learning Outcomes

Full-stack web development

RESTful API design

MongoDB relationships

Authentication & Authorization

MVC architecture

Middleware usage

Deployment-ready project structure

🎯 Future Enhancements

Booking & payment system

Admin dashboard

Wishlist feature

Search & filter listings

Pagination & performance optimization

👨‍🎓 Author

Harsh Dubey
BSc IT Student
Aspiring Backend / Full-Stack Developer

⭐ Show Your Support

If you like this project, please ⭐ star the repository on GitHub.
