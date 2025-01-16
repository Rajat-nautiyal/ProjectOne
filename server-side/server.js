const express = require('express')
const app = express();
const {getList, postList, deleteList, updateList} = require('./controller/index.js')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173', credentials:true}));

app.get('/list/get', getList);
app.post('/list/post',postList);
app.delete('/list/delete', deleteList);
app.put('/list/update/:id', updateList);

app.get('/', (req, res)=> {
    res.json({message: "hello bro"});
})

mongoose.connect("mongodb://localhost:27017/listSchema",{
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

app.listen(5000,()=>{
    console.log('server is created')
})