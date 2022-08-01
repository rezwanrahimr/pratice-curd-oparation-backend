const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
const objectId = require('mongodb').ObjectId;



// midle ware
app.use(cors());
app.use(express.json());

// Mongodb connecting

const uri = `mongodb+srv://pratice-curd-opration:wLyFOWQgYo8wMPyC@cluster0.5dhlm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        client.connect();
        const manCollection = client.db('users').collection('user');

        // post api
        app.post('/user',async(req,res)=>{
            const data = req.body;
            const result = await manCollection.insertOne(data);
            res.send(result);
        })

        app.get('/user',async(req,res)=>{
            const quary = {};
            const data = manCollection.find(quary);
            const result = await data.toArray();
            res.send(result);
        })

        // delete api
        app.delete('/user/:id',async(req,res)=>{
            const id = req.params.id;
            const quary = {_id: objectId(id)};
            const result = await manCollection.deleteOne(quary);
            res.send(result);
        })
        // get single user api
        app.get('/user/:id',async(req,res)=>{
            const id = req.params.id;
            const quary = {_id: objectId(id)};
            const datas = manCollection.find(quary);
            const result = await datas.toArray();
            res.send(result);
        }) 


    }
    finally{

    }
}

run().catch(console.dir);
app.get('/',(req,res)=>{
    res.send('hello world');
})
app.listen(port,()=>{
    console.log(`port is running ${port}`);
})