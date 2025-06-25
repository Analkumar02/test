import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { BlueButton, WhiteButton } from "../components/HeaderStyled";
import { useImagePath } from "../context/ImagePathContext";
import FeatureIcons from "../components/FeatureIcons";
import PerfectPeace from "../components/PerfectPeace";
import ProductSlider from "../components/ProductSlider";
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
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 40px 0;
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

  padding-right: 7rem;
  @media (max-width: 1024px) {
    gap: 20px;
    padding: 0 1rem;
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

const WhyUsArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 80px 0;
  background-color: ${({ theme }) => theme.colors.white_lite};
  @media (max-width: 991px) {
    padding: 40px 15px;
  }
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  @media (max-width: 991px) {
    text-align: center;
  }
`;

const RatingText = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(0.75rem, 0.6289rem + 0.5168vw, 1.125rem);
  img {
    max-height: 14px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const WhyUsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  @media (max-width: 991px) {
    flex-direction: column;
    flex-flow: wrap;
    align-items: center;
    justify-content: space-around;
    gap: 24px;
  }
`;

const IconColLeft = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  order: 1;
  @media (max-width: 991px) {
    order: 2;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.green_border};
  }
`;
const IconColRight = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  order: 3;
  @media (max-width: 991px) {
    order: 3;
  }
  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 25px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green_border};
  &:last-child {
    border-bottom: none;
  }
  img {
    max-width: 40px;
    width: 100%;
  }
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const WhyUsImgBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-direction: column;
  width: 100%;
  order: 2;
  @media (max-width: 991px) {
    order: 1;
  }
`;

const WhyUsImg = styled.img`
  max-width: 100%;
  height: auto;
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
      <WhyUsArea>
        <TitleArea>
          <RatingText>
            <img src={`${imagePath}whych-star.svg`} alt="stars" />
            <span>
              Highly rated among our <b>50,000+ happy customers</b>
            </span>
          </RatingText>
          <h2>Why Velavie Probiotics are Better</h2>
        </TitleArea>
        <Container>
          <WhyUsBox>
            <IconColLeft>
              <IconBox>
                <img src={`${imagePath}icon1.png`} alt="Icon" />
                <p>Innovating with Purpose-First Principles</p>
                <span>
                  Velalvie leads the way with the first probiotics designed
                  specifically to support gut function, grounded in nine years
                  of gut health research.
                </span>
              </IconBox>
              <IconBox>
                <img src={`${imagePath}icon2.png`} alt="Icon" />
                <p>Proprietary Probiotic Formulations</p>
                <span>
                  Velalvie’s best-selling Sugar Shift is uniquely patented—a
                  rare distinction that underscores our commitment to truly
                  original, science-backed innovation.
                </span>
              </IconBox>
              <IconBox>
                <img src={`${imagePath}icon3.png`} alt="Icon" />
                <p>Clinically Distinct and Patented Strains</p>
                <span>
                  Every Velalvie formula is powered by one-of-a-kind probiotic
                  strains, carefully crafted to deliver specific health benefits
                  you won’t find in any other product.
                </span>
              </IconBox>
            </IconColLeft>
            <WhyUsImgBox>
              <WhyUsImg
                src={`${imagePath}whyus.png`}
                srcSet={`
                  ${imagePath}whyus.png 1x,
                  ${imagePath}whyus@2x.png 2x,
                  ${imagePath}whyus@3x.png 3x
                `}
                alt="Why Velavie is Better"
              />
              <BlueButton style={{ maxWidth: "300px", width: "100%" }}>
                <Link to="/shop">shop all</Link>
              </BlueButton>
            </WhyUsImgBox>
            <IconColRight>
              <IconBox>
                <img src={`${imagePath}icon4.png`} alt="Icon" />
                <p>Breakthrough in Glyphosate Degradation</p>
                <span>
                  At Velalvie, every formula includes a unique strain that
                  supports the breakdown of glyphosate—helping your body cope
                  with modern environmental stressors.
                </span>
              </IconBox>
              <IconBox>
                <img src={`${imagePath}icon5.png`} alt="Icon" />
                <p>Where Care Meets Effective Solutions</p>
                <span>
                  Beyond Sugar Shift, Velalvie offers a complete range of gut
                  health solutions—each one thoughtfully crafted to meet
                  specific needs and truly make a difference.
                </span>
              </IconBox>
              <IconBox>
                <img src={`${imagePath}icon6.png`} alt="Icon" />
                <p>Fermented Food Synergy Encapsulated</p>
                <span>
                  Inspired by fermented foods, our probiotics work together to
                  support gut balance—naturally and effectively.
                </span>
              </IconBox>
            </IconColRight>
          </WhyUsBox>
        </Container>
      </WhyUsArea>
      <ProductSlider />
    </>
  );
};

export default Home;
