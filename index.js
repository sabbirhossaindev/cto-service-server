const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();

// middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ok9cief.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const ctoServices = client.db('ctoUser2').collection('ctoService');
        const inputCollection = client.db('ctoUser2').collection('inputField');
        const submitCollection = client.db('ctoUser2').collection('submit');

        // database insert to service collections
        app.get('/ctoService', async (req, res) => {
            const query = {};
            const options = await ctoServices.find(query).toArray();
            res.send(options);
        });
        

        // cto website all submit collection..
        app.post('/inputField', async (req, res) => {
            const body = req.body;
            const doc = body;
            console.log(doc);
            const result = await inputCollection.insertOne(doc)
            console.log(result);
            res.send(result)
        });


        // cto website all submit collection..
        app.post('/submit', async (req, res) => {
            const body = req.body;
            const doc = body;
            // console.log(doc);
            const result = await submitCollection.insertOne(doc)
            console.log(result);
            res.send(result)
        });

    }
    finally {
        
    }
  }
  run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send('cto service server is running');
});

app.listen(port, () => console.log(`cto service server running on ${port}`));