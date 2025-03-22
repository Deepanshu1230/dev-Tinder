const express=require("express");
const {userAuth}=require("../middlewares/auth");
const {Chat}=require("../models/chat");
const chatRouter=express.Router();
const User=require("../models/user")


chatRouter.get("/chat/:targetUser",userAuth,async (req,res) =>{
    
    const { targetUser}=req.params;
    const userId=req.UserInfo._id;
    

    try{


        //Will create a chat if chat exir=st then another case if does'nt than another
        //If chat exist


        let chat=await Chat.findOne({
            participants:{ $all:[userId,targetUser]},

        }).populate({
            path:"messages.SenderId",
            select:"firstName lastName photoUrl"
        });

        if(!chat){
            chat=new Chat({
                participants:[userId,targetUser],
                messages:[]

            })
            await chat.save();
        }

        let targetUserData = await User.findById(targetUser).select(
            "firstName lastName photoUrl"
          );

        
    res.json({
         chat,
        targetUser:targetUserData, // Include target user details in response
      });
        

    }
    catch(err){
        console.log(err.message)
    }


});

module.exports=chatRouter;