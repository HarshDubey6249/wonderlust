
if(process.env.NODE_ENV !="production"){
require('dotenv').config({ quiet: true });
}


const express = require("express");const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const ejsMate = require("ejs-mate");
const ExpressError = require("./utlis/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const app = express();
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const dbUrl=process.env.ATL_URL;

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  //await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  await mongoose.connect(dbUrl);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const listingRouter=require("./routes/listings.js")
const reviewRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
const { date } = require("joi");
//--------------------------
const store = MongoStore.create({
    mongoUrl :dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});


const sessionOptions={

  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() +7 *24 * 60 *60 *1000,
    maxAge:7 *24 * 60 *60 *1000,
    httpOnly:true,
  }
};
// app.get("/", (req, res) => {
//   res.send("hi I am harsh dubey");
// });
//============================= flash session======================================================
 app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use( new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student",
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

//---------------------------------------------------------------------

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



//--------------------------------r->f----------------------------------------------------------------------
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8000, () => {
  console.log("Server is running at http://10.214.219.221:8000");
});
