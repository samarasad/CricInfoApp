const connection = require('./Connection')
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())

app.get('/get', async (req, resp) => {
  const collection = await connection()
  const result = await collection.find({}).toArray();
  resp.send(result)
  // resp.send("Ok")
})

app.get('/search/:key', async (req, resp) => {
  console.log("hey")
  const conn = await connection()
  const data = await conn.find({
    $or: [{ "Player": { $regex: req.params.key } },
    { "HS": { $regex: req.params.key } }
    ]
  }).toArray();

  resp.send(data)
})



app.get('/sort/:key', async (req, resp) => {
  console.log("hey")
  const conn = await connection()
  const value = req.params.key;
  switch (value) {
    case "Ave": {
      const data = await conn.find().sort({ Ave: -1 }).collation({ locale: "en_US", numericOrdering: true }).toArray()
      resp.send(data)
      break;

    }
    case "Runs": {
      const data = await conn.find().sort({ Runs: -1 }).collation({ locale: "en_US", numericOrdering: true }).toArray()
      resp.send(data)
      break;
    }
    case "BF": {
      const data = await conn.find().sort({ BF: -1 }).collation({ locale: "en_US", numericOrdering: true }).toArray()
      resp.send(data)
      break;
    }
    case "100": {
      const data = await conn.find().sort({ 100: -1 }).collation({ locale: "en_US", numericOrdering: true }).toArray()
      resp.send(data)
      break;
    }
    case "50": {
      const data = await conn.find().sort({ 50: -1 }).collation({ locale: "en_US", numericOrdering: true }).toArray()
      resp.send(data)
      break;
    }
  }


})




app.listen(5500, () => {
  console.log("running on:5500")
})
