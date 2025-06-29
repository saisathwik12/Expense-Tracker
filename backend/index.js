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

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://expense-tracker-saisathwik.netlify.app/"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
app.use(cors(corsOptions))

app.use('/api/user',userRoutes)
app.use('/api/expense',expenseRouter)

app.get("/", (req,res)=>{

    res.send("Hello World")
})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})