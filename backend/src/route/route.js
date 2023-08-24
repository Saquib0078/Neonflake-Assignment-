const express = require('express');
const router = express.Router();
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
const video=require('../controllers/videoController')
cloudinary.config({
    cloud_name: 'dgroglqvq',
    api_key: '537452751715163',
    api_secret: 'tosXrYnyyQD6gsaiYty3EKSkQbM'
  });
  
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  
router.post('/api/upload',upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]),video.uploadVideo)
router.get('/api/getDetails', video.getDetails);
router.get('/api/getDetails/:videoId', video.getDetailsById);



module.exports = router;


