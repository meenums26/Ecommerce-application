const { urlencoded, response, request } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log("user:",user)
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('user/view-products',{products,user});
  })

});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }
  else{

    res.render('user/login',({"loggInErr":req.session.loggInErr}))
  }
 
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  console.log("req body:",req.body)
   userHelpers.doSignup(req.body).then((response)=>{
    console.log(response)
   })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true 
      req.session.user=response.user
      res.redirect('/')
    }
    else{
      req.session.loggInErr="Invalid username or password!"
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verifyLogin,(req,res)=>{

  res.render('user/cart')
})

module.exports = router;
