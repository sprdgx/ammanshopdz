const Order = require("../models/Order");
const router = require("express").Router();
const {
  verifyTokenAndAdmin,
} = require("./verifyToken");


// Create an order
router.post("/placeorder", async (req, res) => {
  try {
    const {
      clientName,
      clientNumber,
      clientAddress,
      price,
      products,
    } = req.body;

    const newOrder = new Order({
      clientName,
      clientNumber,
      clientAddress,
      price,
      products,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Update the 'confirmed' field for a specific order
router.put("/confirm/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.confirmed = true;

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});



//GET ALL

router.get("/",verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME


module.exports = router;