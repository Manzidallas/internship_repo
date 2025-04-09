const express = require('express')
const port = 5000
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const { Library } = require('./model/lib')
const LibraryController = require('./controller/LibraryController')

app.use(express.json())
app.use(cors({origin: '*'}))
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((err)=>{
    console.error(err);
})

app.post('/api/addbook', LibraryController.Addbook)

app.get('/api/books', LibraryController.getBooks)

app.get('/api/books/:id', LibraryController.getBookById);

app.delete('/api/books/:id', LibraryController.deleteBook)

app.put('/api/book/:id', LibraryController.updateBook)

app.listen(port, ()=>{
    console.log(`Api is running on ${port}`)
})
