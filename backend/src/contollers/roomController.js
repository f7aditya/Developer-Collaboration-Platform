import Room from "../models/Room.js";

import { nanoid } from "nanoid";

const createRoom = async (req, res) => {
  try {
    const { name, language } = req.body;

    const roomId = nanoid(10);

    const newRoom = await Room.create({
      roomId,
      name: name || "Untitled Project",
      owner: req.user._id,
      language: language || "C++",
    });

    res.status(201).json({
      success: true,
      room: newRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ roomId }).populate(
      "owner",
      "username email",
    );

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export { createRoom, getRoom };
