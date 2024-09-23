import { configDotenv } from "dotenv";
import connectDB from "./DB/connect.js";
import e from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

configDotenv()

const app = e()

const PORT = process.env.PORT

connectDB().then(()=>{
    console.log("MongoDB Connected")
    app.listen(PORT,()=>{
        console.log(`Starting Server on ${PORT}`)
    })
})
.catch(e=>{
    console.log(e.message)
    process.exit(1)
})

app.use(e.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/api/auth',userRouter)