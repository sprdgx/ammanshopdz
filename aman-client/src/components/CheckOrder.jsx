import { useState } from "react";
import { placeOrder } from "../redux/apiCalls";
import { Button, Container, Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const Popup = ({ setIsOpenPopup }) => {
  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
  
    // Calculate the total price based on the quantity and individual product prices
    const totalPrice = cart.products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  
    placeOrder(dispatch, {
      clientName,
      clientNumber,
      clientAddress,
      price: totalPrice,
      products: cart.products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        image: product.img,
      })),
    });
  };

  function renderCheckoutOrFillCart() {
    if (!cart.products || cart.products.length > 0) {
      return (
        <Container>
          <Input
            placeholder="Username"
            onChange={(e) => setClientName(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            onChange={(e) => setClientNumber(e.target.value)}
          />
          <Input
            placeholder="Address"
            onChange={(e) => setClientAddress(e.target.value)}
          />
          <Button onClick={handleClick}>Place Order</Button>
        </Container>
      );
    } else {
      return <div>Fill Cart</div>;
    }
  }

  return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          width: "250px",
          padding: "20px 10px",
          animation: "dropTop .3s linear",
        }}
      >
        <div
          onClick={setIsOpenPopup.bind(this, false)}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          Close
        </div>
        {renderCheckoutOrFillCart()}
      </div>
    </div>
  );
};

export default Popup;
