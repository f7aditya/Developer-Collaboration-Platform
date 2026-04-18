import express from "express";
import { createRoom, getRoom } from "../contollers/roomController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("./create", protect, createRoom);
router.get("./:roomId", protect, getRoom);

export default router;
