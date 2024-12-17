

const mongoose = require("mongoose");

const afficheSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    image: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Affiche", afficheSchema);
