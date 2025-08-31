import express from 'express'
import type {Application} from 'express'
import cors from 'cors'
import articleRoute from './routes/articleRoute.js'
import bookmarkRoute from './routes/bookmarkRoute.js'
const app:Application = express()
const PORT = process.env.PORT || 3000

app.use(cors()) // Enable CORS for all routes. Change it later [IMPORTANT]
app.use(express.json())


//http://localhost:3000/extract/article?url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fworld-60525350
app.use('/api/extract',articleRoute)

app.use('/api/bookmarks', bookmarkRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.use('/',(req,res)=>{
    res.send('Welcome to Pick-Pockt API. Please use /api/extract/article?url=YOUR_ARTICLE_URL to fetch article content.')
})