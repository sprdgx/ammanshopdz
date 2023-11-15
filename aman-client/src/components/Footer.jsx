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
width:225px;
padding-left:10px;
border-radius: 10px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
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

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

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
        <Logo>AMANSHOP.</Logo>
        <Desc>
        Amanshop : Votre destination pour l'électroménager, l'informatique et les livres, offrant qualité et diversité. Équipez votre maison, optimisez vos technologies et enrichissez votre collection littéraire avec confiance grâce à nos produits de pointe et à notre service client dévoué.
        </Desc>
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
      </Left>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/>24 Rue des Mandarines groupe des propriétés 243 Tamaris Mohammadia Alger
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +213560152618/+213560075910
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> aman@ammanshopdz.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
