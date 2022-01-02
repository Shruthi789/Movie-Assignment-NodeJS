import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const mongo_URL=process.env.mongo_URL;

const app=express();
const Port=9000;
app.use(express.json());
async function createConnection()
{
  const client=new MongoClient(mongo_URL);
  await client.connect();
  console.log("MongoDB connected");
  return client;
}
 const client=await createConnection();
app.get('/',(request,response)=>{
   response.send("Hello World! My name is Shruthi");
});
app.get('/movies',async (request,response)=>{
   const queryParams=request.query;
   if(queryParams.rating){
       queryParams.rating=(+request.query.rating);
   }
   const result=await client.db('newDB').collection('movies').find(queryParams).toArray();
  response.send(result);
});
app.get('/movies/:id',async (request,response)=>{
    const {id}=request.params;
    const result=await client.db('newDB').collection('movies').findOne({id:id});
    result?response.send(result):response.status('404').send("Movie not found");

});
app.post('/movies/add', async (request,response)=>{
      const data=request.body;
      console.log('Incoming movies');
      const result=await client.db('newDB').collection('movies').insertMany(data);
      response.send(result);
});
app.put('/movies/edit/:id', async (request,response)=>{
  const params=request.params;
  const data=request.body;
  const result=await client.db('newDB').collection('movies').updateOne(params,{$set:data});
  console.log('Movie Edited');
  response.send(result);
});
app.delete('/movies/delete/:id', async (request,response)=>{
  const params=request.params;
  const result=await client.db('newDB').collection('movies').deleteOne(params);
  console.log('Movie Deleted');
  response.send(result);
});

app.listen(Port,()=>{console.log("The server is running")});