import React from "react";
import styled from "styled-components";
import {
  FormSection,
  SectionTitle,
  InputWrapper,
  InputLabel,
  Input,
} from "./FormComponents";

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginLink = styled.a`
  color: ${({ theme }) => theme.colors.body};
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/**
 * ContactSection component handles the email input and login link
 */
const ContactSection = ({
  formData,
  errors,
  focusedField,
  setFocusedField,
  handleInputChange,
}) => {
  return (
    <FormSection>
      <SectionHeader>
        <SectionTitle>Contact</SectionTitle>
        <LoginLink onClick={() => (window.location.hash = "/login")}>
          Login
        </LoginLink>
      </SectionHeader>
      <InputWrapper className={errors.email ? "error-field" : ""}>
        <InputLabel
          htmlFor="email"
          $focused={focusedField === "email"}
          $hasValue={formData.email.length > 0}
          $theme={{
            colors: { secondary: "#60983E", gray: "#ACACAC" },
          }}
        >
          Email
        </InputLabel>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          $focused={focusedField === "email"}
          $theme={{
            colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
          }}
          style={{
            border: errors.email ? "1.5px solid #e53935" : undefined,
          }}
          required
        />
        {errors.email && (
          <div
            style={{
              color: "#e53935",
              fontSize: "0.85rem",
              marginTop: 2,
            }}
          >
            {errors.email}
          </div>
        )}
      </InputWrapper>
    </FormSection>
  );
};

export default ContactSection;
