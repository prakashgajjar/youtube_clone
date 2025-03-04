import path from 'path';
import multer from 'multer';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = 'public/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const uniqueFilename = file.fieldname + '-' + uniqueSuffix + extension;

        console.log("Saved Filename:", uniqueFilename);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

export default upload;
