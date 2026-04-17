import express from "express";
import { addToWatchList, createMovie, removeFromWatchList, udpateWatchList } from "../controllers/watchlist.controllers.js";
import authMiddleWare from "../middleware/auth.middleware.js";
const router = express.Router();

router.use(authMiddleWare);
// router.post("/", authMiddleWare,addToWatchList);

router.post("/", addToWatchList);
router.post("/createMovie", createMovie);
router.delete("/:movieId", removeFromWatchList);
router.put("/:movieId", udpateWatchList);

export default router;