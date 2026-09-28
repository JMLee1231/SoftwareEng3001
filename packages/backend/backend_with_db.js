import cors from "cors";
import express from "express";
import userServices from "./models/user-services.js";

const app = express();
const port = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("User API is running.");
});

app.get("/users", async (req, res) => {
  try {
    const users = await userServices.getUsers(req.query.name, req.query.job);
    res.send({ users_list: users });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await userServices.findUserById(req.params.id);
    if (user === null) {
      res.status(404).send("Resource not found.");
      return;
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.post("/users", async (req, res) => {
  try {
    const savedUser = await userServices.addUser(req.body);
    res.status(201).send(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).send("Unable to create user.");
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await userServices.deleteUserById(req.params.id);
    if (deletedUser === null) {
      res.status(404).send("Resource not found.");
      return;
    }
    res.send(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.listen(port, () => {
  console.log(`User API listening at http://localhost:${port}`);
});
