import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';

const Container = styled.div`
  width: 97%;
  height: 80%;
  margin-bottom: 50px;
  margin-top: 20px;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  margin-left: 20px;

  ${mobile({ 
    height: "300px", 
    width: "89%",
    minHeight: "300px",
  })}
`;

const Arrow = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.2;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 90%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: teal;
  ${mobile({ height: "100%", width: "55vh" })}
`;

const ImgContainer = styled.div`
  width: 40%; 
  height: 100%; 
`;

const Image = styled.img`
  width: 100%;
  height: 505px;
  object-fit: cover;
  ${mobile({ width: "320px", height:'300px', margin:'0px 5px', display:'none', })}
`;

const Image1 = styled.img`
  width: 100%;
  height: 505px;
  object-fit: cover;
  display: block;
  float: left;

  ${mobile({ 
    width: "430px", 
    height: '300px',
  })}
`;

const Image2 = styled.img`
  width: 100%;
  height: 505px;
  object-fit: cover;
  display: block;
  float: left;


  ${mobile({ 
    width: "430px", 
    height: '300px',
    marginLeft: '-100px', // Reset margin for mobile view if needed
  })}
`;

const Image3 = styled.img`
  width: 100%;
  height: 505px;
  object-fit: cover;
  display: block;
  float: left;


  ${mobile({ 
    width: "430px", 
    height: '300px',
    marginLeft: '-190px', // Reset margin for mobile view if needed
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 30px;
  margin-top: -80px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Electromenager = styled.h1`
  font-size: 30px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  z-index: 1;
  display: none;
  text-align: center; /* Center the text */

  ${mobile({
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "10px",
    borderRadius: "20px",
    textAlign: "center", // Center text for mobile view
  })}
`;

const Informatique = styled.h1`
  font-size: 30px;
  position: absolute;
  top: 10px;
  left: 40%;
  transform: translateX(-50%);
  color: white;
  z-index: 1;
  display: none;

  ${mobile({
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "10px",
    borderRadius: "20px",
  })}
`;

const Livres = styled.h1`
  font-size: 30px;
  position: absolute;
  bottom: 10px;
  right: 350px;
  color: white;
  z-index: 1;
  display: none;
  text-align: center; /* Center the text */

  ${mobile({
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "10px",
    borderRadius: "20px",
    textAlign: "center", // Center text for mobile view
  })}
`;


const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ display: "none" })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 10px;
  ${mobile({ display: "none" })}
`;
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item, index) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <LazyLoad height={700}>
                <Image src={item.img} />
                {index === 0 && 
                <>
                  <Image1 src={item.img} />
                  <Electromenager>
                    Electromenager
                  </Electromenager>
                </>
                }
                {index === 1 && 
                <>
                  <Image2 src={item.img} />
                  <Informatique>
                    Informatique
                  </Informatique>
                </>
                }
                {index === 2 && 
                <>
                  <Image3 src={item.img} />
                  <Livres>
                    Livres
                  </Livres>
                </>
                }
              </LazyLoad>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to={item.route}>
                <Button>SHOW NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
