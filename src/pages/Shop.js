import React from "react";
import Container from "../components/Container";
import { useImagePath } from "../context/ImagePathContext";
import styled from "styled-components";
import ProductSlider from "../components/ProductSlider";
import FeatureIcons from "../components/FeatureIcons";
import ComparisonTable from "../components/ComparisonTable";
import PerfectPeace from "../components/PerfectPeace";

const HeroShop = styled.div``;
const ShopHeroBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  padding: 40px 0;
  @media (max-width: 1024px) {
    gap: 0;
    padding: 20px 0;
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

const HeroImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  align-self: end;
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

function Shop() {
  const imagePath = useImagePath();
  return (
    <>
      <HeroShop>
        <Container>
          <ShopHeroBox>
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
            </HeroContent>
            <HeroImg>
              <img
                src={`${imagePath}shophero.png`}
                srcSet={`
                  ${imagePath}shophero.png 1x,
                  ${imagePath}shophero@2x.png 2x,
                  ${imagePath}shophero@3x.png 3x
                `}
                alt="Shop Hero Product"
              />
            </HeroImg>
          </ShopHeroBox>
        </Container>
      </HeroShop>
      <ProductSlider hideTitle />
      <FeatureIcons />
      <ComparisonTable />
      <PerfectPeace />
    </>
  );
}

export default Shop;
