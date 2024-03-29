const mongoose = require("mongoose");

function config() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(" mongodb connected successfully");
    })
    .catch((err) => {
      console.log(" mongodb not connected ", err);
    });
}

module.exports = config;
