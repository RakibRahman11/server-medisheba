const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server side of medi sheba");
});

async function run() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dsdfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const servicesCollection = client.db("medi-sheba").collection("services");

    // get methods
    app.get("/services", async (req, res) => {
      const result = await servicesCollection.find({}).toArray();
      res.json(result);
    });
  } catch {
    // await    client.close()
  }
}

run().catch(console.dir);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});
