import { configDotenv } from "dotenv";
import connect from "./DB/connect.js";
import e from "express";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

configDotenv()

const app = e()

const PORT = process.env.PORT

connect().then(()=>{
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

app.use('/api/user',userRouter)

