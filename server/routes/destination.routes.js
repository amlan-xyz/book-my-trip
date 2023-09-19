const express=require('express');
const { createDestination, getDestinationByName, getAllDestinations, deleteDestinationById, getDestinationsByLocation, getDestinationByRating, updateDestinationById, filterByMinRating, addReview, getReviewsWithUserDetails } = require('../utils/destinations.utils');
const router=express.Router();

router.post('',async(req,res)=>{
    const destinationBody=req.body;
    try{
        const savedDestination=await createDestination(destinationBody);
        if(savedDestination){
            res.status(201).json({message:"Destination created",data:savedDestination});
        }else{
            res.status(404).json({message:"Destination creation failed"})
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('',async(req,res)=>{
    try{
        const allDestinations=await getAllDestinations();
        res.status(200).json({message:"All Destinations:",data:allDestinations})
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('/rating',async(req,res)=>{
    try{
        const sortedDestinations=await getDestinationByRating();
        res.status(200).json({message:"Destination sorted in descending order",data:sortedDestinations});
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('/:name',async(req,res)=>{
    const destinationName=req.params.name;
    try{
        const destination=await getDestinationByName(destinationName);
        if(destination){
            res.status(200).json({message:"Destination Found",data:destination});
        }else{
            res.status(404).json({message:"Destination not found"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.delete('/:id',async(req,res)=>{
    const destinationId=req.params.id;
    try{
        const deletedDestination=await deleteDestinationById(destinationId);
        if(deletedDestination){
            res.status(202).json({message:"Destination Deleted",data:deletedDestination});
        }else{
            res.status(404).json({message:"Destination Deletion Failed"})
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.post('/:id',async(req,res)=>{
    const destinationId=req.params.id;
    const updatedDestinationDetails=req.body;
    try{
        const updatedDestination=await updateDestinationById(destinationId,updatedDestinationDetails);
        if(updatedDestination){
            res.status(200).json({message:"Destination Details Updated",data:updatedDestination});
        }else{
            res.status(404).json({message:"Destination updation failed"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('/location/:location_name',async(req,res)=>{
    const locationName=req.params.location_name;
    try{
        const destinations=await getDestinationsByLocation(locationName);
        if(destinations){
            res.status(200).json({message:"Destination found",data:destinations});
        }else{
            res.status(404).json({message:"Destination not found"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('/filter/:rating',async(req,res)=>{
    const mingRating=req.params.rating;
    try{
        const destinations=await filterByMinRating(Number(mingRating));
        res.status(200).json({message:"Destinations found",data:destinations});
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.post('/:id/reviews',async(req,res)=>{
    const destinationId=req.params.id;
    const reviewBody=req.body;
    try{
        const updatedDestination=await addReview(destinationId,reviewBody);
        if(updatedDestination){
            res.status(200).json({message:"Review added",data:updatedDestination});
        }else{
            res.status(404).json({message:"Cannot add review"})
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

router.get('/:id/reviews',async(req,res)=>{
    const destinationId=req.params.id; 
    try{
        const reviews=await getReviewsWithUserDetails(destinationId);
        if(reviews){
            res.status(200).json({message:"Reviews",data:reviews});
        }else{
            res.status(404).json({message:"Cannot find reviews"});
        }
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
})

module.exports=router;