import styled from "styled-components";
import { useImagePath } from "../../../context/ImagePathContext";

const ExpressCheckoutSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ExpressTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 1rem;
  text-align: center;
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const ExpressButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  img {
    cursor: pointer;
  }
`;

const ExpressText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ExpressCheckout = () => {
  const imagePath = useImagePath(); // Not destructured

  return (
    <ExpressCheckoutSection>
      <ExpressTitle>Express checkout</ExpressTitle>
      <ExpressButtons>
        <img src={`${imagePath}paypal.png`} alt="PayPal" />
        <img src={`${imagePath}apay.png`} alt="Apple Pay" />
      </ExpressButtons>
      <ExpressText>
        By continuing with your payment, you agree to the future charges listed
        on this page and the cancellation policy.
      </ExpressText>
    </ExpressCheckoutSection>
  );
};

export default ExpressCheckout;
