const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// midle ware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello world');
})
app.listen(port,()=>{
    console.log(`port is running ${port}`);
})