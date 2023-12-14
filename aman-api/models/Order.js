const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientNumber: { type: String, required: true },
    clientAddress: { type: String, required: true },
    deliveryType: { type: String, enum: ['desktop', 'home'], required: true },
    price:{type: String, required:true },
    confirmed: {type:Boolean, default: false},
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
