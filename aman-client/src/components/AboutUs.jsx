import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive'; // Ensure mobile responsiveness

const AboutUsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  ${mobile({ flexDirection: 'column' })} /* On mobile, stack elements */
`;

const Title = styled.h2`
  font-size: 30px; /* Increased font size for Title */
  margin-bottom: 20px;
  text-align: left; /* Align Title to the left */
`;

const Description = styled.p`
  font-size: 22px; /* Increased font size for Description */
  text-align: left; /* Align Description to the left */
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end; /* Align Image to the right */
  align-items: center; /* Align Image in the center vertically */
`;

const TextContainer = styled.div`
  width: 50%; /* TextContainer takes up 50% of the width */
  padding-right: 20px; /* Add some space between Text and Image */
  ${mobile({ width: '100%', paddingRight: '0', textAlign: 'left', marginBottom:'30px', })} /* On mobile, take full width and align text left */
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-top-right-radius: 70px;
  border-bottom-right-radius: 70px;
`;

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <TextContainer>
        <Title>Amanshop : Essentiels Modernes pour la Maison</Title>
        <Description>
          Amanshop propose des innovations essentielles en électroménager pour les foyers modernes. Découvrez un design élégant et une fonctionnalité sans effort, transformant votre expérience quotidienne. Rehaussez votre maison, sans effort.
        </Description>
      </TextContainer>
      <ImageContainer>
        <Image src="https://github.com/sprdgx/ammanshop-pictures/blob/main/image1.png?raw=true" alt="About Us Image" />
      </ImageContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;
