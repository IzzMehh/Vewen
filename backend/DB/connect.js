import mongoose from "mongoose";

async function connect(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch (error) {
        throw error
    }
}

export default connect