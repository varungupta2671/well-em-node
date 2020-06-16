const mongoose=require('mongoose');
// const url="mongodb://localhost:27017/hms";
const url="mongodb+srv://its_varungupta:1234567890@clustercrudapp-yu3mr.mongodb.net/hms?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser:true},function(err){
    if(err){
        console.log('Error in connection');
    }
    else{
        console.log('Connected!');
    }
});
module.exports=mongoose;