import express from 'express'
import type {Application} from 'express'
import cors from 'cors'
import articleRoute from './routes/articleRoute.js'
const app:Application = express()
const PORT = process.env.PORT || 3000

app.use(cors()) // Enable CORS for all routes. Change it later [IMPORTANT]

app.use('/api',articleRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})