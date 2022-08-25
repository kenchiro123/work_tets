const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


const { MongoClient } = require("mongodb");
const uri = "mongodb://myUserAdmin:myUserAdmin@localhost:27017";

app.post('/foods/create', async(req, res) => {
  const food = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('mydb').collection('foods').insertOne({
    id: parseInt(food.id),
    foodname: food.foodname,
    count_food: food.count_food,
    date: food.date,
    avatar: food.avatar
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "food with ID = "+food.id+" is created",
    "food": food
  });
})


app.get('/foods', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const foods = await client.db('mydb').collection('foods').find({}).sort('id').toArray();
  await client.close();
  res.status(200).send(foods);
})


app.get('/foods/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const food = await client.db('mydb').collection('foods').findOne({"id": id});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "food": food
  });
})

app.put('/foods/update', async(req, res) => {
  const food = req.body;
  const id = parseInt(food.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('mydb').collection('foods').updateOne({'id': id}, {"$set": {
    id: parseInt(food.id),
    foodname: food.foodname,
    count_food: food.count_food,
    date: food.date,
    avatar: food.avatar
  }});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "food with ID = "+id+" is updated",
    "food": food
  });
})


app.delete('/foods/delete', async(req, res) => {
  const id = parseInt(req.body.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('mydb').collection('foods').deleteOne({'id': id});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "food with ID = "+id+" is deleted"
  });
})