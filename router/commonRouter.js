const express = require("express");
const router = express.Router();


const{
    postMessage,
    getMessages,
} = require ('../controllers/commonController');

router.post('/postMessages',  postMessage);
router.post('/getMessages', getMessages);
module.exports = router;