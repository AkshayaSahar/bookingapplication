import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
      if (!req.body.username) {
        return res.status(400).json({ message: "Please enter a username." });
      }
      if (!req.body.email) {
        return res.status(400).json({ message: "Please enter an email." });
      }
      if (!req.body.password) {
        return res.status(400).json({ message: "Please enter a password." });
      }

      const [existingUsername, existingEmail] = await Promise.all([
        User.findOne({ username: req.body.username }),
        User.findOne({ email: req.body.email })
      ]);
  
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken." });
      }
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already registered." });
      }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save(); // save() saves data in the database and it is time taking so we put await.
    const { password, isAdmin, ...otherDetails } = newUser._doc;
    res.status(200).send({details: { ...otherDetails }, isAdmin});

  } catch (err) {
    if (err.name === 'ValidationError') {
      const emailError = err.message.split("email: ");
      return res.status(400).send({ message: emailError[1] }); 
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    if (!req.body.username) {
      return res.status(400).json({ message: "Please enter a username." });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: "Please enter a password." });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) { return next(createError(400, "Wrong password or username")); }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({details: { ...otherDetails }, isAdmin});

  } catch (err) {
    next(err);
  }
};

// login
// if i dont give both uname , psw -> says user not found 