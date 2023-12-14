const Order = require("../models/Order");
const Product = require("../models/Product");
const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");

// Create an order
router.post("/placeorder", async (req, res) => {
  try {
    const {
      clientName,
      clientNumber,
      clientAddress,
      price,
      products: orderedProducts,
      deliveryType, // Include the deliveryType in the request body
    } = req.body;

    // Other existing code for product validation...

    // Determine the delivery type based on client's choice
    const determinedDeliveryType = deliveryType === 'desktop' ? 'desktop' : 'home';

    // Create a new order with the products including their quantities and images
    const productsWithDetails = orderedProducts.map(({ productId, quantity, image }) => {
      return {
        productId,
        quantity,
        image,
      };
    });

    const newOrder = new Order({
      clientName,
      clientNumber,
      clientAddress,
      price,
      products: productsWithDetails,
      deliveryType: determinedDeliveryType, // Set the determined delivery type
    });

    const savedOrder = await newOrder.save(); // Save the order details

    res.status(201).json(savedOrder);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error placing the order:", error);

    // Send an appropriate error response to the frontend
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Update the 'confirmed' field for a specific order
router.put("/confirm/:orderId", async (req, res) => {
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

// DELETE an order by ID
router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
