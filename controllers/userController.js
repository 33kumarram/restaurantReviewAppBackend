const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");
const generateToken = require("../config/generateToken");

const register = asyncHandler(async (req, res) => {
  let data = req.body;

  if (!data || !data?.personal_details?.email || !data.password) {
    res.status(400);
    throw new Error("Please Fill all the details");
  }

  const userExists = await Users.findOne({
    $or: [
      { "personal_details.email": data?.personal_details?.email },
      // { "personal_details.mobile_num": data?.personal_details?.mobile_num },
    ],
  });

  if (userExists) {
    console.log(userExists);
    res.status(400);
    throw new Error("User already registered");
  }

  try {
    const newUser = await Users.create(data);
    res.status(201).json({
      id: newUser._id,
      emp_id: newUser.emp_id,
      title: newUser.title,
      first_name: newUser.first_name,
      middle_name: newUser.middle_name,
      last_name: newUser.last_name,
      role: newUser.role,
      token: generateToken(newUser.id),
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Error occurred while registering");
  }
});

const logIn = asyncHandler(async function (req, res) {
  const { email_id, password } = req.body;

  const user = await Users.findOne(
    { "personal_details.email_id": email_id },
    "-personal_details"
  );
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // verify password using compare password function defined in the user model
  if (await user.comparePassword(password)) {
    res.status(201).json({
      id: user._id,
      title: user.title,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

module.exports = {
  register,
  logIn,
};
