import mongoose from "mongoose"
export const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://greatstack:1182528@cluster0.shzj9fi.mongodb.net/food-del').then(()=>console.log("DB Connected"));
    }
   catch(error){
    console.error(error)
   }
}
