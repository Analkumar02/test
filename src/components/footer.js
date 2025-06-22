import styled from "styled-components";
import Container from "./Container";
import { useImagePath } from "../context/ImagePathContext";
import { Link } from "react-router-dom"; // For homepage link
import { Icon } from "@iconify/react";

const FooterWrapper = styled.footer``;

const FooterCta = styled.div`
  padding: 80px 0;
  background-color: ${({ theme }) => theme.colors.Whiteout};
  @media (max-width: 991px) {
    padding: 40px 0;
  }
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: center;
  h2 {
    line-height: 3.5rem;
    color: ${({ theme }) => theme.colors.primary};
    @media (max-width: 991px) {
      font-size: 2.5rem;
      line-height: 3rem;
    }
    @media (max-width: 576px) {
      font-size: 24px;
      line-height: 32px;
    }
  }
  p {
    font-size: 1.125rem;
    line-height: 1.625rem;
    font-weight: 400;
    @media (max-width: 991px), (max-width: 576px) {
      font-size: 14px;
      line-height: 26px;
    }
  }
  @media (max-width: 576px) {
    gap: 20px;
  }
`;

const CtaIconBox = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 100px;
  gap: 30px;
  @media (max-width: 1240px) {
    margin-top: 60px;
  }
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    gap: 30px;
  }
  @media (max-width: 576px) {
    margin-top: 50px;
    gap: 30px;
  }
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: rgba(96, 152, 62, 0.1);
  padding: 40px 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  img {
    max-width: 100%;
  }
  h4 {
    line-height: 2rem;
    text-transform: capitalize;
    @media (max-width: 991px), (max-width: 576px) {
      font-size: 18px;
      line-height: 26px;
    }
    @media (max-width: 576px) {
      line-height: 30px;
    }
  }
  p {
    font-size: 1rem;
    @media (max-width: 1240px) {
      font-size: 14px;
      line-height: 26px;
    }
  }
  a {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 300px;
    text-align: center;
    text-decoration: none;
    font-weight: 700;
    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
    @media (max-width: 1240px) {
      max-width: 250px;
    }
    @media (max-width: 1100px) {
      max-width: 200px;
    }
    @media (max-width: 576px) {
      font-size: 14px;
      line-height: 26px;
    }
  }
  @media (max-width: 1440px) {
    max-width: 350px;
  }
  @media (max-width: 1240px) {
    max-width: 300px;
  }
  @media (max-width: 1100px) {
    max-width: 270px;
  }
  @media (max-width: 991px) {
    max-width: 400px;
  }
  @media (max-width: 576px) {
    max-width: 300px;
  }
`;

const FooterBottom = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 50px 0;
  color: ${({ theme }) => theme.colors.white};
`;

const BrandInfo = styled.div`
  padding-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white_lite};
`;

const LogoFooter = styled.div`
  max-width: 200px;
  margin-bottom: 20px;
  img {
    max-width: 100%;
  }
  @media (max-width: 991px) {
    max-width: 125px;
  }
`;

const BrandText = styled.p`
  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

const SocialMedia = styled.div`
  margin-top: 20px;
`;

const SocialMediaTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
`;

const SocialIconLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin: 30px 0;
  img {
    max-width: 300px;
  }
  @media (max-width: 991px) {
    flex-direction: column-reverse;
    gap: 10px;
    font-size: 14px;
  }
`;

const FooterLinks = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 50px;
  transition: all 0.3s ease;

  a {
    position: relative;
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    transition: color 0.2s;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2px;
      background: #fff;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover::after,
    &:focus::after {
      transform: scaleX(1);
    }

    &:hover {
      color: #fff;
    }

    @media (max-width: 991px) {
      font-size: 14px;
    }
  }

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Note = styled.div`
  p {
    font-size: 12px;
    line-height: 1.5rem;
  }
`;

const Footer = () => {
  const imagePath = useImagePath();
  return (
    <FooterWrapper>
      <FooterCta>
        <Container>
          <TitleArea>
            <h2>Expert Advice. Real Support. Reach Out Today.</h2>
            <p>
              Reach out to our trusted wellness experts for individualized
              support designed around your needs. At Velalvie, your journey to
              well-being is our priority.
            </p>
            <p>
              Monday - Friday, 6:00am - 5:00pm PST
              <br />
              Saturday, 8:00am - 2:00pm PST
            </p>
          </TitleArea>
          <CtaIconBox>
            <IconBox>
              <img src={`${imagePath}chat.svg`} alt="Chat" />
              <h4>chat with us</h4>
              <p>
                Chat with our experts in seconds.
                <br />
                Quick responses. Real support.
              </p>
              <a href=" ">chat now</a>
            </IconBox>
            <IconBox>
              <img src={`${imagePath}mail.svg`} alt="Email" />
              <h4>email us</h4>
              <p>
                Reach out anytime we're here to help. <br /> Typical response
                time: 1-3 business days.
              </p>
              <a href="mailto:support@velavie.com">support@velavie.com</a>
            </IconBox>
            <IconBox>
              <img src={`${imagePath}call.svg`} alt="Call" />
              <h4>call us</h4>
              <p>
                Expert guidance is just a phone call away.
                <br />
                Typical wait time: just a few minutes.
              </p>
              <a href="tel:1-800-555-0000">call 1-800-555-0000</a>
            </IconBox>
          </CtaIconBox>
        </Container>
      </FooterCta>
      <FooterBottom>
        <Container>
          <BrandInfo>
            <LogoFooter>
              <Link to="/">
                <img
                  src={`${imagePath}footer-logo.png`}
                  srcSet={`
                    ${imagePath}footer-logo.png 1x,
                    ${imagePath}footer-logo@2x.png 2x,
                    ${imagePath}footer-logo@3x.png 3x
                  `}
                  alt="Velavie Logo"
                />
              </Link>
            </LogoFooter>
            <BrandText>
              Velavie is a premium wellness brand specializing in targeted
              probiotic formulations that support gut health and its connection
              to broader systems in the body like immunity, metabolism, sleep,
              and cardiovascular function. Rooted in microbiome science,
              Velaview combines clinically backed strains with a whole-body
              approach, helping individuals restore balance and enhance their
              overall vitality from the inside out.
            </BrandText>
            <SocialMedia>
              <SocialMediaTitle>Follow Us On:</SocialMediaTitle>
              <SocialMediaIcons>
                <SocialIconLink href="#">
                  <Icon icon="gg:facebook" width="24" height="24" />
                </SocialIconLink>
                <SocialIconLink href="#">
                  <Icon icon="pajamas:twitter" width="24" height="24" />
                </SocialIconLink>
                <SocialIconLink href="#">
                  <Icon icon="uil:youtube" width="32" height="32" />
                </SocialIconLink>
                <SocialIconLink href="#">
                  <Icon icon="ic:sharp-tiktok" width="32" height="32" />
                </SocialIconLink>
              </SocialMediaIcons>
            </SocialMedia>
          </BrandInfo>
          <Copyright>
            <p>&copy; 2025 Velavie. All rights reserved.</p>
            <img
              src={`${imagePath}payment.png`}
              srcSet={`
                    ${imagePath}payment.png 1x,
                    ${imagePath}payment@2x.png 2x,
                    ${imagePath}payment@3x.png 3x
                  `}
              alt="Payment Methods"
            />
          </Copyright>
          <FooterLinks>
            <a href="/">Refund Policy</a>&nbsp;|&nbsp;
            <a href="/">Shipping Policy</a>&nbsp;|&nbsp;
            <a href="/">Privacy Policy</a>&nbsp;|&nbsp;
            <a href="/">Accessibility Statement</a>
            &nbsp;|&nbsp;
            <a href="/">Subscription Policy</a>&nbsp;|&nbsp;
            <a href="/">Promotional Offers</a>
          </FooterLinks>
          <Note>
            <p>
              * These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure or prevent any disease.
            </p>
            <p>
              * You must be 21 years of age or older to purchase Velalvie
              products, in compliance with federal and state regulations.
            </p>
            <p>
              * By placing an order, you agree that Velalvie is not responsible
              for, and you release us from, any liability or losses resulting
              from the enforcement of state or local laws.
            </p>
          </Note>
        </Container>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
