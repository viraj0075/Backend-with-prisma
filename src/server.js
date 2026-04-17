import "dotenv/config";
import express from "express";
import movieRouter from "./routes/movie.route.js"
import authRouter from "./routes/auth.route.js"
import watchlistRouter from "./routes/watchlist.route.js"
import { connectdb, disconnectdb } from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";


const app = express();
const port = process.env.PORT;


// database connection
connectdb();

// App Rputes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/movies", movieRouter);
app.use("/auth", authRouter);
app.use("/watchlist", watchlistRouter);

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// handle unhandled peomise rejection
process.on("unhandledRejection", (error) => {
    console.log(`Unhandled Rejection: ${error.message}`);
    disconnectdb();
    process.exit(1);
});

// handle uncaught exception
process.on("uncaughtException", (error) => {
    console.log(`Uncaught Exception: ${error.message}`);
    disconnectdb();
    process.exit(1);
});

// handle server shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    disconnectdb();
    process.exit(0);
});

