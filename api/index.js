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

app.listen(3000);