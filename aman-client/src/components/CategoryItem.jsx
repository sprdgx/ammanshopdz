import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  margin-left: 25px;
  margin-top: 25px;
  position: relative;
  `;

const Image = styled.img`
  width: 90%;
  height: 78%;
  object-fit: cover;
  border-radius: 20px;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 78%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color : rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  ${mobile({ height: "77%" })}

`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: teal;
    color:white;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (

    <Container>
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>Acheter Maintenant</Button>
      </Info>
      </Link>
    </Container>

  );
};

export default CategoryItem;
