const multer = require('multer');
const path = require('path');

// Configure storage options
const Storage = multer.memoryStorage(); // Store files in memory buffer

/**
 * File filter to validate file types and sizes.
 *
 * @param {Object} req - Express request object.
 * @param {Object} file - File object.
 * @param {Function} cb - Callback function.
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|docx/; // Expanded file types
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image and document files are allowed!'), false);
  }
};

// Maximum file size: 5MB
const MAX_SIZE = 5 * 1024 * 1024;

/**
 * Multer upload configuration.
 */
const upload = multer({
  storage: Storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: fileFilter,
});

/**
 * Middleware to handle Multer errors.
 *
 * @param {Object} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large. Maximum limit is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Handle other errors
    return res.status(400).json({ message: err.message });
  }
  next();
};

module.exports = {
  upload,
  multerErrorHandler,
};
