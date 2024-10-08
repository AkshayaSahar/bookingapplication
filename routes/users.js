import express from "express";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifytoken.js";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("you are logged in!");
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("you are logged in and you can delete your account");
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello Admin, you are logged in and you can delete all accounts");
})

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getUsers);

export default router;
