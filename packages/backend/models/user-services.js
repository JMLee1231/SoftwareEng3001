import mongoose from "mongoose";
import User from "./user.js";

mongoose
  .connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017/users")
  .catch((error) => console.error("MongoDB connection error:", error.message));

function getUsers(name, job) {
  const filters = {};

  if (name) filters.name = name;
  if (job) filters.job = job;

  return User.find(filters);
}

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  return new User(user).save();
}

function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

export default {
  addUser,
  deleteUserById,
  findUserById,
  getUsers,
};
