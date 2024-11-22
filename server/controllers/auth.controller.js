import Joi from "joi";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmpassword: Joi.string().valid(Joi.ref("password")).required(),
  profilepic: Joi.string().uri().optional(),
});

export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      profilepic,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profilepic,
    });

    const savedUser = await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  res.send("Login user");
};

export const logout = async (req, res, next) => {
  res.send("Logout user");
};
