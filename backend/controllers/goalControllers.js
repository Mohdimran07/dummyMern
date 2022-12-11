const asyncHandler = require("express-async-handler");

const Goal = require("../model/Goals");
const User = require("../model/User");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
  // console.log(goals)
  res.status(200).send(goals);
});
const createGoals = asyncHandler(async (req, res) => {
  try {
    const newGoal = await Goal.create({
      title: req.body.title,
      amount : req.body.amount,
      category: req.body.category,
      user: req.user.id,
      createdAt: Date.now(),
    });
   

    await newGoal.save();

    return res.status(201).json(newGoal);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error({ message: "data not found" });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(404);
    throw new Error("user not Authorized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (goal.user.toString() !== user.id) {
      res.status(404);
      throw new Error("user not Authorized");
    }

    await goal.remove();

    res.status(200).send({ message: `Deleted goals ${req.params.id}` });
  } catch (error) {
    return res.status(500).json("No such data to delete");
  }
});

module.exports = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};
