import express from "express"
import { getMovies, getMovieByID, addMovies, editMovie, deleteMovie } from '../movieActions.js';
const router=express.Router();

router.route('/')
      .get(async (request,response)=>{
    const queryParams=request.query;
    if(queryParams.rating){
        queryParams.rating=(+request.query.rating);
    }
    const result=await getMovies(queryParams);
    response.send(result);
    })
    .post(async (request,response)=>{
  const data=request.body;
  console.log('Incoming movies');
  const result=await addMovies(data);
  response.send(result);
});
 router.route('/:id')
      .get(async (request,response)=>{
     const {id}=request.params;
     const result=await getMovieByID(id);
     result?response.send(result):response.status('404').send("Movie not found");
 
     })
     .put(async (request,response)=>{
   const params=request.params;
   const data=request.body;
   const result=await editMovie(params, data);
   console.log('Movie Edited');
   response.send(result);
 })
 .delete(async (request,response)=>{
   const params=request.params;
   const result=await deleteMovie(params);
   console.log('Movie Deleted');
   response.send(result);
 });

 export const moviesRouter=router;