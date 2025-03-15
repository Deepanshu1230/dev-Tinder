const mongoose = require("mongoose");

const connectDb = async () => {

  try{
    if (!process.env.DB_CONNECTION_SECRET) {
      throw new Error("❌ Missing DB_CONNECTION_SECRET in environment variables!");
    }
    await mongoose.connect(
  
      process.env.DB_CONNECTION_SECRET
     );
     console.log("DB Connected");

  }
  catch(err){
    console.error("❌ Database Connection Failed:", error.message);

  }
   
   
 
};

module.exports = connectDb;
