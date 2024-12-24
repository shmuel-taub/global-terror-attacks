import mongoose from "mongoose";
import 'dotenv/config'
import { TerrorismManagmentError } from "../Utilities/customErrors";

export async function connectDB() {
    try {
        console.log(process.env.DB_URL)
        if (!process.env.DB_URL) throw new TerrorismManagmentError('Failed to load db url')
        await mongoose.connect(process.env.DB_URL )
        console.log("Connected to the DB")
    }
    catch (e) {
        console.log("Erro occured while connecting to the db")
        if (e instanceof Error)
            console.log(e.message)
        else {
            console.log(e)
        }
        // process.exit(1)
    }
}

