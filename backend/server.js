import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authUsers from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongodb from "./db/connectToMongodb.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authUsers);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server running on port ${PORT}`);
});
