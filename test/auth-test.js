const {expect, should, assert} = require("chai");
const authMiddleware = require("../middleware/is-auth");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth Middleware", function(){
  it("should throw an error if no auth header is present", function(){
    const req = {
      get: (header) => null
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw("Not authenticated")
  });

  it("should throw an error if the auth header is only one string", function(){
    const req = {
      get: (header) => "test"
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw()
  });

  it("should throw an error if the token cannot be verified", function(){
    const req = {
      get: (header) => "Bearer test"
    }
    sinon.stub(jwt, "verify");
    jwt.verify.returns({userId:"user"});
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "user");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
