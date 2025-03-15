
const mongoose=require("mongoose");

const ConnectionRequestSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // this is the refrence to the User collection
        required:true,
    },

    ToUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        },
        required:true,
    }


},{
    timestamps:true,
});

//this make the searching fast by putting the index 
ConnectionRequestSchema.index({fromUserId:1, ToUserId:1})




ConnectionRequestSchema.pre("save",function (next){
   const ConnectionRequest=this;
   //If the fromUSerId is equal to the ToUserId
   if(ConnectionRequest.fromUserId.equals(ConnectionRequest.ToUserId)){
     throw new Error("Cannot sent Connection Request to yourself")
   }

   next();


})

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",ConnectionRequestSchema);



module.exports=ConnectionRequestModel