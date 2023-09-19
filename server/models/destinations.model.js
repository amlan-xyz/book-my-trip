const mongoose=require('mongoose');

const destinationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:String,
    country:String,
    description:{
        type:String,
        required:true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviews:[
        {
            review:String,
            rating:{
                type: Number,
                min: 0,
                max: 5,
                default: 0,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        }    
    ]
},{
    timestamps: true,
});

const Destination=mongoose.model("Destination",destinationSchema);
module.exports=Destination;