import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
  ],
};

app.use(cors());
app.use(express.json());

const findUsers = (name, job) =>
  users.users_list.filter(
    (user) =>
      (name === undefined || user.name === name) &&
      (job === undefined || user.job === job),
  );

const findUserById = (id) =>
  users.users_list.find((user) => user.id === id);

function generateId() {
  let id;

  do {
    id = Math.random().toString(36).slice(2, 8);
  } while (findUserById(id) !== undefined);

  return id;
}

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

const deleteUserById = (id) => {
  const userIndex = users.users_list.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return undefined;
  }

  return users.users_list.splice(userIndex, 1)[0];
};

app.get("/", (_request, response) => {
  response.send("Hello World!");
});

app.get("/users", (request, response) => {
  const { name, job } = request.query;
  response.send({ users_list: findUsers(name, job) });
});

app.get("/users/:id", (request, response) => {
  const user = findUserById(request.params.id);

  if (user === undefined) {
    response.status(404).send("Resource not found.");
    return;
  }

  response.send(user);
});

app.post("/users", (request, response) => {
  const newUser = { ...request.body, id: generateId() };
  addUser(newUser);
  response.status(201).send(newUser);
});

app.delete("/users/:id", (request, response) => {
  const deletedUser = deleteUserById(request.params.id);

  if (deletedUser === undefined) {
    response.status(404).send("Resource not found.");
    return;
  }

  response.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
