const messageModel = require("../model/MessageSchema");

// const messageSchema = require ('../model/MessageSchema');
const object = {
  postMessage: async (req, res) => {
    try {
      const { message, sender, reciever } = req.body;

      const saveMessage = await messageModel({
        message,
        sender,
        reciever,
        date: Date.now(),
      });
      await saveMessage.save();
    } catch (error) {
      console.log(error);
    }
  },
  getMessages: async (req, res) => {
    const { sender, receiver } = req.body;
    console.log(req.body);
    try {
      const messages = await messageModel.find();

      console.log(messages);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.log(error);
    }
  },
};

module.exports = object;
