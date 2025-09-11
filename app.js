const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const { connectDB } = require("./config/db");
const router = require("./routes/index.route");

const app = express();
app.use(cors());
app.use(express.json());

//connecting with the db and starting server
// connectDB().then(() => {
//   const port = process.env.PORT || 5001;
//   console.log("MongoDb setup done");
//   app.listen(port, () => {
//     console.log(
//       `server has been succesfullly listening at http://localhost:${port}/`
//     );
//   });
// });

let isConnected = false;
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

app.use((req,res,next)=>{
  if(!isConnected){
    connectToMongoDB();
  }
  next();
})


app.get("/", (req, res) => {
  res.send("Hello from Learn Sphere backend!");
});
app.use("/api", router);

module.exports = app;