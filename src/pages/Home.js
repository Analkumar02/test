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
    line-height: 56px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    @media (max-width: 991px) {
      line-height: 48px;
    }
  }
  p {
    color: ${({ theme }) => theme.colors.gray};
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

const FounderArea = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const FounderImg = styled.img`
  max-width: 100%;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  z-index: 0;
  height: 100%;
`;

const FounderText = styled.div`
  position: relative;
  gap: 20px;
  z-index: 1;
  @media (max-width: 991px) {
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  gap: 30px;
  padding: 0 1rem;
  @media (max-width: 991px) {
    gap: 20px;
  }
`;
const LeafImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  @media (max-width: 991px) {
    display: none;
  }
`;

const Home = () => {
  const imagePath = useImagePath();
  return (
    <>
      <HeroHome>
        <FounderImg />
        <Container
          style={{
            padding: 0,
          }}
        >
          <HeroBox>
            <HeroContent>
              <HeroTextarea>
                <h1>
                  Velavie probiotics crafted to support every body's wellness
                  journey.
                </h1>
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
      <FounderArea>
        <FounderImg
          src={`${imagePath}founder.png`}
          srcSet={`
                  ${imagePath}founder.png 1x,
                  ${imagePath}founder@2x.png 2x,
                  ${imagePath}founder@3x.png 3x
                `}
          alt="Founder Lili Hung"
        />
        <FounderText>
          <TextContent>
            <h2>Our Founder Lili Hung has Made Gut Health Simple</h2>
            <p>
              Since 2017, our founder Lili Hung has been at the forefront of
              holistic wellness, inspired by her husband Kenji’s journey with
              chronic fatigue and inflammation. Determined to find a natural
              path to healing, Lili blended ancient Eastern wisdom with modern
              science to create Velavie—a brand born from love, resilience, and
              the belief that the body can thrive when given the right support.{" "}
              <br></br>
              <br></br>Today, Velavie’s proprietary blends feature rare
              adaptogens and plant-based compounds designed to address energy,
              hormonal balance, stress response, and immune strength. With every
              carefully crafted formula, we make radiant health more
              accessible—because wellness should feel natural, not overwhelming.
            </p>
          </TextContent>
        </FounderText>
        <LeafImg
          src={`${imagePath}leaf.png`}
          srcSet={`
                  ${imagePath}leaf.png 1x,
                  ${imagePath}leaf@2x.png 2x,
                  ${imagePath}leaf@3x.png 3x
                `}
          alt="Founder Lili Hung"
        />
      </FounderArea>
    </>
  );
};

export default Home;
