const Destination=require('../models/destinations.model')

const createDestination=async(destinationBody)=>{
    try{
        const newDestination=new Destination({
            name:destinationBody.name,
            location:destinationBody.location,
            country:destinationBody.country,
            description:destinationBody.description,
        })
        const savedDestination=await newDestination.save();
        return savedDestination;
    }catch(error){
        console.error("Error creating new destination:",error);
    }
}

const getDestinationByName=async(destinationName)=>{
    try{
        const destination=await Destination.findOne({name:destinationName});
        if(destination){
            return destination;
        }else{
            throw "Destination not found";
        }
    }catch(error){
        console.error("Error geting destination by name:",error);
    }
}



const getAllDestinations=async()=>{
    try{
        const allDestinations=await Destination.find();
        return allDestinations;
    }catch(error){
        console.error("Error geting destinations:",error);
    }
}

const deleteDestinationById=async(destinationId)=>{
    try{
        const deletedDestination=await Destination.findByIdAndDelete(destinationId);
        return deletedDestination;
    }catch(error){
        console.error("Error Deleting Destination:",error)
    }
}

const getDestinationsByLocation=async(destinationLocation)=>{
    try{
        const destinations=await Destination.find({location:destinationLocation});
        if(destinations){
            return destinations;
        }else{
            throw "Destinations not found";
        }
    }catch(error){
        console.error("Error geting destination by location:",error);
    }
}

const getDestinationByRating=async()=>{
    try{
        const allDestinations=await Destination.find();
        const sortedDestinations=allDestinations.sort((a,b)=>b.rating-a.rating);
        return sortedDestinations;
    }catch(error){
        console.error("Error geting destination by rating:",error);
    }
}

const updateDestinationById=async(destinationId,updatedDestinationDetails)=>{
    try{
        const destination=await Destination.findById(destinationId);
        if(destination){
            Object.assign(destination,updatedDestinationDetails);
            const updatedDestination=await destination.save();
            return updatedDestination;
        }else{
            throw "Destination not found";
        }
    }catch(error){
        console.error("Error Updating Destination:",error)
    }
}

const filterByMinRating=async(minRating)=>{
    try{
        const destinations=await Destination.find({rating:{$gte:minRating}})
        return destinations;
    }catch(error){
        console.error("Error finding destination:",error);
    }
}

const addReview=async(destinationId,reviewBody)=>{
    const {review,rating,userId}=reviewBody;
    try{
        const newReview={
            review,
            rating,
            user:userId
        };
        const destination=await Destination.findById(destinationId);
        destination.reviews.push(newReview);
        const updatedRating=destination.reviews.reduce((acc,currVal)=>acc+currVal.rating,0)/destination.reviews.length;
        destination.rating=updatedRating.toFixed(1);
        await destination.save();
        return destination;
    }catch(error){
        console.error("Error adding reviews:",error);
    }
}

const getReviewsWithUserDetails=async(destinationId)=>{
    try{
        const destination=await Destination.findById(destinationId).populate('reviews.user')
        const reviews=destination.reviews;
        return reviews;
    }catch(error){
        console.error("Error getting user reviews:",error);
    }
}

module.exports={createDestination,getDestinationByName,getAllDestinations,deleteDestinationById,getDestinationsByLocation,getDestinationByRating,updateDestinationById,filterByMinRating,addReview,getReviewsWithUserDetails};