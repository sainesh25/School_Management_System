const multer = require('multer');
const path =  require('path');

const storageSettings = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname,'..', '..', '/uploads'));
    },
    filename: (req, file, callback) => {
        let timestamp = Date.now();
        let extname = path.extname( file.originalname );
        let newImageFileName = timestamp + extname;
        file.originalname = newImageFileName;
        callback(null, newImageFileName);
    }
})



const uploadFileMiddleware = multer({
    storage: storageSettings,
    fileFilter: (req, file, callback) => {
        const allowedTypesOfImage = ['image/jpg', 'image/webp', 'image/jpeg',  'image/png'];
        if(allowedTypesOfImage.includes(file.mimetype)){
            return callback (null, true);
        } 
        else{
            req.fileUploadError = 'File type Not Supported (.jpg, .jpeg, .png, .webp are allowed)';
            return callback (null, false);
        }
    }
});

module.exports = uploadFileMiddleware


