import express from "express";
import dotenv from "dotenv";

import authUsers from "./routes/auth.routes.js"

const app = express();

dotenv.config();
const PORT = process.env.PORT 

app.get("/", (req, res) => {
    res.send("hello")
});

app.use("/api/auth", authUsers)

app.listen( PORT , () => console.log(`server running on port ${PORT}`));