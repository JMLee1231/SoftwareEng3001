# SoftwareEng3001

## Run the assignment

Install dependencies once from the repository root:

```bash
npm install
```

Run the backend in one terminal:

```bash
npm run server
```

For class-style backend development with automatic restarts, use:

```bash
npm run dev --workspace=express-backend
```

Run the React frontend in another terminal:

```bash
npm run dev
```

The backend follows the REST API lab sequence: `GET /`, `GET /users`, optional
`name` and `job` query filters, `GET /users/:id`, `POST /users`, and
`DELETE /users/:id`. The frontend loads users from `http://localhost:8000/users`.
Creating a user requires a `201 Created` response, and deleting a user requires
a `204 No Content` response before the table updates.
