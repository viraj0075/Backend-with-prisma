import { prisma } from "../config/db.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import genrateToken from "../utils/GenrateToken.js";
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const userExists = await prisma.user.findUnique({
            where: {
                email
            },
        });
        if (userExists) {
            throw new ApiError(400, "User already exists");
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        }
        );

        const token = genrateToken(user.id, res);

        const loggedInUser = {
            id: user.id,
            email: user.email,
            token
        };

        res.status(201).json(new ApiResponse(201, loggedInUser, "User created successfully"));
    } catch (error) {
        res.json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, "email password");
        if (!email || !password) {
            throw new ApiError(400, "All fields are required");
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            throw new ApiError(404, "Invalid email or password.");
        }

        const token = genrateToken(user.id, res);

        const loggedInUser = {
            id: user.id,
            email: user.email,
            token
        };

        res.status(200).json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { register, login, logout };
