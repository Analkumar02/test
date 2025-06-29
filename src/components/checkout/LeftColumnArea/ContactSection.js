import React from "react";
import { useNavigate } from "react-router-dom";
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

const LoggedInInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.body};
`;

const LogoutLink = styled.a`
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
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userData = localStorage.getItem("userData");
  let parsedUserData = null;

  if (isLoggedIn && userData) {
    try {
      parsedUserData = JSON.parse(userData);
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    localStorage.removeItem("checkoutFormData");
    // Clear the form data by calling the parent's handler
    if (handleInputChange) {
      // Reset form to initial state
      const resetEvent = {
        target: {
          name: "resetForm",
          value: true,
          type: "reset",
        },
      };
      handleInputChange(resetEvent);
    }
    window.location.reload();
  };

  return (
    <FormSection>
      <SectionHeader>
        <SectionTitle>Contact</SectionTitle>
        {isLoggedIn && parsedUserData ? (
          <LoggedInInfo>
            <span>Welcome, {parsedUserData.firstName || "User"}</span>
            <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
          </LoggedInInfo>
        ) : (
          <LoginLink onClick={() => navigate("/login")}>Login</LoginLink>
        )}
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
          disabled={isLoggedIn && parsedUserData && parsedUserData.email}
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
        {isLoggedIn && parsedUserData && parsedUserData.email && (
          <div
            style={{
              color: "#60983E",
              fontSize: "0.85rem",
              marginTop: 2,
            }}
          >
            Using your registered email address
          </div>
        )}
      </InputWrapper>
    </FormSection>
  );
};

export default ContactSection;
