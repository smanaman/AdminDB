const express=require('express')

const router=express.Router()
const admine=require('../model/AllAdmineTbl')
let Allcontoller=require('../controllers/Allcontroller')



router.get('/',Allcontoller.Dashbord)
router.get('/adddata',Allcontoller.AddData)
router.post('/add-user',admine.Imageupload,Allcontoller.AddedData)
router.get ('/view-user',Allcontoller.ViewUser)
router.get ('/editdata/:id',Allcontoller.editdata)
router.post('/edit-user/:id',admine.Imageupload,Allcontoller.editUser)

module.exports=router