const express=require('express')

const router=express.Router()
const admine=require('../model/AllAdmineTbl')
let Allcontoller=require('../controllers/Allcontroller')

const {cheakelogin}=require('../middleware/auth')

router.get('/dashbord',cheakelogin,Allcontoller.Dashbord)
router.get('/adddata',cheakelogin,Allcontoller.AddData)
router.post('/add-user',cheakelogin,admine.Imageupload,Allcontoller.AddedData)
router.get ('/view-user',cheakelogin,Allcontoller.ViewUser)
router.get ('/editdata/:id',cheakelogin,Allcontoller.editdata)
router.post('/edit-user/:id',cheakelogin,admine.Imageupload,Allcontoller.editUser)
router.get('/delete-user/:id',cheakelogin,Allcontoller.deleteUser)
router.get('/',Allcontoller.singin)
router.post('/login',Allcontoller.login)
router.get('/logout',Allcontoller.logout)
module.exports=router