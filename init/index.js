const mongoose = require("mongoose");
const seedjsa = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const intDB = async () => {
  await Listing.deleteMany({});
  seedjsa.data=seedjsa.data.map((obj)=>({...obj ,owner:"690b44f401d210de9742f1b4"}));
  await Listing.insertMany(seedjsa.data);
  console.log(seedjsa.data);
  console.log("data was initialized");
};

intDB();



