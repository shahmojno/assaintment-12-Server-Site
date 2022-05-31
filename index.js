const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.htfsf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const productCollection = client.db('handtools').collection('tools');












        //api
        app.get('/tools', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // app.get('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const product = await productCollection.findOne(query);
        //     res.send(product);
        // });

        // //post 
        // app.post('/product', async (req, res) => {
        //     const newProduct = req.body;
        //     const result = await productCollection.insertOne(newProduct);
        //     res.send(result);
        // });



    }
    finally { }

}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hand Tools')
});
app.listen(port, () => {
    console.log('hand_tools', port);
})
