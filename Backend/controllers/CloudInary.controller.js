import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const cloudResponce = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request Files:", req.files);

        if (!req.files || !req.files.photo) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const file = req.files.photo;

        console.log("Uploading file to Cloudinary...");

        // Ensure file has a valid temporary file path
        if (!file.tempFilePath) {
            return res.status(400).json({ success: false, message: "Invalid file upload" });
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "uploads",  // Optional: specify folder
        });

        console.log("Cloudinary Response:", result.secure_url);

        res.status(200).json({
            success: true,
            image: result.secure_url,
        });

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "File upload failed",
            error: error.message,
        });
    }
};

export default cloudResponce;
