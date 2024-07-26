// config/multerConfig.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('file'); 
module.exports = upload;
