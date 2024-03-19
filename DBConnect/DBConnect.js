import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const MDBString = process.env.mongoConString;

const connectDB = async()=>{
    try {
        console.log(MDBString);
        const connection = await mongoose.connect(MDBString);
        console.log("Successfully Connected");
        return connection;
    } catch (error) {
        console.log(error);        
    }
}

export default connectDB;