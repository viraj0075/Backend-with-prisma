import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

const connectdb = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully via Prisma");
    }
    catch (error) {
        console.log(`Error connecting to database: ${error.message}`);
        // immedietly stop the node.js application if there is connection error
        process.exit(1);
    }
}

const disconnectdb = async () => {
    try {
        await prisma.$disconnect();
        console.log("Database disconnected successfully via Prisma");
    }
    catch (error) {
        console.log(`Error disconnecting from database: ${error.message}`);
        process.exit(1);
    }
}

export { connectdb, disconnectdb };