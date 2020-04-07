const CSVFILE=require('../model/csvfile');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];


// function to create file 
module.exports.create=function(req,res)
{

    let filepath;
   
  // uploading file
    CSVFILE.uploadedfile(req,res,function(err)
    {
        if(err)
        {
            return res.redirect('back');
        }

  
        if(req.file)
        {
            filepath=CSVFILE.csvfilepath+'/'+req.file.filename;
           
        }

        // craetinf file in db
        CSVFILE.create(
            {
                filepath:filepath,
                filename:req.file.filename
            },function(err,csvfile)
            {
                if(err)
                {
                    console.log('error in craeting file',err);
                    return res.redirect('back');
                }

                return res.render('productuploadmsg');
            }
        )

    })
    
}


module.exports.showfile=async function(req,res)
{
    try{

        // fetching file by id 
        let csvfile=await CSVFILE.findById(req.query.id);

        // giving file with path 
           let filename=__dirname+'/..'+csvfile.filepath;
           console.log('file is present at ',filename);

           // parsing csv file
          await  fs.createReadStream(`${filename}`)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
               // console.log(results);
   
            });
             
            // extracting all props which is going to be our column
            var propNames = Object.keys(results[0]);
            console.log('obj is ',propNames);

            // rendering file view
             return res.render('file',
             {
                  title:`${csvfile._id}`,
                  data:results,
                  headers:propNames
             });

    }catch(err)
    {
        console.log('error in showing file ',err);
        return res.redirect('back');
    }
}


module.exports.search=async function(req,res)
{  try{
   
       // fetching file bi id 
    let csvfile=await CSVFILE.findById(req.query.id);
 
    // parsing file
    let filename=__dirname+'/..'+csvfile.filepath;
           console.log('file is present at ',filename);
          await  fs.createReadStream(`${filename}`)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
               // console.log(results);
   
            });

           //const regex = new RegExp(escapeRegex(req.body.name), 'gi');
           console.log("deatils are ",results[0]);
            var propNames = Object.keys(results[0]);
            let res1=[]
            let column=req.body.col;
            let val=req.body.name;
            if(req.body.name){
            // const index=results.findIndex(x=>x[column]===val);
            //     res1.push(results[index]);

            for (data of results)
            {
                for(c of propNames)
                {
                    if(data[column]==val)  res1.push(data);
                }
            }

           
            }
            else{
                for (r of results)
                {
                    res1.push(r);
                }
            }
          console.log(res1);

    return res.render('search',
    {
        data:res1,
        headers:propNames
    });

}catch(err)
{
    console.log("error in search",err);
    return res.redirect('back');
}
}


// function for fuzzy search using regular expressions 

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};