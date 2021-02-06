require("dotenv").config();
const {expect, should, assert} = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/User");
const AuthController = require("../controllers/auth");


describe("Auth Controller", function(){
  //Before
  before(function(done){
    mongoose.connect(process.env.MONGODB_TEST)
    .then(result => {
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

  it("should send a response with a valid user status for an existing user", function(done){
      const req = {userId: "5c0f66b979af55031b34724a"};
      const res = {
        statusCode: 500,
        userStatus: null, 
        status: function(code){
          this.statusCode = code;
          return this
        },
        json: function(data){
          this.userStatus = data.status;
        }
      }
      AuthController.getUserStatus(req, res, ()=>{}).then(()=>{
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal('I am new!');
        done();
      })
  });

  //After
  after(function(done){
    User.deleteMany({})
        .then(() => mongoose.disconnect())
        .then(() => done());
  });
});