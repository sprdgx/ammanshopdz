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
  margin-top: -0.3%;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  ${mobile({ marginLeft: "5px", fontSize: "10px", width: "400px", marginTop: '2%' })}
`;

const Announcement = () => {
  return <Container>Super affaire! Livraison gratuite pour les commandes supérieures à 10 000 DA</Container>;
};

export default Announcement;
