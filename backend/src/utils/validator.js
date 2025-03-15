const validator = require("validator");

const ValidatorSignup = (req) => {
  const { emailId, password, firstName, lastName, age, skills, photoUrl } =
    req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Enter the Valid email ID");
  } else if (!firstName || !lastName) {
    throw new Error("Write Valid Names");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter the Tough Password");
  }
};

const ValidateProfileEdit = (req) => {
  try {
    const IsAllowedUpdate = [
      "about",
      "skills",
      "photoUrl",
      "emailId",
      "age",
      "gender",
    ];

    const User = req.body;

    Object.keys(User).every((k) => IsAllowedUpdate.includes(k));

    if (!IsAllowedUpdate) {
      throw new Error("Enter the Valdi Updation");
    }
  } catch (err) {
    res.send("ERROR:" + err.message);
  }
};

module.exports = {
  ValidatorSignup,
  ValidateProfileEdit,
};
