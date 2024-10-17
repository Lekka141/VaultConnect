const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const { authMiddleware } = require('../middleware/AuthMiddleware'); // Ensure correct import

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/', // Specify the directory where files will be saved
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original filename
    },
});

const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileData = {
            filename: file.originalname,
            filepath: file.path,
            user: req.user.id, // Assuming you have user authentication
            size: file.size,
            type: file.mimetype,
        };

        const newFile = new File(fileData);
        await newFile.save();

        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Other routes (GET, DELETE) would go here

module.exports = router;
