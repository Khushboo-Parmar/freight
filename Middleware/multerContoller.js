const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadSingle = multer({ storage: storage }).single('shopImage'); 

module.exports = { uploadSingle };
