const express = require('express')
const path=require('path')
const app = express();

const db = require('./config/db')
app.set('view engine','ejs') 
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.urlencoded({extended:true}))
app.use('/uplodes',express.static(path.join(__dirname,'uplodes')))

app.use('/',require('./routes/index'))
app.listen(3000, () => {
    console.log(`http://localhost:3000`);
 

}) 