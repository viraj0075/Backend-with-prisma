import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js"
import ApiError from "../utils/ApiError.js";
// next is the fucntion which is used to pass the
//  request to the next middleware or controller
const authMiddleWare = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        console.log("In Token Section");
        token = req.headers.authorization.split(" ")[1];//["Bearer","token jsdhkjashdkfjhk"]
    }
    else if (req.cookies?.jwt) {
        console.log("In Cookies Section");
        token = req.cookies.jwt;
    }

    if (!token) {
        throw new ApiError(401, "No Authhoreized, no token provided.");
    }

    // Verify the user id from  the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded, "decoded")

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })
        if (!user) {
            throw new ApiError(404, "User no longer exist.");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError(401, "Invalid Token.");
    }
}

export default authMiddleWare;