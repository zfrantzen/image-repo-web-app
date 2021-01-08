let express = require('express');
let router = express.Router();
let multer = require('../config/multer.config.js');
 
const imageWorker = require('../controllers/image.controller.js');

router.post('/image', multer.single("image"), imageWorker.postImageController);
 
router.get('/image', multer.none(), imageWorker.getImageController);

router.get('/image/info', multer.none(), imageWorker.getImageInfoController);

router.delete('/image/:imageId', multer.none(), imageWorker.deleteImageController);
 
module.exports = router;
