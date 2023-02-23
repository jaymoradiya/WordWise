const express = require('express')
const bodyParser = require('body-parser');
const cors =  require('cors');
const { USERS, UserModel } = require('./data');

const app = express()


app.use(cors());
app.use(bodyParser());

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/users', function (req, res) {
  res.send(
    USERS.map(user => user.toJson())
  );
})

app.post('/signup', function (req, res) {

  const response = {};
  
  const user = {
   'email': req.body.email,
   'password':req.body.password,
  }

  if (!user.email){
    response.error = true;
    response.message = "email required";
    return res.send(response);
  }
  if (!user.password){
    response.error = true;
    response.message = "password required";
    return res.send(response);
  }

  try {

    const savedUsers = USERS.find(u => u.email == user.email);
    console.log(`saved users -> ${savedUsers}`);
    if (savedUsers){
      response.error = true;
      response.message = "user already exists";
      return res.send(response);
    }


    USERS.push(new UserModel(user.email,user.password));
    
    response.error = false;
    response.message = "user created successfully!";
  } catch (error) {
    response.error = true;
    response.message = "something went wrong!";
  }
  res.send(response);
})

app.post('/login', function (req, res) {

  const response = {};
  
  const user = {
   'email': req.body.email,
   'password':req.body.password,
  }

  if (!user.email){
    response.error = true;
    response.message = "email required";
    return res.send(response);
  }
  if (!user.password){
    response.error = true;
    response.message = "password required";
    return res.send(response);
  }

  try {
    const savedUsers = USERS.find(u => u.email == user.email);
    if (!savedUsers){
      response.error = true;
      response.message = "user doesn't exists!";
      return  res.send(response);
    }

    if(savedUsers.password == user.password){
      response.error = false;
      response.message = "welcome to WordWise!";
      response.token = parseInt(Math.random() *1000);
    }else{
      response.error = true;
      response.message = "incorrect password!";
    }

  } catch (error) {
    response.error = true;
    response.message = "something went wrong!";
  }
  res.send(response);
})

app.post('/sendOtp', function (req, res) {

  const response = {};
  
  const user = {
   'email': req.body.email,
  }

  if (!user.email){
    response.error = true;
    response.message = "email required";
    return res.send(response);
  }


  try {
    const savedUsers = USERS.findIndex(u => u.email == user.email);
    if (savedUsers === -1){
      response.error = true;
      response.message = "user doesn't exists!";
      return  res.send(response);
    }

    USERS[savedUsers].opt = parseInt(Math.random() *8999) + 1000;
    
    response.error = false;
    response.message = "Opt sent! please check your mail";
    response.opt = USERS[savedUsers].opt;
   
  } catch (error) {
    response.error = true;
    response.message = "something went wrong!";
  }
  res.send(response);
})

app.post('/verifyOtp', function (req, res) {

  const response = {};
  
  const user = {
   'email': req.body.email,
   'opt': req.body.otp,
   'password': req.body.password,

  }

  if (!user.email){
    response.error = true;
    response.message = "email required";
    return res.send(response);
  }

  try {
    const savedUsers = USERS.findIndex(u => u.email == user.email);
    if (savedUsers === -1){
      response.error = true;
      response.message = "user doesn't exists!";
      return  res.send(response);
    }

    if (USERS[savedUsers].opt != user.opt) {
      response.error = true;
      response.message = "Incorrect OTP!";
      return  res.send(response);
    }

    USERS[savedUsers].opt = null;
    USERS[savedUsers].password = user.password;
    
    response.error = false;
    response.message = "Password updated!";
   
  } catch (error) {
    response.error = true;
    response.message = "something went wrong!";
  }
  res.send(response);
})

function makePass(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


app.listen(3000);