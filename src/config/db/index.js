const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/DongHo_dev");
    console.log("Thanh cong");
  } catch (error) {
    console.log("That bai");
    console.log(error.message);
  }
}

module.exports = { connect };
