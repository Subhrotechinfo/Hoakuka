//for easily access to paths inside the project
const path = require('path');
//load express
const express = require('express');
const publicPath = path.join(__dirname,'../public');
//config the env PORT variable
const port = process.env.PORT || 3000;

//configure our express application
var app = express();

//config express static middleware
app.use(express.static(publicPath));

app.listen(port,() =>{
  console.log(`Server is up on port ${port}`);
});
