import React from "react";
import styled from "styled-components";
import { ButtonBase } from "./FormComponents";

const PlaceOrderButtonWrapper = styled(ButtonBase)`
  margin-top: 1.5rem;
`;

/**
 * PlaceOrderButton component for checkout form submission
 */
const PlaceOrderButton = ({ handleFormSubmit }) => {
  return (
    <PlaceOrderButtonWrapper type="submit" onClick={handleFormSubmit}>
      Place Order
    </PlaceOrderButtonWrapper>
  );
};

export default PlaceOrderButton;
