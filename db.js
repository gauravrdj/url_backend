require('dotenv').config();
const mongoose =require ('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    }
}, {
    strict:false,  //allow dynamic insertion
})


const user=mongoose.model('user', userSchema);

module.exports={
    user,
}