const mongoose = require('mongoose')

const ConnectDb = async function (){
    try{
        mongoose.connect(process.env.URL).then(()=>{
            console.log("App Connect to database")
        })
    }
    catch(error){
        process.exit(1)
    }
}

module.exports = ConnectDb