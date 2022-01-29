import { client } from './index.js';

function deleteMovie(params) {
  return client.db('newDB').collection('movies').deleteOne(params);
}
function editMovie(params, data) {
  return client.db('newDB').collection('movies').updateOne(params, { $set: data });
}
function addMovies(data) {
  return client.db('newDB').collection('movies').insertMany(data);
}
function getMovieByID(id) {
  return client.db('newDB').collection('movies').findOne({ _id:id });
}
function getMovies(queryParams) {
  return client
    .db('newDB')
    .collection('movies')
    .find(queryParams)
    .toArray();
}

export {deleteMovie,editMovie,addMovies,getMovieByID,getMovies}
