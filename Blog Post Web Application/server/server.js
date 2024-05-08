import express from 'express';
import mongoose from 'mongoose';
const server = express();
let PORT = 3000;

mongoose.connect()
server.listen(PORT, ()=> {
    console.log('listening on port ' + PORT)
})

//username - manukamayurajith2001
//password- CSZY6k5uSx4LWpVH
//DB LOCATION-
 // mongodb+srv://manukamayurajith2001:<password>@blooging-web.nm2zilt.mongodb.net/?retryWrites=true&w=majority