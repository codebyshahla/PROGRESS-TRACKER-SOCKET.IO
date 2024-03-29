const messageModel = require("../model/MessageSchema");

// const messageSchema = require ('../model/MessageSchema');
const object = {
  postMessage: async (req, res) => {
    console.log("hi");
    try {
      const { message, sender, reciever } = req.body;

      const saveMessage = await messageModel({
        message,
        sender,
        reciever,
        date:Date.now(),
      });
      await saveMessage.save();
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = object;
