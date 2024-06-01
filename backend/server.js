import express from "express";
import dotenv from "dotenv";

import authUsers from "./routes/auth.routes.js";
import connectToMongodb from "./db/connectToMongodb.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authUsers);

app.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server running on port ${PORT}`);
});
