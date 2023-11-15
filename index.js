const express = require("express");
const cors = require("cors")
const app = express()
const port = process.env.PORT || 2000;


//middle wars

app.use(cors())
app.use(express.json())







const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Advanced-Filter-Pagination-And-Search-System:uRCA1zNpMFRcyY14@cluster0.iono61s.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect((error) => {
      if (error) {
        console.log(error);
        return;
      }
    });

    const moviesCollection = client.db("Advanced-Filter-Pagination-And-Search").collection("moviesData");

    app.get("/", (req, res) => {
      res.send(`server is running`)
    })

    app.get("/movies", async (req, res) => {
      const result = await moviesCollection.find().toArray();
      res.send(result)
    })

   app.get("/count",async(req,res)=>{
    const result = await moviesCollection.estimatedDocumentCount()
    
    res.send({totalData:result})
   })

//    app.get("/count", async (req, res) => {
//     const result = await moviesCollection.estimatedDocumentCount();
//     console.log(result);
//     res.send(result);
// });





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
































app.listen(port, () => {
  console.log(`server is running on ${port}`);
})