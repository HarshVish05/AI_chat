import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// loading env variables
config({
  path: "./config/config.env",
});

// Connecting to database
connectDB()

// Middlewares
app.use(express.json())

app.use('/api/vi/users', userRoutes)  // domain/api/v1/users
app.use('/api/vi/chats', chatRoutes)  // domain/api/v1/chats

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
