import express from "express"
import { getMovies, getMovieByID, addMovies, editMovie, deleteMovie,getLanguages } from '../movieActions.js';
import { auth } from "../middleware/auth.js";
import { ObjectID } from 'bson';
const router=express.Router();

router.route('/')
      .get(auth,async (request,response)=>{
    const queryParams=request.query;
    if(queryParams.rating){
        queryParams.rating=(+request.query.rating);
    }
    const result=await getMovies(queryParams);
    result.length!==0?response.send(result):response.status('404').send("Movie(s) not found");
    })
    .post(auth,async (request,response)=>{
  const data=request.body;
  console.log('Incoming movies');
  const result=await addMovies(data);
  response.send(result);
});

router.route('/languages')
.get(async (request,response)=>{
  const result=await getLanguages();
  response.send(result);
  });

 router.route('/:id')
      .get(async (request,response)=>{
     const {id}=request.params;
     const result=await getMovieByID(id);
     result?response.send(result):response.status('404').send("Movie not found");
 
     })
     .put(async (request,response)=>{
   const {id}=request.params;
   const data=request.body;
   const result=await editMovie({_id:ObjectID(id)}, data);
   console.log('Movie Edited');
   response.send(result);
 })
 .delete(async (request,response)=>{
   const {id}=request.params;
   const result=await deleteMovie({_id:ObjectID(id)});
   console.log('Movie Deleted');
   response.send(result);
 });

 export const moviesRouter=router;