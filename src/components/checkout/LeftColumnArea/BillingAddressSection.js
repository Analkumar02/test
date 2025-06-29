import React from "react";
import styled from "styled-components";
import {
  FormSection,
  SectionTitle,
  FormRow,
  InputWrapper,
  InputLabel,
  Input,
  Select,
  OptionGroup,
  Option,
  CustomRadio,
} from "./FormComponents";

const BillingFormWrapper = styled.div`
  padding: 2rem 2rem 1.5rem 2rem;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 0 10px 10px;
  margin-top: -12px;
  box-shadow: 0 4px 10px rgba(60, 72, 88, 0.15);
  border: 1.5px solid #60983e;
  border-top: none;
  transform: translateY(0);

  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
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

const BillingAddressSection = ({
  formData,
  errors,
  focusedField,
  setFocusedField,
  handleInputChange,
  setFormData,
}) => {
  const BillingAddressGroup = OptionGroup;
  const BillingOption = Option;
  const BillingCustomRadio = CustomRadio;

  const handleBillingAddressOptionChange = (useSameAddress) => {
    if (!useSameAddress) {
      setFormData((prev) => ({
        ...prev,
        sameShippingAddress: false,
        billingFirstName: "",
        billingLastName: "",
        billingAddress1: "",
        billingAddress2: "",
        billingCity: "",
        billingState: "",
        billingZipCode: "",
        billingPhone: "",
        billingCountry: "United States",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        sameShippingAddress: true,
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingAddress1: prev.address1,
        billingAddress2: prev.address2,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode,
        billingPhone: prev.phone,
        billingCountry: prev.country,
      }));
    }
  };

  return (
    <FormSection>
      <SectionTitle>Billing address</SectionTitle>
      <BillingAddressGroup
        style={{
          border: "none",
          borderRadius: "10px 10px 0 0",
          overflow: "visible",
        }}
      >
        <BillingOption
          selected={formData.sameShippingAddress}
          onClick={() => handleBillingAddressOptionChange(true)}
          style={{
            borderRadius: formData.sameShippingAddress
              ? "10px 10px 0 0"
              : "10px 10px 0 0",
            padding: "14px 16px",
            cursor: "pointer",
            zIndex: 1,
            position: "relative",
            borderBottom: formData.sameShippingAddress
              ? "1px solid #60983E"
              : "none",
          }}
        >
          <input
            type="radio"
            name="billingAddressType"
            value="same"
            checked={formData.sameShippingAddress}
            onChange={() => handleBillingAddressOptionChange(true)}
            style={{ display: "none" }}
          />
          <BillingCustomRadio
            selected={formData.sameShippingAddress}
            style={{ marginRight: "12px" }}
          />
          <div
            style={{
              flex: 1,
              fontWeight: 500,
              fontSize: "1rem",
              color: "#222",
            }}
          >
            Same as shipping address
          </div>
        </BillingOption>
        {formData.sameShippingAddress ? null : <div style={{ margin: 0 }} />}
        <BillingOption
          selected={!formData.sameShippingAddress}
          onClick={() => handleBillingAddressOptionChange(false)}
          style={{
            borderRadius: !formData.sameShippingAddress ? "0" : "0 0 10px 10px",
            background: !formData.sameShippingAddress ? "#FBFBF5" : "none",
            boxShadow: !formData.sameShippingAddress
              ? "0 4px 10px rgba(60,72,88,0.15)"
              : "none",
            marginBottom: 0,
            transition: "all 0.2s ease",
            position: "relative",
            zIndex: 2,
            cursor: "pointer",
            padding: "14px 16px",
            border: !formData.sameShippingAddress
              ? "1.5px solid #60983E"
              : "1px solid #E0E0E0",
            borderBottom: !formData.sameShippingAddress
              ? "none"
              : "1px solid #E0E0E0",
          }}
        >
          <input
            type="radio"
            name="billingAddressType"
            value="different"
            checked={!formData.sameShippingAddress}
            onChange={() => handleBillingAddressOptionChange(false)}
            style={{ display: "none" }}
          />
          <BillingCustomRadio
            selected={!formData.sameShippingAddress}
            style={{ marginRight: "12px" }}
          />
          <div
            style={{
              flex: 1,
              fontWeight: 500,
              fontSize: "1rem",
              color: "#222",
            }}
          >
            Use a different billing address
          </div>
        </BillingOption>
      </BillingAddressGroup>

      {!formData.sameShippingAddress && (
        <BillingFormWrapper>
          <InputWrapper>
            <InputLabel
              htmlFor="billingCountry"
              $focused={focusedField === "billingCountry"}
              $hasValue={!!formData.billingCountry}
              $theme={{
                colors: { secondary: "#60983E", gray: "#ACACAC" },
              }}
            >
              Country/Region*
            </InputLabel>
            <Select
              id="billingCountry"
              name="billingCountry"
              value={formData.billingCountry || formData.country}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("billingCountry")}
              onBlur={() => setFocusedField(null)}
              $focused={focusedField === "billingCountry"}
              $theme={{
                colors: {
                  secondary: "#60983E",
                  gray_lite: "#AFAFAF",
                },
              }}
              required
            >
              <option value="United States">United States</option>
            </Select>
          </InputWrapper>

          <FormRow>
            <InputWrapper>
              <InputLabel
                htmlFor="billingFirstName"
                $focused={focusedField === "billingFirstName"}
                $hasValue={!!formData.billingFirstName}
                $theme={{
                  colors: { secondary: "#60983E", gray: "#ACACAC" },
                }}
              >
                First Name*
              </InputLabel>
              <Input
                id="billingFirstName"
                name="billingFirstName"
                value={formData.billingFirstName || ""}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("billingFirstName")}
                onBlur={() => setFocusedField(null)}
                $focused={focusedField === "billingFirstName"}
                $theme={{
                  colors: {
                    secondary: "#60983E",
                    gray_lite: "#AFAFAF",
                  },
                }}
                style={{
                  border: errors.billingFirstName
                    ? "1.5px solid #e53935"
                    : undefined,
                }}
                required
              />
              {errors.billingFirstName && (
                <div
                  style={{
                    color: "#e53935",
                    fontSize: "0.85rem",
                    marginTop: 2,
                  }}
                >
                  {errors.billingFirstName}
                </div>
              )}
            </InputWrapper>

            <InputWrapper>
              <InputLabel
                htmlFor="billingLastName"
                $focused={focusedField === "billingLastName"}
                $hasValue={!!formData.billingLastName}
                $theme={{
                  colors: { secondary: "#60983E", gray: "#ACACAC" },
                }}
              >
                Last Name*
              </InputLabel>
              <Input
                id="billingLastName"
                name="billingLastName"
                value={formData.billingLastName || ""}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("billingLastName")}
                onBlur={() => setFocusedField(null)}
                $focused={focusedField === "billingLastName"}
                $theme={{
                  colors: {
                    secondary: "#60983E",
                    gray_lite: "#AFAFAF",
                  },
                }}
                style={{
                  border: errors.billingLastName
                    ? "1.5px solid #e53935"
                    : undefined,
                }}
                required
              />
              {errors.billingLastName && (
                <div
                  style={{
                    color: "#e53935",
                    fontSize: "0.85rem",
                    marginTop: 2,
                  }}
                >
                  {errors.billingLastName}
                </div>
              )}
            </InputWrapper>
          </FormRow>

          <InputWrapper className={errors.billingAddress1 ? "error-field" : ""}>
            <InputLabel
              htmlFor="billingAddress1"
              $focused={focusedField === "billingAddress1"}
              $hasValue={!!formData.billingAddress1}
              $theme={{
                colors: { secondary: "#60983E", gray: "#ACACAC" },
              }}
            >
              Address*
            </InputLabel>
            <Input
              id="billingAddress1"
              name="billingAddress1"
              value={formData.billingAddress1 || ""}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("billingAddress1")}
              onBlur={() => setFocusedField(null)}
              $focused={focusedField === "billingAddress1"}
              $theme={{
                colors: {
                  secondary: "#60983E",
                  gray_lite: "#AFAFAF",
                },
              }}
              style={{
                border: errors.billingAddress1
                  ? "1.5px solid #e53935"
                  : undefined,
              }}
              required
            />
            {errors.billingAddress1 && (
              <div
                style={{
                  color: "#e53935",
                  fontSize: "0.85rem",
                  marginTop: 2,
                }}
              >
                {errors.billingAddress1}
              </div>
            )}
          </InputWrapper>

          <InputWrapper>
            <InputLabel
              htmlFor="billingAddress2"
              $focused={focusedField === "billingAddress2"}
              $hasValue={!!formData.billingAddress2}
              $theme={{
                colors: { secondary: "#60983E", gray: "#ACACAC" },
              }}
            >
              Apartment, suite, etc. (optional)
            </InputLabel>
            <Input
              id="billingAddress2"
              name="billingAddress2"
              value={formData.billingAddress2 || ""}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("billingAddress2")}
              onBlur={() => setFocusedField(null)}
              $focused={focusedField === "billingAddress2"}
              $theme={{
                colors: {
                  secondary: "#60983E",
                  gray_lite: "#AFAFAF",
                },
              }}
            />
          </InputWrapper>

          <FormRow $columns="1.5fr 1fr 1fr">
            <InputWrapper className={errors.billingCity ? "error-field" : ""}>
              <InputLabel
                htmlFor="billingCity"
                $focused={focusedField === "billingCity"}
                $hasValue={!!formData.billingCity}
                $theme={{
                  colors: { secondary: "#60983E", gray: "#ACACAC" },
                }}
              >
                City*
              </InputLabel>
              <Input
                id="billingCity"
                name="billingCity"
                value={formData.billingCity || ""}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("billingCity")}
                onBlur={() => setFocusedField(null)}
                $focused={focusedField === "billingCity"}
                $theme={{
                  colors: {
                    secondary: "#60983E",
                    gray_lite: "#AFAFAF",
                  },
                }}
                style={{
                  border: errors.billingCity
                    ? "1.5px solid #e53935"
                    : undefined,
                }}
                required
              />
              {errors.billingCity && (
                <div
                  style={{
                    color: "#e53935",
                    fontSize: "0.85rem",
                    marginTop: 2,
                  }}
                >
                  {errors.billingCity}
                </div>
              )}
            </InputWrapper>

            <InputWrapper className={errors.billingState ? "error-field" : ""}>
              <InputLabel
                htmlFor="billingState"
                $focused={focusedField === "billingState"}
                $hasValue={!!formData.billingState}
                $theme={{
                  colors: { secondary: "#60983E", gray: "#ACACAC" },
                }}
              >
                State*
              </InputLabel>
              <Select
                id="billingState"
                name="billingState"
                value={formData.billingState || ""}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("billingState")}
                onBlur={() => setFocusedField(null)}
                $focused={focusedField === "billingState"}
                $theme={{
                  colors: {
                    secondary: "#60983E",
                    gray_lite: "#AFAFAF",
                  },
                }}
                style={{
                  border: errors.billingState
                    ? "1.5px solid #e53935"
                    : undefined,
                }}
                required
              >
                <option value=""></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Select>
              {errors.billingState && (
                <div
                  style={{
                    color: "#e53935",
                    fontSize: "0.85rem",
                    marginTop: 2,
                  }}
                >
                  {errors.billingState}
                </div>
              )}
            </InputWrapper>

            <InputWrapper
              className={errors.billingZipCode ? "error-field" : ""}
            >
              <InputLabel
                htmlFor="billingZipCode"
                $focused={focusedField === "billingZipCode"}
                $hasValue={!!formData.billingZipCode}
                $theme={{
                  colors: { secondary: "#60983E", gray: "#ACACAC" },
                }}
              >
                ZIP code*
              </InputLabel>
              <Input
                id="billingZipCode"
                name="billingZipCode"
                inputMode="numeric"
                maxLength={6}
                value={formData.billingZipCode || ""}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .substring(0, 6);
                  handleInputChange({
                    target: {
                      name: "billingZipCode",
                      value,
                    },
                  });
                }}
                onFocus={() => setFocusedField("billingZipCode")}
                onBlur={() => setFocusedField(null)}
                $focused={focusedField === "billingZipCode"}
                $theme={{
                  colors: {
                    secondary: "#60983E",
                    gray_lite: "#AFAFAF",
                  },
                }}
                style={{
                  border: errors.billingZipCode
                    ? "1.5px solid #e53935"
                    : undefined,
                }}
                required
              />
              {errors.billingZipCode && (
                <div
                  style={{
                    color: "#e53935",
                    fontSize: "0.85rem",
                    marginTop: 2,
                  }}
                >
                  {errors.billingZipCode}
                </div>
              )}
            </InputWrapper>
          </FormRow>

          <InputWrapper className={errors.billingPhone ? "error-field" : ""}>
            <InputLabel
              htmlFor="billingPhone"
              $focused={focusedField === "billingPhone"}
              $hasValue={!!formData.billingPhone}
              $theme={{
                colors: { secondary: "#60983E", gray: "#ACACAC" },
              }}
            >
              Phone Number*
            </InputLabel>
            <Input
              id="billingPhone"
              name="billingPhone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.billingPhone || ""}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .substring(0, 10);
                handleInputChange({
                  target: {
                    name: "billingPhone",
                    value,
                  },
                });
              }}
              onFocus={() => setFocusedField("billingPhone")}
              onBlur={() => setFocusedField(null)}
              $focused={focusedField === "billingPhone"}
              $theme={{
                colors: {
                  secondary: "#60983E",
                  gray_lite: "#AFAFAF",
                },
              }}
              required
              style={{
                border: errors.billingPhone ? "1.5px solid #e53935" : undefined,
              }}
            />
            {errors.billingPhone && (
              <div
                style={{
                  color: "#e53935",
                  fontSize: "0.85rem",
                  marginTop: 2,
                }}
              >
                {errors.billingPhone}
              </div>
            )}
          </InputWrapper>
        </BillingFormWrapper>
      )}
    </FormSection>
  );
};

export default BillingAddressSection;
