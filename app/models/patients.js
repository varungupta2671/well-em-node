const db=require('../dbconnection');

/**
 * Patients
 * --------
 * "name" : "Sam",
 * "age" : 27,
 * "bg" : "AB+",
 * "weight" : 67,
 * "height" : 180,
 * "hid" : "2345454",
 * "aadharid" : "34234dff",
 * "dob" : "01/02/1993",
 * "sex" : "m",
 * "phone" : "9988845535",
 * "email" : "est@gmail.com",
 * "address" : "332 Neeladhri, E-City",
 * "city" : "Bangalore"
**/

const patientsSchema=db.Schema({
    hid:{type:String,required:true,unique:true},
    aadharid:String,
    name:{type:String,required:true},
    age:{type:Number,required:true},
    bg:{type:String,required:true},
    weight:{type:Number,required:true},
    height:{type:Number,required:true},
    dob:{type:Date,required:true},
    sex:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true}
});

module.exports=db.model('patients',patientsSchema);
