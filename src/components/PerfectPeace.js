import Container from "./Container";
import { useImagePath } from "../context/ImagePathContext";
import styled from "styled-components";

const PerfectPeaceWrapper = styled.div`
  padding: 100px 0;
  position: relative;
  @media (max-width: 767px) {
    padding: 40px 0;
  }
`;
const PerfectPeaceImg = styled.img`
  max-width: 350px;
  height: auto;
  position: absolute;
  right: 40px;
  top: 30px;
  @media (max-width: 1536px) {
    top: 70px;
  }
  @media (max-width: 1024px) {
    position: static;
    max-width: 250px;
  }
`;

const PerfectPeaceContent = styled.div`
  padding: 60px 40px;
  background: radial-gradient(
    90.3% 90.3% at 80.83% 50%,
    #3f87bd 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  border-radius: 15px;
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 40px 20px;
  }
`;

const PerfectTextarea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  align-items: flex-start;

  span {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.white};
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 5px;
  }
  h2 {
    color: ${(props) => props.theme.colors.white};
  }
  p {
    color: ${(props) => props.theme.colors.white};
    line-height: 1.6;
  }
  @media (max-width: 1536px) {
    max-width: 750px;
  }
  @media (max-width: 1280px) {
    max-width: 500px;
  }
  @media (max-width: 1024px) {
    max-width: 100%;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    h2 {
      line-height: 32px;
    }
  }
`;

export const GreenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(0.875rem, 0.7943rem + 0.3445vw, 1.125rem);
  line-height: 1;
  font-weight: 600;
  padding: 20px 40px;
  border-radius: 10px;
  text-transform: capitalize;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    box-shadow: inset 7em 0 0 0 ${({ theme }) => theme.colors.secondary},
      inset -7em 0 0 0 ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  @media (max-width: 991px) {
    padding: 10px 30px;
    border-radius: 5px;
  }
`;
const PerfectPeace = () => {
  const imagePath = useImagePath();
  return (
    <Container>
      <PerfectPeaceWrapper>
        <PerfectPeaceContent>
          <PerfectTextarea>
            <span>coming soon</span>
            <h2>Perfect Peace – Calm for Mind & Body</h2>
            <p>
              Our next Velavie product, Perfect Peace, is almost ready—and we’re
              excited to share it with you. Designed to gently soothe both mind
              and body, it’s crafted to support a sense of calm and balance in
              today’s busy world. <br></br>To celebrate its upcoming release,
              we’re offering a 60-count sample so you can experience the
              benefits firsthand. If you’re interested in Perfect Peace, let us
              know—we’d love to keep you updated and make sure you receive your
              sample when it’s available.
            </p>
            <GreenButton>I’m Interested</GreenButton>
          </PerfectTextarea>
          <PerfectPeaceImg
            src={`${imagePath}perfectpeace.png`}
            srcSet={`
                  ${imagePath}perfectpeace.png 1x,
                  ${imagePath}perfectpeace@2x.png 2x,
                  ${imagePath}perfectpeace@3x.png 3x
                `}
            alt="Perfect Peace"
          />
        </PerfectPeaceContent>
      </PerfectPeaceWrapper>
    </Container>
  );
};

export default PerfectPeace;
