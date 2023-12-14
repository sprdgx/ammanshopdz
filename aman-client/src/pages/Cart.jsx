import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import CheckOrder from "../components/CheckOrder";
import { increaseProductQuantity , decreaseProductQuantity} from "../redux/cartRedux";
import { useEffect, useState } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column",     alignItems: 'center', textAlign: 'center'})}
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width:'250px', height:'250px'})}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ flexDirection: "column", display:'flex', jsutifyContent:'space-around', paddong:'20px' })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const SummaryItemText = styled.span`
  padding-right: 3px;

`;

const SummaryItemPrice = styled.span``;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#009688" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "#008080" : "#009688"};
  }
`;

const ShippingPrices = {
  Alger: {
    desktop: 250,
    home: 400,
  },
  Boumerdes: {
    desktop: 400,
    home: 650,
  },
  Blida: {
    desktop: 400,
    home: 650,
  },
  Tipaza: {
    desktop: 400,
    home: 650,
  },
  Tizi_Ouzou: {
    desktop: 450,
    home: 750,
  },
  Bouira: {
    desktop: 450,
    home: 750,
  },
  Bejaia: {
    desktop: 450,
    home: 850,
  },
  Media: {
    desktop: 400,
    home: 800,
  },
  Jijel: {
    desktop: 450,
    home: 900,
  },
  BBA: {
    desktop: 450,
    home: 850,
  },
  Ain_Defla: {
    desktop: 450,
    home: 850,
  },
  Ain_Timouchent: {
    desktop: 450,
    home: 850,
  },
  Annaba: {
    desktop: 500,
    home: 900,
  },
  Batna: {
    desktop: 500,
    home: 900,
  },
  Chlef: {
    desktop: 450,
    home: 800,
  },
  Canstantine: {
    desktop: 450,
    home: 850,
  },
  El_Taref: {
    desktop: null,
    home: 950,
  },
  Guelma: {
    desktop: 500,
    home: 950,
  },
  Khenchla: {
    desktop: 500,
    home: 950,
  },
  Mascara: {
    desktop: 450,
    home: 850,
  },
  Mila: {
    desktop: null,
    home: 900,
  },
  Moustaganem: {
    desktop: 450,
    home: 850,
  },
  Msila: {
    desktop: 450,
    home: 850,
  },
  Oran: {
    desktop: 450,
    home: 850,
  },
  Oum_El_Bouaghi: {
    desktop: 450,
    home: 850,
  },
  Relizane: {
    desktop: null,
    home: 850,
  },
  Saida: {
    desktop: 500,
    home: 900,
  },
  Setif: {
    desktop: 450,
    home: 850,
  },
  Sidi_Bel_Abbes: {
    desktop: 500,
    home: 900,
  },
  Skikda: {
    desktop: 500,
    home: 900,
  },
  Souk_Ahras: {
    desktop: null,
    home: 950,
  },
  Tebessa: {
    desktop: 500,
    home: 900,
  },
  Tiaret: {
    desktop: 450,
    home: 850,
  },
  Tisemsiit: {
    desktop: null,
    home: 900,
  },
  Telemcen: {
    desktop: 500,
    home: 900,
  },
  Biskra: {
    desktop: 550,
    home: 1000,
  },
  Ouled_Diellal: {
    desktop: null,
    home: 1000,
  },
  Djelfa: {
    desktop: 700,
    home: 1000,
  },
  Laghouat: {
    desktop: 700,
    home: 1000,
  },
  Gherdaia: {
    desktop: 700,
    home: 1100,
  },
  El_menia: {
    desktop: null,
    home: 1100,
  },
  El_oued: {
    desktop: null,
    home: 1100,
  },
  El_Mghair: {
    desktop: null,
    home: 1100,
  },
  Ouargia: {
    desktop: 700,
    home: 1100,
  },
  Touggourt: {
    desktop: null,
    home: 1200,
  },
  El_Bavad: {
    desktop: 550,
    home: 1000,
  },
  Naama: {
    desktop: 800,
    home: 1200,
  },
  Bechar: {
    desktop: 800,
    home: 1200,
  },
  Beni_Abbes: {
    desktop: null,
    home: 1200,
  },
  Adrar: {
    desktop: 1000,
    home: 1500,
  },
  Timimoune: {
    desktop: null,
    home: 1500,
  },
  Ain_Salah: {
    desktop: null,
    home: 1900,
  },
  Tamanrasset: {
    desktop: 1200,
    home: 1900,
  },

};

const StyledDeliverySelection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: #000; /* Changed font color to black */

  label {
    margin-right: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  input[type='radio'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #009688;
    border-radius: 50%;
    margin-right: 10px;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;

    &:checked {
      background-color: #009688;
    }

    &:focus {
      box-shadow: 0 0 5px rgba(255, 152, 0, 0.5);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 12px; /* Adjusted font size for smaller screens */
    padding: 6px 12px; /* Adjusted padding for smaller screens */
  }
`;

const StyledWilayaSelection = styled.select`
  padding: 8px 16px; /* Adjusted padding */
  margin-bottom:10px;
  margin-top:10px;
  font-size: 14px; /* Adjusted font size */
  border: 2px solid #009688;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  background-color: transparent;
  color: #000; /* Changed font color to black */
  appearance: none;
  width: 100%;
  max-width: 300px;

  &:focus {
    border-color: #ff9800;
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5);
  }
`;

const Cart = ({themeToggler,theme}) => {

  const [selectedWilaya, setSelectedWilaya] = useState('Alger');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('desktop');
  const [shippingCost, setShippingCost] = useState(ShippingPrices[selectedWilaya][selectedDeliveryType]);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseProductQuantity({ id: productId }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseProductQuantity({ id: productId }));
  };

  const handleDeliveryTypeChange = (e) => {
    setSelectedDeliveryType(e.target.value);
  };
  
    const wilayaOptions = Object.keys(ShippingPrices).map((wilaya) => {
      const formattedWilaya = wilaya.replace(/_/g, ' '); // Replace underscores with spaces
      return (
        <option key={wilaya} value={wilaya}>
          {formattedWilaya}
        </option>
      );
    });

    useEffect(() => {
      const formattedSelectedWilaya  = selectedWilaya.replace(/_/g, ' '); // Replace underscores with spaces
    }, [selectedWilaya])
  

  useEffect(() => {
    setShippingCost(ShippingPrices[selectedWilaya][selectedDeliveryType]);
  }, [selectedWilaya, selectedDeliveryType]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpenPopup, setIsOpenPopup] = useState(false);


    return (
    <Container>
      <Navbar themeToggler={themeToggler} theme={theme} />
      <Wrapper>
        <Title>Votre Achats</Title>
        <Top>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => handleIncreaseQuantity(product._id)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={() => handleDecreaseQuantity(product._id)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                   {product.price * product.quantity} DA
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Votre Cammandes</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Le Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total} DA</SummaryItemPrice>
            </SummaryItem>
            <StyledWilayaSelection
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
            >
              {wilayaOptions}
            </StyledWilayaSelection>
            <StyledDeliverySelection>
              <label>
                <RadioInput
                  type="radio"
                  value="desktop"
                  checked={selectedDeliveryType === 'desktop'}
                  onChange={handleDeliveryTypeChange}
                />
                Stop Desk
              </label>
              <label>
                <RadioInput
                  type="radio"
                  value="home"
                  checked={selectedDeliveryType === 'home'}
                  onChange={handleDeliveryTypeChange}
                />
                A Domicile
              </label>
            </StyledDeliverySelection>
            <SummaryItem>
              <SummaryItemText>{`Expédition vers ${selectedWilaya.replace(/_/g, ' ')}`}</SummaryItemText>
              <SummaryItemPrice>{shippingCost} DA</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                {cart.total + shippingCost} DA
              </SummaryItemPrice>
            </SummaryItem>
            <TopButton onClick={setIsOpenPopup.bind(this, true)} type="filled">FINALISER L'ACHAT</TopButton>
            {isOpenPopup && <CheckOrder setIsOpenPopup={setIsOpenPopup} selectedDeliveryType={selectedDeliveryType} />}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;