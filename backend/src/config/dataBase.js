const mongoose = require("mongoose");

const connectDb = async () => {

  try{
    
    await mongoose.connect(
  
      process.env.DB_CONNECTION_URL
     );
     console.log("DataBase Connected");

  }
  catch(err){
    console.error("❌ Database Connection Failed:", err.message);

  }
   
   
 
};

module.exports = connectDb;
