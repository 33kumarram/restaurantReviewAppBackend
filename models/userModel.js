const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // require:true
    },
    first_name: {
      type: String,
      // required: true
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      // required: true
    },
    personal_details: {
      gender: {
        type: String,
        // required: true
      },
      date_of_birth: {
        type: Date,
        // required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      mobile_num: {
        type: Number,
        // required: true
      },
    },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Lead", "Developer"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// hash the password before saving it
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  } else {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const users = mongoose.model("users", userSchema);

module.exports = users;
