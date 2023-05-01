const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//Middleware
app.use(cors());
app.use(express.json());

//username:disneyuser1
//password:xSCK9bFexjnjIRaB

const uri =
  "mongodb+srv://disneyuser1:xSCK9bFexjnjIRaB@cluster0.9zvxfdn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const allMovieCollection = client.db("allMovie").collection("movie");

    //allMovie

    app.get("/allMovie", async (req, res) => {
      const query = {};
      const cursor = allMovieCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/api/v1/movie", async (req, res) => {
      const user = req.body;
      const data = await allMovieCollection.insertOne(user);
      res.send(data);
    });

    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = new ObjectId(id);
      const result = await allMovieCollection.findOne(query);
      console.log(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello server run");
});

app.listen(port, () => {
  console.log(`running port ${port}`);
});
