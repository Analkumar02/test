import Container from "./Container";
import { useImagePath } from "../context/ImagePathContext";
import styled from "styled-components";

const FeatureIconWrapper = styled.div`
  text-align: center;
  padding: 40px 0px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const FeatureIconTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 40px;
`;

const FeatureIconBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 1fr);
  justify-content: space-between;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    row-gap: 40px;
    column-gap: 20px;
  }
`;

const FeatureIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  max-width: 170px;
  text-transform: capitalize;
  img {
    max-width: 100%;
    width: 44px;
    height: auto;
  }
  p {
    color: ${(props) => props.theme.colors.white};
  }
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;
const FeatureIcons = () => {
  const imagePath = useImagePath();
  return (
    <FeatureIconWrapper>
      <Container>
        <FeatureIconTitle>
          Each of our probiotics is specially formulated to
        </FeatureIconTitle>
        <FeatureIconBox>
          <FeatureIcon>
            <img
              src={`${imagePath}ft1.png`}
              srcSet={`
                  ${imagePath}ft1.png 1x,
                  ${imagePath}ft1@2x.png 2x,
                  ${imagePath}ft1@3x.png 3x
                `}
              alt="Feature 1"
            />
            <p>
              Support the Immune <br></br>System
            </p>
          </FeatureIcon>
          <FeatureIcon>
            <img
              src={`${imagePath}ft2.png`}
              srcSet={`
                  ${imagePath}ft2.png 1x,
                  ${imagePath}ft2@2x.png 2x,
                  ${imagePath}ft2@3x.png 3x
                `}
              alt="Feature 2"
            />
            <p>
              Improve bowel <br></br>regularity
            </p>
          </FeatureIcon>
          <FeatureIcon>
            <img
              src={`${imagePath}ft3.png`}
              srcSet={`
                  ${imagePath}ft3.png 1x,
                  ${imagePath}ft3@2x.png 2x,
                  ${imagePath}ft3@3x.png 3x
                `}
              alt="Feature 3"
            />
            <p>
              Optimize nutrient <br></br>absorption
            </p>
          </FeatureIcon>
          <FeatureIcon>
            <img
              src={`${imagePath}ft4.png`}
              srcSet={`
                  ${imagePath}ft4.png 1x,
                  ${imagePath}ft4@2x.png 2x,
                  ${imagePath}ft4@3x.png 3x
                `}
              alt="Feature 4"
            />
            <p>
              Lower oxidative <br></br>stress
            </p>
          </FeatureIcon>
          <FeatureIcon>
            <img
              src={`${imagePath}ft5.png`}
              srcSet={`
                  ${imagePath}ft5.png 1x,
                  ${imagePath}ft5@2x.png 2x,
                  ${imagePath}ft5@3x.png 3x
                `}
              alt="Feature 5"
            />
            <p>
              detoxify heavy metals <br></br>and glyphosate
            </p>
          </FeatureIcon>
          <FeatureIcon>
            <img
              src={`${imagePath}ft6.png`}
              srcSet={`
                  ${imagePath}ft6.png 1x,
                  ${imagePath}ft6@2x.png 2x,
                  ${imagePath}ft6@3x.png 3x
                `}
              alt="Feature 6"
            />
            <p>
              strengthen gut <br></br>lining/ barrier
            </p>
          </FeatureIcon>
        </FeatureIconBox>
      </Container>
    </FeatureIconWrapper>
  );
};

export default FeatureIcons;
