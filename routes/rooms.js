import express from "express";

const router = express.Router();

import {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
  updateRoomAvailability
} from "../controllers/room.js";

import { verifyAdmin } from "../utils/verifytoken.js";

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get("/", getRooms);

export default router;


