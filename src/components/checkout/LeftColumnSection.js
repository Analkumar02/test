import React from "react";
import styled from "styled-components";
import ExpressCheckout from "./LeftColumnArea/ExpressCheckout";
import ContactSection from "./LeftColumnArea/ContactSection";
import ShippingSection from "./LeftColumnArea/ShippingSection";
import ShippingMethodSection from "./LeftColumnArea/ShippingMethodSection";
import PaymentSection from "./LeftColumnArea/PaymentSection";
import BillingAddressSection from "./LeftColumnArea/BillingAddressSection";
import PlaceOrderButton from "./LeftColumnArea/PlaceOrderButton";

const LeftColumnContainer = styled.div`
  padding-right: 2rem;

  @media (max-width: 1024px) {
    padding-right: 0;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  }

  span {
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

/**
 * LeftColumnSection component for checkout page
 */
const LeftColumnSection = ({
  formData,
  errors,
  focusedField,
  setFocusedField,
  handleInputChange,
  handleShippingChange,
  handleFormSubmit,
  cardNumberError,
  expiryError,
  cvvMasked,
  setFormData,
  subtotal,
}) => {
  return (
    <LeftColumnContainer>
      <ExpressCheckout />
      <OrDivider>
        <span>OR</span>
      </OrDivider>

      <ContactSection
        formData={formData}
        errors={errors}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        handleInputChange={handleInputChange}
      />

      <ShippingSection
        formData={formData}
        errors={errors}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        handleInputChange={handleInputChange}
      />

      <ShippingMethodSection
        formData={formData}
        subtotal={subtotal}
        handleShippingChange={handleShippingChange}
      />

      <PaymentSection
        formData={formData}
        errors={errors}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        handleInputChange={handleInputChange}
        cardNumberError={cardNumberError}
        expiryError={expiryError}
        cvvMasked={cvvMasked}
        setFormData={setFormData}
      />

      <BillingAddressSection
        formData={formData}
        errors={errors}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
        handleInputChange={handleInputChange}
        setFormData={setFormData}
      />

      <PlaceOrderButton handleFormSubmit={handleFormSubmit} />
    </LeftColumnContainer>
  );
};

export default LeftColumnSection;
