# fynd-assign-backend

To run project use yarn dev/ npm start

## Constant.js
common\constant.js
It has movie and genre data that will be seeded first time application is deployed

## Routes
We have two user routes
user/
movie/

From the respective route files api endpoint can be tested

## User Apis:
server_url/user/signin (post) {email:"",password:""}
server_url/user/list (post){ limit: 0, page: 0, genre: [], search: "" } // token in header
server_url/user/logout (post) {} // token in header

## Movie Apis:
server_url/movie/list (post){ limit: 0, page: 0, genre: [], search: "", sort:{} } // token in header
server_url/movie/create (post)  {name:'', director,'', 99popularity:'', imdb_score:'', genre:[], isOther:false, other:''}// token in header
server_url/movie/{id} (put){name:'', director,'', 99popularity:'', imdb_score:'', genre:[], isOther:false, other:''} also id from params // token in header
server_url/movie/{id} (get) id from params // token in header
server_url/movie/{id} (delete) if from params // token in header
server_url/movie/genres (get)
