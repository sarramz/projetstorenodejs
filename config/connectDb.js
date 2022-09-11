//install and set up mongoose
const mongoose = require("mongoose");
require("dotenv").config();

//to connect db 
const URL="mongodb+srv://sarra:23466957@cluster0.phyqo0n.mongodb.net/?retryWrites=true&w=majority"
const connectDb = async () => {
  console.log(URL)
try {
  await mongoose.connect(URL);
  
  console.log("db is successfuly connected");
} catch (error) {
  console.log("connection to db is failed ");
}
};
module.exports=connectDb