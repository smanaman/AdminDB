const Admin = require('../model/AllAdmineTbl')
const path=require('path');
const fs=require('fs');

module.exports.singin=(req,res)=>{
    return res.render('SignIn')
}
module.exports.login = async (req, res) => {
    try {
        let cheakeemail=await Admin.findOne({email:req.body.email})

        if(!cheakeemail){
             console.log("Email not found");
        return res.redirect("back");
        }
        else{
            if(cheakeemail.password===req.body.password){
                res.cookie("AdmineID",cheakeemail,{maxAge: 24 * 60 * 60 * 1000});
                return res.redirect('/dashbord');
            }
        }
    } catch (error) {
       console.log(error);
        
    }
}

module.exports.Dashbord = (req, res) => {
    return res.render('dashboard')
}
module.exports.AddData = (req, res) => {
    return res.render('AddData')
}

module.exports.AddedData = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            dob,
            username,
            password,
            confirmPassword,
            role,
            gender,
            bio,
            isActive
        } = req.body;

        const notifications = {
            email: req.body.notifications?.email === 'true',
            sms: req.body.notifications?.sms === 'true',
            push: req.body.notifications?.push === 'true'
        };

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        let image = '';
        if (req.file) {
            image = Admin.adpath + "/" + req.file.filename;
        }

        await Admin.create({
            name,
            email,
            phone,
            dob,
            username,
            password,
            confirmPassword,
            role,
            gender,
            notifications,
            isActive: isActive === 'on',
            bio,
            profilePicture: image
        });

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating user');
    }
}
module.exports.ViewUser = async (req, res) => {
    try {
        const users = await Admin.find();
        res.render('Showdata', { users });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching users');
    }
} 

module.exports.editdata = async (req, res) => {

    const userId = req.params.id;

    const user = await Admin.findById(userId);

    res.render('EditData', { user })

}
module.exports.editUser = async (req, res) => {

    const userId = req.params.id;



    // if (password !== confirmPassword) {
    //     return res.status(400).send('Passwords do not match');
    // }

    const user = await Admin.findById(userId);
    if (!user) {
        return res.status(404).send('User not found');
    }


    if (req.file) {
        let oldimage = path.join(__dirname, '..', user.profilePicture);

        try {
            fs.unlinkSync(oldimage);
        } catch (error) {
            console.log(error);

 
        }
        req.body.profilePicture = Admin.adpath + "/" + req.file.filename
    } else {
        req.body.profilePicture = user.profilePicture;
    }

    req.body.isActive = req.body.isActive === 'on';
    await Admin.findByIdAndUpdate(userId, req.body)


    res.redirect('/view-user');
}
module.exports.deleteUser=async(req,res)=>{
    const userId=req.params.id;

    const user =await Admin.findById(userId);
  

    if(user){
        let deletImage=path.join(__dirname,"..",user.profilePicture)
console.log("Image path to delete:", deletImage);
        try {
            fs.unlinkSync(deletImage)
        } catch (error) {
            console.log("Image delete failed or already removed:", error.message);
        }
    }

await Admin.findByIdAndDelete(userId);
res.redirect('/view-user');
}