const File = require('../models/File'); // Assuming the correct model name
const multer = require('multer'); // Include multer for file uploads

const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Adjust as needed
const maxSize = 10 * 1024 * 1024; // 10 MB

const upload = multer({
  storage: diskStorage, // Configure your disk storage here
  fileFilter: (req, file, cb) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type'));
    } else if (file.size > maxSize) {
      cb(new Error('File too large'));
    } else {
      cb(null, true);
    }
  },
  limits: { fileSize: maxSize },
});

// Upload a file (using multer middleware)
const uploadFile = async (req, res) => {
  try {
    // Upload the file using multer
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message }); // Handle validation errors
      }

      // Access uploaded file details from req.file
      const { filename, path } = req.file;
      const file = new File({ filename, path, userId: req.user.id });

      await file.save();
      res.status(201).json({ message: 'File uploaded successfully', file });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's files
const getUserFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a file
const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    await File.findByIdAndDelete(id);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { uploadFile, getUserFiles, deleteFile };
