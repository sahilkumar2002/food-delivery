import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://rohit1000me1:rohit2003@cluster0.gduhdm2.mongodb.net/food-del').then(()=>console.log("DB connected"));
}