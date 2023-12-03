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

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
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
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

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
  margin: 25px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;


const WilayaSelection = styled.select`
  padding: 10px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ShippingPrices = {
  Alger: 500,
  TiziOuzou:600, 
  Oran: 800,

};


const Cart = ({themeToggler,theme}) => {

  const [selectedWilaya, setSelectedWilaya] = useState('Alger');
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseProductQuantity({ id: productId }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseProductQuantity({ id: productId }));
  };

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
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
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
            <WilayaSelection
            value={selectedWilaya}
            onChange={(e) => setSelectedWilaya(e.target.value)}
            >
            <option value="Alger">Alger</option>
            <option value="TiziOuzou">Tizi Ouzou</option>
            <option value="Oran">Oran</option>
            </WilayaSelection>
            <SummaryItem>
            <SummaryItemText>{`Expédition vers ${selectedWilaya}`}</SummaryItemText>
            <SummaryItemPrice>{ShippingPrices[selectedWilaya]} DA</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                {cart.total + ShippingPrices[selectedWilaya]} DA
              </SummaryItemPrice>
            </SummaryItem>
            <TopButton onClick={setIsOpenPopup.bind(this, true)} type="filled">FINALISER L'ACHAT</TopButton>
            {isOpenPopup && <CheckOrder setIsOpenPopup={setIsOpenPopup} />}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;