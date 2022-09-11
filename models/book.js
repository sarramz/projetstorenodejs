const mongoose=require('mongoose')
const BookSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            
        },
        price:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        userId:{
            type:String,
           
        }
    }
);

module.exports=mongoose.model("book",BookSchema);