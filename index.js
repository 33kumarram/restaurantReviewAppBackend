const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const ConnectDB = require('./config/db.js')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js')

var corsOptions = {
  // origin: "*",
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://mernarticleapp.netlify.app"
  ],
  credentials: true,
};

dotenv.config()
const app = express()
const userRoutes = require('./routes/userRoutes.js')
const fileRoutes = require('./routes/fileRoutes.js')
const articleRoutes = require('./routes/articleRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')
const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) => {
  console.log(`app is listening at port ${PORT}`)
})

ConnectDB()

// to accept json data
app.use(express.json())
// to accept request from origin specified in cor options
app.use(cors(corsOptions))
// to display hit url in terminal
app.use(morgan('dev'))
app.use('/users', userRoutes)
app.use('/files', fileRoutes)
app.use('/articles', articleRoutes)
app.use('/comments', commentRoutes)


app.use(notFound)

app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('welcome !!!')
})



