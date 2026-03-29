import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config({"path" : "./env"})

export const client = new Client({
    connectionString: process.env.DB_URL
});