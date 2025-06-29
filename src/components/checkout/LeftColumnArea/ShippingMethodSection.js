import React from "react";
import {
  FormSection,
  SectionTitle,
  OptionGroup,
  Option,
  CustomRadio,
} from "./FormComponents";

/**
 * ShippingMethodSection component displays shipping method options
 */
const ShippingMethodSection = ({
  formData,
  subtotal,
  handleShippingChange,
}) => {
  return (
    <FormSection>
      <SectionTitle>Shipping method</SectionTitle>
      <div style={{ fontSize: "0.85rem", color: "#777", marginBottom: "1rem" }}>
        Please note: Ground shipping orders may experience a delay of up to 2
        days.
      </div>
      <OptionGroup>
        <Option selected={formData.shippingMethod === "standard"}>
          <input
            type="radio"
            name="shippingMethod"
            value="standard"
            checked={formData.shippingMethod === "standard"}
            onChange={handleShippingChange}
            style={{ display: "none" }}
          />
          <CustomRadio selected={formData.shippingMethod === "standard"} />
          <div style={{ flex: 1 }}>
            <strong>Standard Ground Shipping</strong>
            <div style={{ fontSize: "0.8rem", color: "#777" }}>
              3-7 business days
            </div>
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              marginLeft: "1.5rem",
              marginTop: "2px",
              color: subtotal >= 75 ? "#28a745" : "#333",
            }}
          >
            {subtotal >= 75 ? (
              <span
                style={{
                  background: "#e8f5e9",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                FREE
              </span>
            ) : (
              <span style={{ color: "#333" }}>$8.99</span>
            )}
          </div>
        </Option>

        <Option selected={formData.shippingMethod === "twoDayAir"}>
          <input
            type="radio"
            name="shippingMethod"
            value="twoDayAir"
            checked={formData.shippingMethod === "twoDayAir"}
            onChange={handleShippingChange}
            style={{ display: "none" }}
          />
          <CustomRadio selected={formData.shippingMethod === "twoDayAir"} />
          <div style={{ flex: 1 }}>
            <strong>2nd Day Air (Orders placed before 1pm PST)</strong>
            <div style={{ fontSize: "0.8rem", color: "#777" }}>
              2-3 business days
            </div>
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              marginLeft: "1.5rem",
              marginTop: "2px",
              color: subtotal >= 100 ? "#28a745" : "#333",
            }}
          >
            {subtotal >= 100 ? (
              <span
                style={{
                  background: "#e8f5e9",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                FREE
              </span>
            ) : (
              <span style={{ color: "#333" }}>$12.99</span>
            )}
          </div>
        </Option>

        <Option selected={formData.shippingMethod === "nextDay"}>
          <input
            type="radio"
            name="shippingMethod"
            value="nextDay"
            checked={formData.shippingMethod === "nextDay"}
            onChange={handleShippingChange}
            style={{ display: "none" }}
          />
          <CustomRadio selected={formData.shippingMethod === "nextDay"} />
          <div style={{ flex: 1 }}>
            <strong>Next Day (Orders placed before 1pm PST)</strong>
            <div style={{ fontSize: "0.8rem", color: "#777" }}>
              1-2 business days
            </div>
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              marginLeft: "1.5rem",
              marginTop: "2px",
              color: subtotal >= 150 ? "#28a745" : "#333",
            }}
          >
            {subtotal >= 150 ? (
              <span
                style={{
                  background: "#e8f5e9",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                FREE
              </span>
            ) : (
              <span style={{ color: "#333" }}>$22.99</span>
            )}
          </div>
        </Option>
      </OptionGroup>
    </FormSection>
  );
};

export default ShippingMethodSection;
