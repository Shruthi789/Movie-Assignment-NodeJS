import express from "express"
import { getMovies, getMovieByID, addMovies, editMovie, deleteMovie,getLanguages } from '../actions/movieActions.js';
import { adminAuth,regAuth } from "../middleware/auth.js";
import { ObjectID } from 'bson';
const router=express.Router();

router.use(regAuth);

router.route('/')
      .get(async (request,response)=>{
    const queryParams=request.query;
    if(queryParams.rating){
        queryParams.rating=(+request.query.rating);
    }
    const result=await getMovies(queryParams);
    result.length!==0?response.send(result):response.status('404').send("Movie(s) not found");
    })
    .post(adminAuth,async (request,response)=>{
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
     .put(adminAuth,async (request,response)=>{
   const {id}=request.params;
   const data=request.body;
   const result=await editMovie({_id:ObjectID(id)}, data);
   console.log('Movie Edited');
   response.send(result);
 })
 .delete(adminAuth,async (request,response)=>{
   const {id}=request.params;
   const result=await deleteMovie({_id:ObjectID(id)});
   console.log('Movie Deleted');
   response.send(result);
 });

 export const moviesRouter=router;