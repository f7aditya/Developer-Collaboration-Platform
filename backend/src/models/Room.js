import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      unique: true,
      required: true,
    },

    name: { type: String, default: "Untitled Project" },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    code: { type: String, default: "// Write your code here..." },

    language: { type: String, default: "javascript" },
  },
  { timestamps: true },
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
