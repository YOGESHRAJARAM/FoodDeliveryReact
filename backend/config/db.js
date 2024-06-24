import mongoose from "mongoose"
export const connectDB = async()=>{
    try{
        await mongoose.connect('').then(()=>console.log("DB Connected"));
    }
   catch(error){
    console.error(error)
   }
}
