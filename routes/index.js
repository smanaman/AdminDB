const express=require('express')

const router=express.Router()
const admine=require('../model/AllAdmineTbl')
let Allcontoller=require('../controllers/Allcontroller')

const {cheakelogin}=require('../middleware/auth')

router.get('/dashbord',Allcontoller.Dashbord)
router.get('/adddata',Allcontoller.AddData)
router.post('/add-user',admine.Imageupload,Allcontoller.AddedData)
router.get ('/view-user',Allcontoller.ViewUser)
router.get ('/editdata/:id',Allcontoller.editdata)
router.post('/edit-user/:id',admine.Imageupload,Allcontoller.editUser)
router.get('/delete-user/:id',Allcontoller.deleteUser)
router.get('/',Allcontoller.singin)
router.post('/login',Allcontoller.login)
module.exports=router