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

Run the React frontend in another terminal:

```bash
npm run dev
```

The frontend loads users from `http://localhost:8000/users`. Creating a user
requires a `201 Created` response, and deleting a user requires a `204 No Content`
response before the table updates.
