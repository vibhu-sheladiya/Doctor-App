const mongoose= require('mongoose');
const config= require('../config/config');


const connectDB= async()=>{
    mongoose
    .connect(config.mongodb.url,config.mongodb.option)
    .then((data)=>{console.log("MongoDB Connected")
})
.catch((error)=> {console.error("Error connecting to MongoDB",error)
});
};

module.exports={connectDB};