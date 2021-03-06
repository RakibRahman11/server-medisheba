const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

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
    const medicinesCollection = client.db("medi-sheba").collection("medicines");
    const testimonialsCollection = client
      .db("medi-sheba")
      .collection("testimonials");
    const requstServicesCollection = client
      .db("medi-sheba")
      .collection("requstServices");

    const medicineOrdersCollection = client
      .db("medi-sheba")
      .collection("medicineOrders");
    const discountsCollection = client.db("medi-sheba").collection("discounts");

    // get methods
    app.get("/services", async (req, res) => {
      const limit = parseInt(req?.query?.limit);
      if (limit) {
        const result = await servicesCollection.find({}).limit(limit).toArray();
        res.json(result);
      } else {
        const result = await servicesCollection.find({}).toArray();
        res.json(result);
      }
    });

    app.get("/getOneService/:id", async (req, res) => {
      const result = await servicesCollection.findOne({
        _id: ObjectId(req.params.id),
      });
      res.json(result);
    });

    app.get("/medicines", async (req, res) => {
      const limit = parseInt(req?.query?.limit);
      if (limit) {
        const result = await medicinesCollection
          .find({})
          .limit(limit)
          .toArray();
        res.json(result);
      } else {
        const result = await medicinesCollection.find({}).toArray();
        res.json(result);
      }
    });

    app.get("/getOneMedicine/:id", async (req, res) => {
      const result = await medicinesCollection.findOne({
        _id: ObjectId(req.params.id),
      });
      res.json(result);
    });

    app.get("/testimonials", async (req, res) => {
      const limit = parseInt(req?.query?.limit);
      if (limit) {
        const result = await testimonialsCollection
          .find({})
          .limit(limit)
          .toArray();
        res.json(result);
      } else {
        const result = await testimonialsCollection.find({}).toArray();
        res.json(result);
      }
    });

    app.get("/getOneTestimonial/:id", async (req, res) => {
      const result = await testimonialsCollection.findOne({
        _id: ObjectId(req.params.id),
      });
      res.json(result);
    });

    app.get("/addOrder", async (req, res) => {
      const limit = parseInt(req?.query?.limit);
      if (limit) {
        const result = await requstServicesCollection
          .find({})
          .limit(limit)
          .toArray();
        res.json(result);
      } else {
        const result = await requstServicesCollection.find({}).toArray();
        res.json(result);
      }
    });
    app.get("/getOneOrder/:id", async (req, res) => {
      const result = await requstServicesCollection.findOne({
        _id: ObjectId(req.params.id),
      });
      res.json(result);
    });
    app.get("/getOrderByEmail/:email", async (req, res) => {
      const result = await requstServicesCollection.findOne({
        email: req.params.email,
      });
      res.json(result);
    });

    app.get("/discounts", async (req, res) => {
      const result = await discountsCollection.find({}).toArray();
      res.json(result);
    });

    // Post methods
    app.post("/addOrder", async (req, res) => {
      const result = await requstServicesCollection.insertOne(req.body);
      res.json(result);
    });
    app.post("/addMedicine", async (req, res) => {
      const result = await medicineOrdersCollection.insertOne(req.body);
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
