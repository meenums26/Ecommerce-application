var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{products,admin:true});
  })
 /* let products = [
    {
      name : "BLUE DIAL SILVER STAINLESS STEEL STRAP WATCH",
      company : "TITAN",
      prize : "1845",
      image: 'https://staticimg.titan.co.in/Titan/Catalog/2574SM01_1.jpg?pView=pdp'
    },
    {
      name : "THE QUEEN'S WATCH BY GRANDMASTER",
      company : "TITAN",
      prize : "11995",
      image: 'https://staticimg.titan.co.in/Titan/Catalog/1789KM01_1.jpg?pView=pdp'
    },
    {
      name : "THE KNIGHT'S WATCH BY GRANDMASTER",
      company : "TITAN",
      prize : "9995",
      image: 'https://staticimg.titan.co.in/Titan/Catalog/1787BM01_1.jpg?pView=pdp'
    },
    {
      name : "RETROGRADE BLUE DIAL STAINLESS STEEL STRAP WATCH",
      company : "TITAN",
      prize : "8795",
      image: 'https://staticimg.titan.co.in/Titan/Catalog/90101SM01_1.jpg?pView=pdp'
    }
  ]*/
  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product');
}) 
router.post('/add-product',(req,res)=>{
 console.log(req.body);
 console.log(req.files.image);
 productHelpers.addProduct(req.body,(id)=>{
   let image = req.files.image
   console.log("id:",id);
   image.mv('./public/images/product-images/'+id+'.jpg',(err,done)=>{
     if(!err){
       res.render('admin/add-product')
     }else{
       console.log(err);
     }
   })
   
 })
})
router.get('/delete-product/:id',(req,res)=>{
   let proId=req.params.id
   console.log("product id:",proId)
   productHelpers.deleteProduct(proId).then((response)=>{
     res.redirect('/admin/')
   })
})
module.exports = router;
