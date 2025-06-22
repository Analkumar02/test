import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { BlueButton, WhiteButton } from "../components/HeaderStyled";
import { useImagePath } from "../context/ImagePathContext";
import FeatureIcons from "../components/FeatureIcons";
import PerfectPeace from "../components/PerfectPeace";
import { Link } from "react-router-dom";

const HeroHome = styled.div``;
const HeroBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  @media (max-width: 1024px) {
    gap: 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 0px;
  align-items: flex-start;
  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const HeroTextarea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h2 {
    font-size: 48px;
    line-height: 56px;
    font-weight: 700;
    color: #1d3e57;
    margin: 0;
    @media (max-width: 991px) {
      font-size: 36px;
      line-height: 48px;
    }
  }
  p {
    color: #acacac;
    font-size: 18px;
    margin: 0;
    @media (max-width: 991px) {
      font-size: 14px;
    }
  }
`;

const HeroBtnBox = styled.div`
  display: flex;
  gap: 30px;
`;

const HeroBadges = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    gap: 10px;
  }
`;

const HeroImg = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  align-self: flex-end;
  max-width: 600px;
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
  }
`;

const Home = () => {
  const imagePath = useImagePath();
  return (
    <>
      <HeroHome>
        <Container>
          <HeroBox>
            <HeroContent>
              <HeroTextarea>
                <h2>
                  Velavie probiotics crafted to support every body's wellness
                  journey.
                </h2>
                <p>
                  Velavie probiotics are crafted to support every body's
                  wellness journey. Rooted in microbiome science, each formula
                  helps restore balance, boost immunity, and promote lasting
                  vitality no matter where you are on your path to better
                  health.
                </p>
              </HeroTextarea>
              <HeroBtnBox>
                <BlueButton>
                  <Link to="/shop">shop now</Link>
                </BlueButton>
                <WhiteButton>
                  <Link to="/">take the quiz</Link>
                </WhiteButton>
              </HeroBtnBox>
              <HeroBadges>
                <img src={`${imagePath}heroicon1.svg`} alt="" />
                <img src={`${imagePath}heroicon2.svg`} alt="" />
                <img src={`${imagePath}heroicon3.svg`} alt="" />
                <img src={`${imagePath}heroicon4.svg`} alt="" />
                <img src={`${imagePath}heroicon5.svg`} alt="" />
              </HeroBadges>
            </HeroContent>
            <HeroImg>
              <img
                src={`${imagePath}hero-pr1.png`}
                srcSet={`
                  ${imagePath}hero-pr1.png 1x,
                  ${imagePath}hero-pr1@2x.png 2x,
                  ${imagePath}hero-pr1@3x.png 3x
                `}
                alt="Hero Product"
              />
            </HeroImg>
          </HeroBox>
        </Container>
      </HeroHome>
      <FeatureIcons />
      <PerfectPeace />
    </>
  );
};

export default Home;
