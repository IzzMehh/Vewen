import { configDotenv } from "dotenv";
import connectDB from "./DB/connect.js";
import e from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/posts.routes.js";
import { configCloudinary } from "./utils/cloudinary.js";
import { deletedAssestCleanupFn } from "./jobs/cloudinaryCleanupScheduler.js";
import cors from "cors"

configDotenv()

const app = e()

const PORT = process.env.PORT

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
}

connectDB().then(() => {
    console.log("MongoDB Connected")
    app.listen(PORT, () => {
        console.log(`Starting Server on ${PORT}`)
    })
})
    .catch(e => {
        console.log(e.message)
        process.exit(1)
    })

configCloudinary()
app.use(cors(corsOptions))

app.use(e.urlencoded({ extended: false }))
app.use(e.json());
app.use(cookieParser())


deletedAssestCleanupFn()

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)