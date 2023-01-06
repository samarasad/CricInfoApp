const{MongoClient}=require('mongodb')
const client=new MongoClient("mongodb://localhost:27017");

module.exports= async function getConnection()
{

     const connection=await client.connect()
     const db= connection.db('playersdata')
     const collection= db.collection('players')
     return collection;


}

