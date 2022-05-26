const path = require('path');
const fs = require('fs');
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const PORT = process.env.PORT || 8080;

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("fileStorage", file)
    const fullDir = path.join(__dirname, 'images')
    if (!fs.existsSync(fullDir)) {
      fs.mkdir(fullDir, function(err){
        if (err) throw err;
        cb(null, fullDir);
      });
    } else {
      cb(null, fullDir);
    }
  },
  filename: (req, file, cb) => {
    console.log("filename", file)
    const name = new Date().toISOString().replace(/:/g,"-") + '-' + file.originalname //file.originalname.split(".")[0] + "." + file.mimetype.split("/")[1]
    console.log(name)
    cb(null, name);
  }
}); 

const fileFilter = (req, file, cb) => {
  console.log("filefilter", file)
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded <form>
app.use(express.json()); // application/json

app.use(multer({ storage: fileStorage, fileFilter: fileFilter, onFileUploadStart: function(file){
  console.log(file.originalname + " is starting ... ")
} }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Serve static assets
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "./client/build")))
}


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    process.env.MONGODB_PASS || 'mongodb://localhost/vampdesktop', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(result => {
    const server = app.listen(PORT);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch(err => console.log(err));
