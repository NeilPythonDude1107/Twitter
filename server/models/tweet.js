const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const tweetSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    image:{
        type:String
    },
    postedBy:{
        type: Object,
        required: true
    },
    comments:[],
    createdAt:{
        type:String,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    postedByUsername:{
        type: String,
        required:true
    }
})

mongoose.model('Tweet', tweetSchema)