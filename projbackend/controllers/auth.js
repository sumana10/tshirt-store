const User = require("../models/user");
// use of express validator
const { check, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const router = require("../routes/auth");


exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

//refers the User model
  const user = new User(req.body);
// save user 
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
//get the data in postman
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  //body is abig object from where we get email and password
  //this is called destructuring

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  //mongoose method to find user
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }
    //password match decrypt password of db and match with user password
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};


 exports.signout = (req, res) => {
   res.clearCookie("token");
   res.json({
    message: "User signout successfully"
  });
 };
//router.get("/signout", signout);

//router.get("/testroute", is)
//protected routes

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

//custom middleware
// auth comes from isSignedIn
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker){
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    return res.status(403).json({
      error: "You are not ADMIN"
    });
  }
  next();
}