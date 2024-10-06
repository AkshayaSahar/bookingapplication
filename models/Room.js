import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true 
    },
    maxPeople:{
        type:Number,
        required:true 
    },
    desc:{
        type:String,
        required:true 
    },
    roomNumbers:{
        type:[{number:Number, unavailableDates:{type: [Date]}}],
        required:true 
    }
},{ timestamps:true})

export default mongoose.model("Room", roomSchema);