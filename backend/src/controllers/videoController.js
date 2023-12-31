const Item = require('../models/videoModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
 const path =require('path')


 const uploadVideo = async (req, res) => {
    const { title, description } = req.body;
    const thumbnailFile = req.files['thumbnail'][0];
    const videoFile = req.files['video'][0];
  
    try {
      await fs.mkdir('/path/to/temp', { recursive: true });
  
      const thumbnailPath = path.join('/path/to/temp', 'thumbnail.jpg');
      await fs.writeFile(thumbnailPath, thumbnailFile.buffer);
  
      // Determine video file extension dynamically
      const videoExtension = path.extname(videoFile.originalname);
      const videoPath = path.join('/path/to/temp', `video${videoExtension}`);
      await fs.writeFile(videoPath, videoFile.buffer);
  
      const thumbnailResult = await cloudinary.uploader.upload(thumbnailPath, { folder: 'thumbnails' });
      const videoResult = await cloudinary.uploader.upload(videoPath, { resource_type: "video"});
      console.log(videoResult);
  
    
  
      await fs.unlink(thumbnailPath);
      await fs.unlink(videoPath);
  
      const newItem= {
        title,
        description,
        thumbnailUrl: thumbnailResult.secure_url,
        videoPublicId: videoResult.url || '',
      };
      let create = await Item.create(newItem);

       
      res.json({ message: 'Upload successful', data: create });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

  
  

const getDetails = async (req, res) => {
  try {
    const items = await Item.find({}, 'title description  thumbnailUrl videoPublicId ');
    res.json({data:items});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items' });
  }
};

const getDetailsById = async (req, res) => {
    try {
        const videoId=req.params.videoId
      const items = await Item.findById(videoId);
      res.json({data:items});
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving items' });
    }
  };
module.exports = { getDetails, uploadVideo,getDetailsById };
