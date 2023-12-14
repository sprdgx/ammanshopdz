import { useState } from "react";
import { placeOrder } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import '../style/checkorder.css'
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close'
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


const Notification = styled.div`
position: fixed;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
background-color: #333;
color: #fff;
padding: 10px 20px;
border-radius: 5px;
animation: slideIn 0.5s ease-out forwards, fadeOut 0.5s ease-in 2.5s forwards;
`;

const Popup = ({ setIsOpenPopup, selectedDeliveryType  }) => {
  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [not, setNot] = useState(null);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const totalPrice = cart.products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);

    try {
      const response = await placeOrder(dispatch, {
        clientName,
        clientNumber,
        clientAddress,
        price: totalPrice,
        products: cart.products.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
          image: product.img,
        })),
        deliveryType: selectedDeliveryType, // Include the selected delivery type here
      });

      // Handle the response if needed...
    } catch (error) {
      console.error("Error placing the order:", error);
      // Handle error case
    }
  };

  function renderCheckoutOrFillCart() {
    if (!cart.products || cart.products.length > 0) {
      return (
      <form class="form">
            <TextField
              placeholder="Votre nom complet"
              onChange={(e) => setClientName(e.target.value)}
              className="input-1"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }} />
            <TextField
              placeholder="Ton Numéro de téléphone"
              onChange={(e) => setClientNumber(e.target.value)}
              className="input-1"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }} />
            <TextField
              placeholder="Votre Adresse"
              onChange={(e) => setClientAddress(e.target.value)}
              className="input-1"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoomIcon />
                  </InputAdornment>
                ),
              }} />
            <button variant="contained" color="primary" className="button-1" onClick={handleClick}>
              Passer la commande
            </button>
          </form>
      );
    } else {
      return <div class='empty'>Panier vide📭, Merci d'être ici😊.</div>;
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
          borderRadius: "8px",
          width: "450px",
          height:'400px',
          padding: "20px 10px",
          animation: "dropTop .3s linear",
        }}
      >
        {renderCheckoutOrFillCart()}
        <div
          onClick={setIsOpenPopup.bind(this, false)}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 105,
            right: 15,
          }}
        >
          <CloseIcon style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }} />
        <Notification className="customNotification">
          {not}
        </Notification>
        </div>
      </div>
    </div>
  );
};

export default Popup;
