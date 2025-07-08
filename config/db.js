const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/dashbord')

const db=mongoose.connection;

db.once('open',()=>{
    console.log('server connect sucssesfuly');
    
})