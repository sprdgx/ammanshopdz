import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';


const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  ${mobile({
    textAlign: "center",
  })}
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <ImageContainer>
          <Image src={item.img} />
          <Info>
            <Title>{item.title}</Title>
            <Button>Acheter Maintenant</Button>
          </Info>
        </ImageContainer>
      </Link>
    </Container>
  );
};

export default CategoryItem;