const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const app = express();
global.__basedir = __dirname;

// config import
const {db} = require('./server/config')

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors())
app.use(fileUpload());

// PORT
const PORT = process.env.PORT || 3000

// connect db
mongoose.connect(`mongodb+srv://${db.USERNAME}:${db.PASSWORD}@spana.yckcm.mongodb.net/${db.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// route
require('./server/routes/auth.routes')(app);
require('./server/routes/user.routes')(app);
require('./server/routes/file.routes')(app);

app.get("/api", (req,res)=> {
  res.json('Hello world')
});

app.listen(PORT, ()=> {
  console.log(`App is listening to port: ${PORT}`);
})
 
