import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { prisma } from "../config/db.js"

const addToWatchList = async (req, res) => {
    try {
        const { movieId, status, rating, notes } = req.body;

        if (!req.user.id || !movieId) {
            throw new ApiError(400, "userId and movieId are required.");
        }

        // verify User Exists
        const isUser = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!isUser) {
            throw new ApiError(404, "User not found.");
        }

        //verify movies Exist
        const isMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!isMovie) {
            throw new ApiError(404, "Movie not found.");
        }

        // Already Added the moviees
        const isExistInWatchList = await prisma.watchlistitem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId: movieId
                }
            }
        })
        if (isExistInWatchList) {
            throw new ApiError(400, "Movie already added to watchlist.");
        }

        const addToWatchList = await prisma.watchlistitem.create({
            data: {
                userId: req.user.id,
                movieId,
                status: status || "PLANNED",
                rating: rating || null,
                notes: notes || null
            }
        })

        return res.status(200).json(new ApiResponse(200, addToWatchList, "Movie added to watchlist successfully."));

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const removeFromWatchList = async (req, res) => {
    try {
        const { movieId } = req.params;

        if (!req.user.id || !movieId) {
            throw new ApiError(400, "userId and movieId are required.");
        }

        // verify User Exists
        const isUser = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!isUser) {
            throw new ApiError(404, "User not found.");
        }

        //verify movies Exist
        const isMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!isMovie) {
            throw new ApiError(404, "Movie not found.");
        }

        // Already Added the moviees
        const isExistInWatchList = await prisma.watchlistitem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId: movieId
                }
            }
        })
        if (!isExistInWatchList) {
            throw new ApiError(400, "Movie not found in watchlist.");
        }

        const removeFromWatchList = await prisma.watchlistitem.delete({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId: movieId
                }
            }
        })

        return res.status(200).json(new ApiResponse(200, removeFromWatchList, "Movie removed from watchlist successfully."));

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createMovie = async (req, res) => {
    try {
        const { title, overview, releaseYear, genres, runtime, posterUrl, createdBy } = req.body;

        if (!title || !overview || !releaseYear || !genres || !runtime || !posterUrl || !createdBy) {
            throw new ApiError(400, "All fields are required.");
        }

        const createMovie = await prisma.movie.create({
            data: {
                title,
                overview,
                releaseYear,
                genres,
                runtime,
                posterUrl,
                createdBy
            }
        })

        return res.status(200).json(new ApiResponse(200, createMovie, "Movie created successfully."));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const udpateWatchList = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { status, rating, notes } = req.body;

        if (!req.user.id || !movieId) {
            throw new ApiError(400, "userId and movieId are required.");
        }

        // verify User Exists
        const isUser = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!isUser) {
            throw new ApiError(404, "User not found.");
        }

        //verify movies Exist
        const isMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!isMovie) {
            throw new ApiError(404, "Movie not found.");
        }

        // Already Added the moviees
        const isExistInWatchList = await prisma.watchlistitem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId: movieId
                }
            }
        })
        if (!isExistInWatchList) {
            throw new ApiError(400, "Movie not found in watchlist.");
        }

        const udpateWatchList = await prisma.watchlistitem.update(
            {
                where: {
                    userId_movieId: {
                        userId: req.user.id,
                        movieId: movieId
                    }
                },
                data: {
                    status: status || "PLANNED",
                    rating: rating || null,
                    notes: notes || null
                }
            }
        )

        return res.status(200).json(new ApiResponse(200, udpateWatchList, "Movie updated in watchlist successfully."));

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export {
    addToWatchList, removeFromWatchList, createMovie, udpateWatchList

};