const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: "3",
      maxlength: "15",
    },
    lastName: {
      type: String,
      minlength: "3",
      maxlength: "15",
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email Address:" + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password:" + value);
        }
      },
    },

    age: {
      type: Number,
      min: 18,
      minlength: "2",
      maxlength: "2",
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data not found");
        }
      },
    },
    photoUrl: {
      type: String,
      default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default description of the user",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 5) {
          throw new Error("Minimize the Limit");
        } else {
          return value;
        }
      },
    },

    isPremium:{
      type:Boolean,
      defaut:false
    },

    membershipType:{
      type:String
    }



  },
  {
    timestamps: true,
  }
);

UserSchema.index({ firstName: 1, lastName: 1 });
UserSchema.index({ age: 1 });

UserSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DevTinder@123", {
    expiresIn: "1d",
  });

  return token;
};

UserSchema.methods.ValidatePassword = async function (PasswordInputByUser) {
  const user = this;

  const PasswordHash = user.password;

  const IsValidPassword = await bcrypt.compare(
    PasswordInputByUser,
    PasswordHash
  );

  return IsValidPassword;
};

//post mailer
UserSchema.post("save", async function (doc) {
  try {
    // console.log("Doc", doc);


    //creating the transporter
    const transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,

        },

    })


      //creating the sendmail
      let info=await transporter.sendMail({

        from:`Devtinder  by-CEO,Deepanshu`,

        to:doc.emailId,
        subject:"New Account Created",
        html:"<h1>Signup Completed</h1> <p>Login and explore</p>"

      })

      // console.log("INFO",info)
  } catch (err) {
    console.error(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
