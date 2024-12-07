import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        
        await mongoose.connect("mongodb+srv://fabiana:wVjcHxIITwemVOqe@cluster0.geqsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('>>> Database MongoDB is connected <<<<')
    }catch (error){
        console.log(error);
    }
};

