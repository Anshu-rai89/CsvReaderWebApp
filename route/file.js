
const express=require('express');

const router=express.Router();

const fileController=require('../controller/filecontroller');



router.post('/create',fileController.create);
router.get('/showfile',fileController.showfile);
router.post('/search',fileController.search);




module.exports=router;
