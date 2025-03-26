const User = require('../../models/User.js')


async function createAcount (req,res){
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({msg:"All filed required"})
        }
        const isExists = await User.findOne({email})
        if(isExists){
            return res.status(404).json({msg:"User already exists"})
        }
        const saveUser = new User({name,email,password})
        await saveUser.save();
        return res.status(201).json({msg:"User create Successfully" , saveUser})

    }
    catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
}
module.exports = {createAcount}