import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

const usersList = [
  { id: 1, name: "Charlie", job: "Janitor" },
  { id: 2, name: "Mac", job: "Bouncer" },
  { id: 3, name: "Dee", job: "Aspiring actress" },
  { id: 4, name: "Dennis", job: "Bartender" },
];

app.use(cors());
app.use(express.json());

function generateId() {
  let id;

  do {
    id = Math.floor(Math.random() * 1_000_000_000);
  } while (usersList.some((user) => user.id === id));

  return id;
}

app.get("/users", (_request, response) => {
  response.json({ users_list: usersList });
});

app.post("/users", (request, response) => {
  const { name, job } = request.body;

  if (typeof name !== "string" || typeof job !== "string") {
    response.status(400).json({ error: "A user must include string name and job fields." });
    return;
  }

  const newUser = { id: generateId(), name, job };
  usersList.push(newUser);
  response.status(201).json(newUser);
});

app.delete("/users/:id", (request, response) => {
  const userIndex = usersList.findIndex(
    (user) => String(user.id) === request.params.id,
  );

  if (userIndex === -1) {
    response.status(404).json({ error: "User not found." });
    return;
  }

  usersList.splice(userIndex, 1);
  response.status(204).end();
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
