import React from "react";
import {
  FormSection,
  SectionTitle,
  FormRow,
  InputWrapper,
  InputLabel,
  Input,
  Select,
} from "./FormComponents";

/**
 * ShippingSection component handles the shipping address form fields
 */
const ShippingSection = ({
  formData,
  errors,
  focusedField,
  setFocusedField,
  handleInputChange,
}) => {
  return (
    <FormSection>
      <SectionTitle>Shipping</SectionTitle>
      <InputWrapper>
        <InputLabel
          htmlFor="country"
          $focused={focusedField === "country"}
          $hasValue={formData.country.length > 0}
          $theme={{
            colors: { secondary: "#60983E", gray: "#ACACAC" },
          }}
        >
          Country/Region*
        </InputLabel>
        <Select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          onFocus={() => setFocusedField("country")}
          onBlur={() => setFocusedField(null)}
          $focused={focusedField === "country"}
          $theme={{
            colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
          }}
          required
        >
          <option value="United States">United States</option>
        </Select>
      </InputWrapper>

      <FormRow>
        <InputWrapper className={errors.firstName ? "error-field" : ""}>
          <InputLabel
            htmlFor="firstName"
            $focused={focusedField === "firstName"}
            $hasValue={formData.firstName.length > 0}
            $theme={{
              colors: { secondary: "#60983E", gray: "#ACACAC" },
            }}
          >
            First Name*
          </InputLabel>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("firstName")}
            onBlur={() => setFocusedField(null)}
            $focused={focusedField === "firstName"}
            $theme={{
              colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
            }}
            style={{
              border: errors.firstName ? "1.5px solid #e53935" : undefined,
            }}
            required
          />
          {errors.firstName && (
            <div
              style={{
                color: "#e53935",
                fontSize: "0.85rem",
                marginTop: 2,
              }}
            >
              {errors.firstName}
            </div>
          )}
        </InputWrapper>
        <InputWrapper className={errors.lastName ? "error-field" : ""}>
          <InputLabel
            htmlFor="lastName"
            $focused={focusedField === "lastName"}
            $hasValue={formData.lastName.length > 0}
            $theme={{
              colors: { secondary: "#60983E", gray: "#ACACAC" },
            }}
          >
            Last Name*
          </InputLabel>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("lastName")}
            onBlur={() => setFocusedField(null)}
            $focused={focusedField === "lastName"}
            $theme={{
              colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
            }}
            style={{
              border: errors.lastName ? "1.5px solid #e53935" : undefined,
            }}
            required
          />
          {errors.lastName && (
            <div
              style={{
                color: "#e53935",
                fontSize: "0.85rem",
                marginTop: 2,
              }}
            >
              {errors.lastName}
            </div>
          )}
        </InputWrapper>
      </FormRow>

      <InputWrapper className={errors.address1 ? "error-field" : ""}>
        <InputLabel
          htmlFor="address1"
          $focused={focusedField === "address1"}
          $hasValue={formData.address1.length > 0}
          $theme={{
            colors: { secondary: "#60983E", gray: "#ACACAC" },
          }}
        >
          Address*
        </InputLabel>
        <Input
          id="address1"
          name="address1"
          value={formData.address1}
          onChange={handleInputChange}
          onFocus={() => setFocusedField("address1")}
          onBlur={() => setFocusedField(null)}
          $focused={focusedField === "address1"}
          $theme={{
            colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
          }}
          style={{
            border: errors.address1 ? "1.5px solid #e53935" : undefined,
          }}
          required
        />
        {errors.address1 && (
          <div
            style={{
              color: "#e53935",
              fontSize: "0.85rem",
              marginTop: 2,
            }}
          >
            {errors.address1}
          </div>
        )}
      </InputWrapper>

      <InputWrapper>
        <InputLabel
          htmlFor="address2"
          $focused={focusedField === "address2"}
          $hasValue={formData.address2.length > 0}
          $theme={{
            colors: { secondary: "#60983E", gray: "#ACACAC" },
          }}
        >
          Apartment, suite, etc. (optional)
        </InputLabel>
        <Input
          id="address2"
          name="address2"
          value={formData.address2}
          onChange={handleInputChange}
          onFocus={() => setFocusedField("address2")}
          onBlur={() => setFocusedField(null)}
          $focused={focusedField === "address2"}
          $theme={{
            colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
          }}
        />
      </InputWrapper>

      <FormRow $columns="1.5fr 1fr 1fr">
        <InputWrapper className={errors.city ? "error-field" : ""}>
          <InputLabel
            htmlFor="city"
            $focused={focusedField === "city"}
            $hasValue={formData.city.length > 0}
            $theme={{
              colors: { secondary: "#60983E", gray: "#ACACAC" },
            }}
          >
            City*
          </InputLabel>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("city")}
            onBlur={() => setFocusedField(null)}
            $focused={focusedField === "city"}
            $theme={{
              colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
            }}
            style={{
              border: errors.city ? "1.5px solid #e53935" : undefined,
            }}
            required
          />
          {errors.city && (
            <div
              style={{
                color: "#e53935",
                fontSize: "0.85rem",
                marginTop: 2,
              }}
            >
              {errors.city}
            </div>
          )}
        </InputWrapper>
        <InputWrapper className={errors.state ? "error-field" : ""}>
          <InputLabel
            htmlFor="state"
            $focused={focusedField === "state"}
            $hasValue={!!formData.state}
            $theme={{
              colors: { secondary: "#60983E", gray: "#ACACAC" },
            }}
          >
            State*
          </InputLabel>
          <Select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            onFocus={() => setFocusedField("state")}
            onBlur={() => setFocusedField(null)}
            $focused={focusedField === "state"}
            $theme={{
              colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
            }}
            style={{
              border: errors.state ? "1.5px solid #e53935" : undefined,
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
        </InputWrapper>
        <InputWrapper className={errors.zipCode ? "error-field" : ""}>
          <InputLabel
            htmlFor="zipCode"
            $focused={focusedField === "zipCode"}
            $hasValue={formData.zipCode.length > 0}
            $theme={{
              colors: { secondary: "#60983E", gray: "#ACACAC" },
            }}
          >
            ZIP code*
          </InputLabel>
          <Input
            id="zipCode"
            name="zipCode"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={formData.zipCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").substring(0, 6);
              handleInputChange({
                target: {
                  name: "zipCode",
                  value,
                },
              });
            }}
            onFocus={() => setFocusedField("zipCode")}
            onBlur={() => setFocusedField(null)}
            $focused={focusedField === "zipCode"}
            $theme={{
              colors: {
                secondary: "#60983E",
                gray_lite: "#AFAFAF",
              },
            }}
            style={{
              border: errors.zipCode ? "1.5px solid #e53935" : undefined,
            }}
            required
          />
          {errors.zipCode && (
            <div
              style={{
                color: "#e53935",
                fontSize: "0.85rem",
                marginTop: 2,
              }}
            >
              {errors.zipCode}
            </div>
          )}
        </InputWrapper>
      </FormRow>

      <InputWrapper className={errors.phone ? "error-field" : ""}>
        <InputLabel
          htmlFor="phone"
          $focused={focusedField === "phone"}
          $hasValue={formData.phone.length > 0}
          $theme={{
            colors: { secondary: "#60983E", gray: "#ACACAC" },
          }}
        >
          Phone Number*
        </InputLabel>
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").substring(0, 10);
            handleInputChange({
              target: {
                name: "phone",
                value,
              },
            });
          }}
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField(null)}
          $focused={focusedField === "phone"}
          $theme={{
            colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
          }}
          style={{
            border: errors.phone ? "1.5px solid #e53935" : undefined,
          }}
          required
        />
        {errors.phone && (
          <div
            style={{
              color: "#e53935",
              fontSize: "0.85rem",
              marginTop: 2,
            }}
          >
            {errors.phone}
          </div>
        )}
      </InputWrapper>
    </FormSection>
  );
};

export default ShippingSection;
