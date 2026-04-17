import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    // If the error isn't an instance of our ApiError construct, 
    // we want to format it to ensure consistency.
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode ? error.statusCode : 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        success: error.success,
        message: error.message,
        errors: error.errors,
        // Uncomment the line below to show stack traces only in development
        // stack: process.env.NODE_ENV === "development" ? error.stack : undefined 
    };

    return res.status(error.statusCode).json(response);
};

export default errorHandler;
