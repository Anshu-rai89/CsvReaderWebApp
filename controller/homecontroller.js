const CSVFILE=require('../model/csvfile');

module.exports.home=async function(req,res)
{  try{

    // finding all files from db
        let  csvfiles=await CSVFILE.find({});

        // reendering home view
        return res.render('home',
        {
            title:'home',
            data:csvfiles
        });

    }catch(err)
    {
        console.log('error in fetching files ',err);
        return res.redirect('back');
    }
}