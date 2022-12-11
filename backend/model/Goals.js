const mongoose = require("mongoose");

const GoalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", GoalSchema);
