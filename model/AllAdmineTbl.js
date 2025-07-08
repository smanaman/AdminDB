const mongoose=require('mongoose');
const multer=require('multer')
const path=require('path')
 let imagepath='/uplodes/imagestore'
const Admine = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'editor', 'author', 'subscriber']
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    notifications: {
        email: {
            type: Boolean,
            required: true,
            default: true
        },
        sms: {
            type: Boolean,
            required: true,
            default: false
        },
        push: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    bio: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    }

})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,"..",imagepath))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
Admine.statics.Imageupload = multer({ storage: storage }).single('image')
Admine.statics.adpath=imagepath
const AdmineTbl = mongoose.model('Admine', Admine);


module.exports=AdmineTbl; 

