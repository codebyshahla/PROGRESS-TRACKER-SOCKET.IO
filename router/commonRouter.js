const express = require("express");
const router = express.Router();


const{
    postMessage,
} = require ('../controllers/commonController');

router.post('/postMessages',  postMessage);
module.exports = router;