import express from 'express'
import eventRoutes from './routes/eventRoute.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config()
const PORT = process.env.PORT;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("api is runnig")
})

app.use("/events",eventRoutes)

app.listen(PORT,()=>{
    console.log(`server is runnig on port ${PORT}`)
})