const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
});
const fileFilter = (req,file,cb)=>{
    const allowedType = ['image/png','image/jpeg','image/jpg']
    if(allowedType.includes(file.mimetype)){
cb(null,true);
    }
else{
    cb(new Error("only jpg,png,jpeg allowed"),false);
}
};

const upload = multer({storage,fileFilter});
module.exports=upload;