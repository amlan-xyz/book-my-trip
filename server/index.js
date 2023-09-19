require('dotenv').config()
require('./db')

const express=require('express');

const app=express();
app.use(express.json());

const destinationRoutes=require('./routes/destination.routes');
const userRoutes=require('./routes/users.routes')

app.get('/',(req,res)=>{
    res.send("Book My Trip")
})

app.use('/destinations',destinationRoutes);
app.use('/users',userRoutes);

app.get('*',(req,res)=>{
    res.send("page not found")
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})