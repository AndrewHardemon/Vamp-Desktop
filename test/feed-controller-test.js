require("dotenv").config();
const {expect, should, assert} = require("chai");
// const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/User");
// const Post = require("../models/Post");
const FeedController = require("../controllers/feed");
const app = require("express")();
let server;

describe("Feed Controller", function(){
  //Before
  before(function(done){
    mongoose.connect(process.env.MONGODB_TEST)
    .then(result => {
      server = app.listen(3000);
      const io = require('../socket').init(server);
      io.on('connection', socket => {
        console.log('Client connected');
      });
      const user = new User({
        email: "mocha@mocha.mocha",
        password: "mocha",
        name: "Mocha",
        posts: [],
        _id: "5c0f66b979af55031b34724a"
      });
      return user.save();
    })
    .then(() => done())
    .catch(err => console.log(err))
  });

  it("should add a created post to the posts of the creator", function(done){
      const req = {
        body: {
          title: "Mocha Post",
          content: "Mocha Content"
        },
        file: {
          path: "mocha"
        },
        userId: "5c0f66b979af55031b34724a"
      }
      const res = {status: function(){return this}, json: function(){}}
      FeedController.createPost(req, res, () => {}).then((savedUser) => {
        expect(savedUser).to.have.property("posts");
        expect(savedUser.posts).to.have.length(1);
        done()
      })
  });

  //After
  after(function(done){
    User.deleteMany({})
        .then(() => mongoose.disconnect())
        .then(() => server.close())
        .then(() => done());
  });
});