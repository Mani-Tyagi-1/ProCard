import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

const router = express.Router();

// Use memory storage for multer since we upload to Cloudinary directly
const storage = multer.memoryStorage();

// File filter to accept only images
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpg|jpeg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (result) return resolve(result.secure_url);
        reject(new Error("Unknown error during upload"));
      }
    );
    uploadStream.end(buffer);
  });
};

// @desc    Upload multiple images
// @route   POST /api/upload
// @access  Public (for now)
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({ message: 'No image files uploaded' });
      return;
    }

    const files = req.files as Express.Multer.File[];
    
    // Upload all files to Cloudinary in parallel
    const uploadPromises = files.map((file) => 
      uploadToCloudinary(file.buffer, 'procard/products')
    );
    
    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      message: 'Images uploaded successfully',
      imageUrls,
    });
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ message: 'Error uploading images', error: error.message || error });
  }
});

export default router;
