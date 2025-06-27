import styled from "styled-components";
import { useImagePath } from "../context/ImagePathContext";
import Container from "./Container";

const AppDownloadWrapper = styled.div`
  padding: 80px 0;
  @media (max-width: 991px) {
    padding: 40px 0;
  }
`;

const AppBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  h3 {
    text-transform: capitalize;
  }
  h2 {
    text-transform: capitalize;
  }
  ul {
    list-style: disc;
    padding-left: 20px;
    li {
      list-style: disc;
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
  @media (max-width: 991px) {
    gap: 10px;
  }
`;
const DownloadBtn = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  img {
    max-width: 100%;
    &:hover {
      transform: scale(1.1);
    }
  }
  @media (max-width: 991px) {
    justify-content: space-between;
    img {
      max-width: 160px;
    }
  }
`;

const MobileAppImg = styled.img`
  max-width: 100%;
`;

const AppDownload = () => {
  const imagePath = useImagePath();
  return (
    <AppDownloadWrapper>
      <Container>
        <AppBox>
          <ContentBox>
            <h3>Unlock True Wellness</h3>
            <h2>download the Velavie app</h2>
            <ul>
              <li>Unlock wellness with app-exclusive offers.</li>
              <li>Get early access to new formulas.</li>
              <li>Stay informed. Stay empowered.</li>
            </ul>
            <DownloadBtn>
              <img src={`${imagePath}playstore.png`} alt="Playstore" />
              <img src={`${imagePath}appstore.png`} alt="Appstore" />
            </DownloadBtn>
          </ContentBox>
          <MobileAppImg
            src={`${imagePath}app1.png`}
            srcSet={`
                  ${imagePath}app1.png 1x,
                  ${imagePath}app1@2x.png 2x,
                  ${imagePath}app1@3x.png 3x
                `}
            alt="Mobile App"
          />
        </AppBox>
      </Container>
    </AppDownloadWrapper>
  );
};

export default AppDownload;
