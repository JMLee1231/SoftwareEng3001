# SoftwareEng3001

## Run the app

1. Start MongoDB locally, or set `MONGODB_URI` to your MongoDB connection string.
2. Run `npm install` from the repository root.
3. In one terminal, run `npm run server` to start the API at `http://localhost:8000`.
4. In another terminal, run `npm run dev` to start the React frontend.

The React app uses MongoDB's `_id` to identify records when deleting users.
