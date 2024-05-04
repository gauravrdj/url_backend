const mongoose =require ('mongoose');

mongoose.connect('mongodb+srv://gaurav_rdj:gaurav%402002S@firstcluster.66p7ced.mongodb.net/urls');

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