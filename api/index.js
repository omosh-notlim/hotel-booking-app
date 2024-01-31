import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO);
        console.log(
            "Database connected",
            // connect.connection.host,
            // connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected");
});

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(5002, ()=>{
    connectDb()
    console.log("Listening on port 5002...")
})