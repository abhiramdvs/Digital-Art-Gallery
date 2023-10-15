
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/DAGUserDetails")

.then(()=>{
    console.log("MongoDB Connected");
})
.catch(()=>{
    console.log("Failed to connect - MongoDB");
})

const LoginSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection1", LoginSchema)

module.exports = collection