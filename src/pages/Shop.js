import Container from "../components/Container";
import { useImagePath } from "../context/ImagePathContext";
import styled from "styled-components";
import ProductSlider from "../components/ProductSlider";
import FeatureIcons from "../components/FeatureIcons";
import ComparisonTable from "../components/ComparisonTable";
import PerfectPeace from "../components/PerfectPeace";
import AppDownload from "../components/AppDownload";

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
const RatingText = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(0.75rem, 0.6289rem + 0.5168vw, 1.125rem);
  img {
    max-height: 24px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
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

const ShopIconWrapper = styled.div`
  text-align: center;
  padding: 40px 0px;
`;

const ShopIconTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.body};
  margin-bottom: 40px;
`;

const ShopIconBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  justify-self: center;
  gap: 100px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: 40px;
    column-gap: 20px;
  }
`;

const ShopIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  max-width: 170px;
  text-transform: capitalize;
  img {
    max-width: 100%;
    width: 64px;
    height: auto;
  }
  p {
    color: ${(props) => props.theme.colors.body};
  }
  @media (max-width: 1024px) {
    max-width: 100%;
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
                <RatingText>
                  <img src={`${imagePath}5star.svg`} alt="stars" />
                  <span>Over 500+ 5-Star Reviews</span>
                </RatingText>
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
      <ShopIconWrapper>
        <Container>
          <ShopIconTitle>
            Each of our probiotics is specially formulated to
          </ShopIconTitle>
          <ShopIconBox>
            <ShopIcon>
              <img src={`${imagePath}shopicon1.svg`} alt="Shop 1" />
              <p>Gluten-free</p>
            </ShopIcon>
            <ShopIcon>
              <img src={`${imagePath}shopicon2.svg`} alt="Shop 2" />
              <p>Dairy-free</p>
            </ShopIcon>
            <ShopIcon>
              <img src={`${imagePath}shopicon3.svg`} alt="Shop 3" />
              <p>Soy-free</p>
            </ShopIcon>
            <ShopIcon>
              <img src={`${imagePath}shopicon4.svg`} alt="Shop 4" />
              <p>Non-GMO</p>
            </ShopIcon>
          </ShopIconBox>
        </Container>
      </ShopIconWrapper>
      <PerfectPeace />
      <AppDownload />
    </>
  );
}

export default Shop;
