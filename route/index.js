const express=require('express');
const path = require('path');
// var fallback = require('express-history-api-fallback')

// using express route
const router=express.Router();
const homecontroller=require('../controller/homecontroller');


// rendering home view 
router.get('/',homecontroller.home);

// route for file
router.use('/file',require('./file'));




module.exports=router;