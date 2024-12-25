import mongoose from 'mongoose';
import express from 'express'

const connectDB = async(req,res)=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    const connection = mongoose.connection
    console.log("Database connected successfully")
} catch (error) {
    throw new Error("Error occured while connecting to the database")
}
}

export default connectDB