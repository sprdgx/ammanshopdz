import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 15px;
  overflow: hidden;
  ${mobile({
    fontSize: "10px",
    marginTop: "2%",
    borderRadius: "0",
    width: "100%",
  })}
`;

const Announcement = () => {
  return <Container>Super affaire! Livraison gratuite pour les commandes supérieures à 10 000 DA</Container>;
};

export default Announcement;
