import mongoose from "mongoose";

const connentDB = async () => {
    try{
        const conn  = await mongoose.connect(process.env.MONGODB_URL);
        if(conn){
            console.log("MongoDB Connected");
        }
    }catch(error){
        console.log("Error connecting to MongoDB", error.message);
    }
}

export default connentDB;