import { configDotenv } from "dotenv";
import connect from "./DB/connect";
import e from "express";

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

