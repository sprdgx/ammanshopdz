import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  color: white;
  background-color: teal;
  width: 225px;
  padding-left: 10px;
  border-radius: 10px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center; /* Horizontally center items */
  align-items: center; /* Vertically center items */
  height: 100%; /* Set height to occupy full height of the container */
  ${mobile({
    height: "auto", /* Reset height for mobile */
  })}
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: flex-end; /* Align items to the right */
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          24 Rue des Mandarines groupe des propriétés 243 Tamaris Mohammadia Alger
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> 0554628035 / 0550675280
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> aman@ammanshopdz.com
        </ContactItem>
      </Left>
      <Right>
        <SocialContainer>
          <a href="https://www.facebook.com/profile.php?id=61552805934954" target="_blank">
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a href="https://www.instagram.com/_aman__shop_/" target="_blank">
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Right>
    </Container>
  );
};

export default Footer;
