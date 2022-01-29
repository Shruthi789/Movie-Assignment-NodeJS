import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import {moviesRouter} from './routes/movies.js';
import {usersRouter} from './routes/users.js';
import cors from 'cors';
dotenv.config();

const mongo_URL=process.env.mongo_URL;
const Port=process.env.PORT;
const app=express();
app.use(cors());
app.use(express.json());

async function createConnection()
{
  const client=new MongoClient(mongo_URL);
  await client.connect();
  console.log("MongoDB connected");
  return client;
}

 export const client=await createConnection();
 
app.get('/',(request,response)=>{
   response.send("Hello World! My name is Shruthi");
});

app.use('/movies',moviesRouter);
app.use('/users',usersRouter);

app.listen(Port,()=>{console.log("The server is running")});

