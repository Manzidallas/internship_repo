const express = require('express')
const port = 5000
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const { Library } = require('./model/lib')

app.use(express.json())
app.use(cors({origin: '*'}))
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((err)=>{
    console.error(err);
})

app.post('/api/addbook', async (req, res)=>{
    const { bookname, author, publisher, genre, poster } = req.body;
    try {
        const Newbook = new Library({
            bookname,
            author,
            publisher,
            genre,
            poster
        })
        await Newbook.save();
        res.status(201).json({message: "New book is inserted succesfully", book: Newbook})
        
    } catch (error) {
        res.send(console.log("Error occured when inserting a new book", error))
    }
})

app.get('/api/books', async (req, res)=>{
    const fetchedbooks = await Library.find();
    try {
        if (fetchedbooks.length > 0){
            res.status(200).json({message : fetchedbooks})
        }else{
            res.status(404).json({message : "Not found"})
        }
    } catch (error) {
        res.status(500).json({message : "Server error"})
    }
})

app.get('/api/books/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const fetchedbook = await Library.findById(id);
        if (fetchedbook) {
            res.status(200).json({ message: fetchedbook });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.delete('/api/books/:id', async (req, res)=>{
    const id = req.params.id

    try {
        const fordelete = await Library.findByIdAndDelete(id)

        if (fordelete){
            res.status(200).json({message: "Book deleted Succesfully", fordelete})
        }else{
            res.status(404).json({message : "The Book to be deleted was not found or doesn't exist", fordelete})
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Err"})
    }
})

app.put('/api/book/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const {bookname, author, genre , publisher, poster } = req.body
        const update = await Library.findByIdAndUpdate( id, {bookname,author, publisher, poster, genre} )

        if (update){
            res.status(200).json({message: "Book updateed Succesfully", update})
        }else{
            res.status(404).json({message : "The Book to be deleted was not found or doesn't exist", update})
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Err"})
    }
})

app.listen(port, ()=>{
    console.log(`Api is running on ${port}`)
})
