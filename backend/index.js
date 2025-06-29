import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import expenseRouter from "./routes/expense.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express()

connectDB();

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

app.use('/api/user',userRoutes)
app.use('/api/expense',expenseRouter)

app.get("/", (req,res)=>{

    res.send("Hello World")
})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})