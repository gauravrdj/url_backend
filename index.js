const express=require('express')
const {user}=require('./db')
const bodyParser=require('body-parser')
const cors=require('cors');
const app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));


app.post('/api/v1/user',async(req, res)=>{

	const data=req.body;
	console.log(data);
	const find_user=await user.findOne({
		name:data.name,
	});
     if(!find_user){
		await user.create({ 
			name:data.name,
		})
		return res.json({
			msg: "user created!",
			status:404,
			newUser:true,
		})
	 }
	 
	 if(data.profile===undefined || find_user.password===undefined ||find_user.password===null){
		let newOrNot=false;
		if(find_user.password===undefined || find_user.password===null){
			newOrNot=true;
		}
		return res.json({
			msg: "profile undefined",
			status:404,
			newUser:newOrNot,
		})
	 }
	 else{
		try{
		const query={};
		query[data.profile]={$exists:true};
		const found=await user.find(query);
		if(found.length===0){
			return res.json({
				msg: "Profile Not found",
				status:404,
			})
		}
		return res.json({
			link:find_user[data.profile],
			status:200,
		})
	}
	catch(e){
		return res.json({
			msg: "Error while profile fetching",
			status: 403
		})
	}
	 }
	
	
	
})

app.post('/profile', async(req,res)=>{
	console.log(req.body);
   const profile=req.body.profile;
   const url=req.body.url;
   const updateField = {};
        updateField[profile] = url;
		try{
   const account=await user.updateOne({
	name:req.body.name,
   }, [
	{ 
		$set: updateField,
	}
   ]

)
res.status(200).json({
	msg: "profile inserted successfully!",
	status:200,
	account
})	
		}
		catch(e){
			req.status(403).json({
				msg: "Error while inserting profile",
				status:403
			})
		}
	
   
})

app.post('/api/v1/user/password', async(req,res)=>{
	const data=req.body;
	try{
    const account=await user.updateOne({
		name:data.username,
	}, [
		{
			$set :{
				password : data.password,
			}
		}
	])
	return res.json({
		status:200,
		msg: "Password added successfully",
	})
}
catch(e){
   return res.json({
	msg: "error while adding password"
   })
}
})

app.post('/api/v1/user/verify', async (req,res)=>{
	const data=req.body;
	const account=await user.findOne({
		name:data.username,
		password:data.password,
	})
	if(!account){
		return res.json({
			status:404,
		})
	}
	return res.json({
		status:200,
	})
})

app.get('/', (req,res)=>{
	return res.json({
		msg: "Gaurav Sharma"
	})
})

app.listen(3000, (req,res)=>{
    console.log('Server started')
})