//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
import passport from 'passport';
import passportService from '../passport';
import Home from '../../models/Home';
import User from '../../models/User';
import { tokenForUser } from '../tokens';
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.route('/').get( function(req, res){
  res.render('index')
});

//HOMES

//Delete one home by id
router.route('/delete').post(function(req, res) {

  console.log("Routes.js /delete") 
  var _id = req.body._id;
  console.log(_id)
  
  Home.findByIdAndRemove({ '_id': _id} , (err, homes) => {
      if(err){
        res.send(err)
      }
      else{
        console.log(homes)
        res.send('Home successfully deleted!');
      }
      
  });

});

//Update Home
router.route('/update').post(function(req, res) {
 
  console.log("Routes.js /update") 
  
  const doc = {
    _id: req.body._id,
    user: req.body.user, 
    title: req.body.title, 
    type: req.body.type, 
    image: req.body.image, 
    size: req.body.size, 
    rooms: req.body.rooms 
  };

  console.log(doc);

  if(doc.title){

    console.log("Update title")

    Home.findOneAndUpdate({ '_id' : doc._id}, { title: doc.title } , (err, homes) => {

      console.log("Homes: " + homes)

      if (err) { 
        console.log("There is an error")
        return next(err); 
      }
      else if(homes){
        console.log("Found homes")
        console.log(homes)
        return res.json(homes);
      }
      else{
        console.log("No homes")
        res.send(err);
      }

      console.log(homes)
      res.send('Home successfully updated!');
 
    });
  }
  else if (doc.size){

    console.log("Search size")

    Home.findOneAndUpdate({ '_id' : doc._id}, { size: doc.size } , (err, homes) => {

      if (err) { 
        console.log("There is an error")
        return next(err); 
      }
      else if(homes){
        console.log("Found homes")
        console.log(homes)
        return  res.json(homes);
      }
      else{
        console.log("No homes")
        res.send(err);
      }     
        console.log(homes)  
        res.send('Home successfully updated!');
    });
  }

});


//Add a home 
router.route('/add').post(function(req, res, next) {

  console.log("Routes.js Add") //Syns bara i själva rutan. 
  
  const {user, title, image, type, size, rooms} = req.body;
  console.log(req.body)

  //Se till att alla fält är ifyllda. 
  if (!title || !user || !image || !type|| !size || !rooms) {
       console.log("all fields are required")
      return res.status(422).send({ error: "all fields are required" });
  }

  //Kollar om det finns ett hem med samma titel. 
  Home.findOne({ title }, (err, existingHome) => {

    if(err) { 
      return next(err); 
    }

    //Skapa ett nytt "home" med schema Home. 
    const home = new Home({ user, title, image, type, size, rooms });

    //Spara
    home.save((err) => {
      if (err) { 
        return next(err); 
      }
      //Respond med en titel. 
      res.json({ title });
    });
  });
});

//Search for homes
router.route('/search').post(function(req, res, next) {

  console.log("Routes.js Search")
 
  const doc = {
    user : req.body.user,
    title: req.body.title, 
    type: req.body.type, 
    size: req.body.size, 
    rooms: req.body.rooms, 
    maxsize: req.body.maxsize, 
    minsize: req.body.minsize, 
    maxrooms: req.body.maxrooms,
    minrooms: req.body.minrooms
  };

  console.log(doc)

  //Search for user in Home
  if(doc.user){

    console.log("Search user")
    Home.find({user: doc.user}, {} , function(err, homes) {
      if (err) { 
        console.log("There is an error")
        return next(err); 
      }
      else if(homes){
        console.log("Found homes")
        return  res.json(homes);
      }
      else{
        console.log("No homes")
        res.send(err);
      }
    });
  }
  else if(doc.maxsize || doc.minsize){

    console.log("Search size")
    if(!doc.maxsize){ doc.maxsize = 100000} //If maxsize is not set
    if(!doc.minsize){ doc.minsize = 0} //If minsize is not set

    Home.find({type:doc.type} , function(err, homes){

      console.log("Homes " + homes)

      if (err) { 
        console.log("There is an error")
        return next(err); 
      }
      else if(homes){
        console.log("Found homes")
        return  res.json(homes);
      }
      else{
        console.log("No homes")
        res.send(err);
      }
 
    })
    .where('size').lte(doc.maxsize).gte(doc.minsize); //Get all the sizes between these values. gte:greater than & equal. 

  }
  else if(doc.maxrooms || doc.minrooms){

    console.log("Search rooms")
    if(!doc.maxrooms){ doc.maxrooms = 100000} //If maxsize is not set
    if(!doc.minrooms){ doc.minrooms = 0} //If minsize is not set

    Home.find({type:doc.type} , function(err, homes){

      console.log("Homes " + homes)

      if (err) { 
        console.log("There is an error")
        return next(err); 
      }
      else if(homes){
        console.log("Found homes")
        return  res.json(homes);
      }
      else{
        console.log("No homes")
        res.send(err);
      }
 
    })
    .where('rooms').lte(doc.maxrooms).gte(doc.minrooms); //Get all the sizes between these values. gte:greater than & equal. 

  }
  /*else if(doc.title){

    console.log("Search title")

    Home.find({title: doc.title}, {} ,function(err, homes) {
      if (err){res.send(err);}

        res.json(homes);
        console.log(homes)
    });
  }*/
/*  else if(doc.title && doc.type){

    console.log("Search both")

    Home.find(  [{title: doc.title}, {type: doc.type}], function(err, homes) {
      if (err){res.send(err);}

        res.json(homes);
        console.log(homes)
    });

  }*/
  else if(doc.type){

    console.log("Search type")

    Home.find({ 'type' : doc.type}, {} , (err, homes) => {

      console.log("Homes" + homes)

      if (err) { 
        console.log("There is an error")
        return next(err); 
      }
      else if(homes){
        console.log("Found homes")
        return  res.json(homes);
      }
      else{
        console.log("No homes")
        res.send(err);
      }
 
    });
  }
  else{
    console.log("No homes")
  }

});


//AUTHENTIFICATION

//Sign up
router.route('/signup').post(function(req, res, next){

  console.log("Routes.js Signup")
  const {email, password } = req.body;
  console.log(email)

	if (!email || !password) {
    console.log("all fields are required")
  	return res.status(422).send({ error: "all fields are required" });
	}

	User.findOne({ email }, (err, existingUser) => {

    console.log(existingUser)

  	if(err){ 
      return next(err); 
    }
    else if (existingUser) {
      console.log("Email is in use")
      return res.status(422).send({ error: "Email is in use" });
    }
    else{

      const user = new User({ email, password });

      user.save((err) => {
        if (err) { 
          return next(err); 
        }
        res.json({ email });
      });
    }

  	
  });
});

//Sign in
router.route('/signin').post(requireSignin, function(req, res){

	console.log("Routes.js signin")
	const { email } = req.body.email;  
  
  console.log(req.body.email)

  res.json({ token: tokenForUser(req.body.email), email });

});

//Log out 
router.route('/signout').get(function(req, res) {
	
	console.log("Routes.js singnout")
	req.logout();
  res.redirect('/');
});

module.exports = router;