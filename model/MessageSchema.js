/* eslint-disable new-cap */
const mongoose = require('mongoose');
const messageSchema = mongoose.Schema(
    {
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: false,
      },
      sender: {
        type: String,
        required: true,
      },
      reciever: {
        type: String,
        required: true,
      },

    },
);

const messageModel = new mongoose.model('messageCollection', messageSchema);
module.exports = messageModel;
