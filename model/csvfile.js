const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const CSVFILE_PATH=path.join('/uploads/csvfile');

const csvfileSchema = new mongoose.Schema({

    filepath:
    {
        type:String,
        required :true
    },
    filename:
    {
        type:String,
        reuired:true
    }
});
 
// function to upload file
let storage=multer.diskStorage(
    {
        destination:function(req,file,cb)
        {   console.log('in destination users',CSVFILE_PATH);
            cb(null,path.join(__dirname,'..',CSVFILE_PATH));
        },
        filename:function(req,file,cb)

        {      // checking if file ext is .csv 
              if(path.extname(file.originalname)=='.csv')
            cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
        }
        }
 
);

// static to make them available for others
csvfileSchema.statics.uploadedfile=multer({storage:storage}).single('csvfile');
csvfileSchema.statics.csvfilepath=CSVFILE_PATH;





const   CSVFILE = mongoose.model('CSVFILE', csvfileSchema);
module.exports = CSVFILE;