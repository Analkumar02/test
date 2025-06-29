import React from "react";
import styled from "styled-components";
import { useImagePath } from "../../../context/ImagePathContext";
import {
  FormSection,
  SectionTitle,
  FormRow,
  InputWrapper,
  InputLabel,
  Input,
  OptionGroup,
  Option,
  CustomRadio,
} from "./FormComponents";

const CardFormWrapper = styled.div`
  padding: 2rem 2rem 1.5rem 2rem;
  position: relative;
  z-index: 2;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 600px) {
    padding: 1rem 0.5rem 1rem 0.5rem;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/**
 * Helper function to format card number with spaces
 */
const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

/**
 * Helper function to format expiry date with slash
 */
const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
};

/**
 * PaymentSection component handles payment method and credit card details
 */
const PaymentSection = ({
  formData,
  errors,
  focusedField,
  setFocusedField,
  handleInputChange,
  cardNumberError,
  expiryError,
  cvvMasked,
  setFormData,
}) => {
  // Get image path from context
  const imagePath = useImagePath();

  // Payment method group
  const PaymentMethodGroup = OptionGroup;
  const PaymentOption = Option;
  const PaymentCustomRadio = CustomRadio;

  return (
    <FormSection>
      <SectionTitle>Payment</SectionTitle>
      <div style={{ fontSize: "0.85rem", color: "#777", marginBottom: "1rem" }}>
        All transactions are secure and encrypted.
      </div>

      <PaymentMethodGroup style={{ borderRadius: 10, overflow: "visible" }}>
        <PaymentOption
          selected={formData.paymentMethod === "creditCard"}
          onClick={() =>
            setFormData((prev) => ({ ...prev, paymentMethod: "creditCard" }))
          }
          style={{
            cursor: "pointer",
            borderRadius: "10px 10px 0 0",
            borderBottom: "none",
            boxShadow:
              formData.paymentMethod === "creditCard"
                ? "0 2px 8px rgba(60,72,88,0.10)"
                : "none",
            background:
              formData.paymentMethod === "creditCard" ? "#FBFBF5" : "none",
          }}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={formData.paymentMethod === "creditCard"}
            onChange={handleInputChange}
            style={{ display: "none" }}
          />
          <PaymentCustomRadio
            selected={formData.paymentMethod === "creditCard"}
            style={{
              borderColor: "#4caf50",
              boxShadow:
                formData.paymentMethod === "creditCard"
                  ? "0 0 0 4px #e8f5e9"
                  : "none",
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#222",
            }}
          >
            Credit card
          </div>
          <img
            src={(imagePath ? imagePath : "/images/") + "creditcards.png"}
            alt="Credit Card"
            style={{
              height: "28px",
              marginLeft: "1rem",
              filter: "drop-shadow(0 1px 2px #e0e0e0)",
            }}
          />
        </PaymentOption>

        {formData.paymentMethod === "creditCard" && (
          <CardFormWrapper>
            <FormRow>
              <InputWrapper style={{ gridColumn: "1 / -1" }}>
                <InputLabel
                  htmlFor="cardNumber"
                  $focused={focusedField === "cardNumber"}
                  $hasValue={formData.cardNumber.length > 0}
                  $theme={{ colors: { secondary: "#60983E", gray: "#ACACAC" } }}
                >
                  Card number*
                </InputLabel>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  maxLength={19}
                  value={formatCardNumber(formData.cardNumber)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setFormData((prev) => ({ ...prev, cardNumber: raw }));
                  }}
                  onFocus={() => setFocusedField("cardNumber")}
                  onBlur={() => setFocusedField(null)}
                  $focused={focusedField === "cardNumber"}
                  style={{
                    background: "#fafbfa",
                    border: cardNumberError
                      ? "1.5px solid #e53935"
                      : "1.5px solid #cfd8dc",
                    borderRadius: 5,
                    fontSize: "1.2rem",
                    letterSpacing: "0.2em",
                    boxShadow: "0 1px 2px #f0f0f0",
                    fontFamily: "monospace",
                    width: "100%",
                    paddingRight: formData.cardNumber.startsWith("2222")
                      ? 48
                      : undefined,
                  }}
                  placeholder={
                    focusedField === "cardNumber" &&
                    formData.cardNumber.length === 0
                      ? "____ ____ ____ ____"
                      : ""
                  }
                  required
                />
                {formData.cardNumber.startsWith("2222") && (
                  <img
                    src={(imagePath ? imagePath : "/images/") + "visa.png"}
                    alt="Visa Card"
                    style={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 44,
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />
                )}
                {cardNumberError && (
                  <div
                    style={{
                      color: "#e53935",
                      fontSize: "0.85rem",
                      marginTop: 2,
                    }}
                  >
                    {cardNumberError}
                  </div>
                )}
              </InputWrapper>
            </FormRow>

            <FormRow>
              <InputWrapper>
                <InputLabel
                  htmlFor="expiry"
                  $focused={focusedField === "expiry"}
                  $hasValue={formData.expiry && formData.expiry.length > 0}
                >
                  Card Expiry*
                </InputLabel>
                <Input
                  id="expiry"
                  name="expiry"
                  inputMode="numeric"
                  maxLength={5}
                  value={formatExpiry(formData.expiry || "")}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                    let formatted = raw;
                    if (raw.length > 2)
                      formatted = raw.slice(0, 2) + "/" + raw.slice(2);
                    setFormData((prev) => ({ ...prev, expiry: formatted }));
                  }}
                  onFocus={() => setFocusedField("expiry")}
                  onBlur={() => setFocusedField(null)}
                  $focused={focusedField === "expiry"}
                  $theme={{
                    colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
                  }}
                  style={{
                    background: "#fafbfa",
                    border: expiryError
                      ? "1.5px solid #e53935"
                      : "1.5px solid #cfd8dc",
                    borderRadius: 5,
                    fontSize: "1rem",
                    boxShadow: "0 1px 2px #f0f0f0",
                  }}
                  placeholder={
                    focusedField === "expiry" ||
                    (formData.expiry && formData.expiry.length > 0)
                      ? ""
                      : "MM/YY"
                  }
                  required
                />
                {expiryError && (
                  <div
                    style={{
                      color: "#e53935",
                      fontSize: "0.85rem",
                      marginTop: 2,
                    }}
                  >
                    {expiryError}
                  </div>
                )}
              </InputWrapper>

              <InputWrapper>
                <InputLabel
                  htmlFor="cvv"
                  $focused={focusedField === "cvv"}
                  $hasValue={formData.cvv.length > 0}
                >
                  CVV*
                </InputLabel>
                <Input
                  id="cvv"
                  name="cvv"
                  inputMode="numeric"
                  maxLength={3}
                  value={focusedField === "cvv" ? formData.cvv : cvvMasked}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setFormData((prev) => ({ ...prev, cvv: raw }));
                  }}
                  onFocus={() => setFocusedField("cvv")}
                  onBlur={() => setFocusedField(null)}
                  $focused={focusedField === "cvv"}
                  style={{
                    background: "#fafbfa",
                    border: errors.cvv
                      ? "1.5px solid #e53935"
                      : "1.5px solid #cfd8dc",
                    borderRadius: 5,
                    fontSize: "1rem",
                    boxShadow: "0 1px 2px #f0f0f0",
                    width: "100%",
                    letterSpacing: "0.2em",
                  }}
                  placeholder={
                    focusedField === "cvv" || formData.cvv.length > 0
                      ? ""
                      : "CVV"
                  }
                  required
                />
                {errors.cvv && (
                  <div
                    style={{
                      color: "#e53935",
                      fontSize: "0.85rem",
                      marginTop: 2,
                    }}
                  >
                    {errors.cvv}
                  </div>
                )}
              </InputWrapper>
            </FormRow>

            <FormRow>
              <InputWrapper
                style={{ gridColumn: "1 / -1" }}
                className={errors.cardName ? "error-field" : ""}
              >
                <InputLabel
                  htmlFor="cardName"
                  $focused={focusedField === "cardName"}
                  $hasValue={formData.cardName.length > 0}
                >
                  Name on card*
                </InputLabel>
                <Input
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("cardName")}
                  onBlur={() => setFocusedField(null)}
                  $focused={focusedField === "cardName"}
                  style={{
                    background: "#fafbfa",
                    border: errors.cardName
                      ? "1.5px solid #e53935"
                      : "1.5px solid #cfd8dc",
                    borderRadius: 5,
                    fontSize: "1rem",
                    boxShadow: "0 1px 2px #f0f0f0",
                    width: "100%",
                  }}
                  placeholder={
                    focusedField === "cardName" || formData.cardName.length > 0
                      ? ""
                      : "Name on card"
                  }
                  required
                />
                {errors.cardName && (
                  <div
                    style={{
                      color: "#e53935",
                      fontSize: "0.85rem",
                      marginTop: 2,
                    }}
                  >
                    {errors.cardName}
                  </div>
                )}
              </InputWrapper>
            </FormRow>
          </CardFormWrapper>
        )}

        <div style={{ borderTop: "1px solid #e0e0e0", margin: 0 }} />

        <PaymentOption
          selected={formData.paymentMethod === "cashOnDelivery"}
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              paymentMethod: "cashOnDelivery",
            }))
          }
          style={{
            cursor: "pointer",
            borderRadius: "0 0 10px 10px",
            background:
              formData.paymentMethod === "cashOnDelivery" ? "#FBFBF5" : "#none",
          }}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={formData.paymentMethod === "cashOnDelivery"}
            onChange={handleInputChange}
            style={{ display: "none" }}
          />
          <PaymentCustomRadio
            selected={formData.paymentMethod === "cashOnDelivery"}
            style={{
              borderColor: "#4caf50",
              boxShadow:
                formData.paymentMethod === "cashOnDelivery"
                  ? "0 0 0 4px #e8f5e9"
                  : "none",
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#222",
            }}
          >
            Cash on delivery
          </div>
        </PaymentOption>
      </PaymentMethodGroup>
    </FormSection>
  );
};

export default PaymentSection;
