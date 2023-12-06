import { Add, Description, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  border-radius:50px;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.div`
  margin: 20px 0px;
  margin-bottom: 10%;
`;

const Desscc = styled.p`
  margin: 20px 0px;
  margin-bottom: 10%;
  ul {
    list-style-type: none;
    padding-left: 0;
  }
`;

const DetailList = styled.ul`
  padding-left: 20px;
`;

const DetailTitle = styled.li`
  font-weight: bold;
  margin-bottom: 8px;
  &:before {
    content: "•";
    color: teal;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;


const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  margin-top:20px;`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:100px;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  border-radius: 20px;

  &:hover {
    background-color: #f8f4f4;
  }
`;

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

const Product = ({themeToggler,theme}) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [not, setNot] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  console.log(id)

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
    setNot('Ajouté avec succès.');
    setTimeout(() => {
      setNot(null);
    }, 3000); 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      {not && (
        <Notification className="customNotification">
          {not}
        </Notification>
      )}
      <Navbar themeToggler={themeToggler} theme={theme} />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            <Desscc>
              {product.desc}
            </Desscc>
              {product.detail && (         
            <DetailList>
              {product.detail.map((detail, index) => (
                <DetailTitle key={index}>{detail}</DetailTitle>
              ))}
            </DetailList>         
            )}
          </Desc>
          <Price>
            {product.price} DA 
          </Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>Ajouter Au Panier</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;