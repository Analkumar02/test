import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import { Icon } from "@iconify/react";

const PageWrapper = styled.div`
  padding: 4rem 0;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const AuthContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "#22465d" : "transparent")};
  color: ${(props) => (props.$active ? "#22465d" : "#777")};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? "#22465d" : "#333")};
  }
`;

const FormContainer = styled.div`
  padding: 2rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const InputLabel = styled.label`
  position: absolute;
  left: 0.75rem;
  top: ${(props) => (props.$focused || props.$hasValue ? "-0.5rem" : "50%")};
  transform: translateY(
    ${(props) => (props.$focused || props.$hasValue ? "0" : "-50%")}
  );
  background-color: #fff;
  padding: 0 0.25rem;
  font-size: ${(props) =>
    props.$focused || props.$hasValue ? "0.75rem" : "0.9rem"};
  color: ${(props) => (props.$focused ? "#22465d" : "#777")};
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$focused ? "#22465d" : "#ddd")};
  border-radius: 4px;
  font-size: 1rem;
  transition: border 0.2s ease;
  outline: none;

  &:focus {
    border-color: #22465d;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #154a6b 100%
  );
  color: #fff;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: 14px 24px;
  border-radius: 12px;
  text-transform: capitalize;
  text-decoration: none;
  border: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;
  margin-top: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(29, 62, 87, 0.3),
      0 4px 12px rgba(29, 62, 87, 0.2);
    background: linear-gradient(
      135deg,
      #1a4a6b 0%,
      ${({ theme }) => theme.colors.primary} 100%
    );
    color: ${({ theme }) => theme.colors.white};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 991px) {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 10px;
  }
`;

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: 0.5rem;

  a {
    color: #22465d;
    font-size: 0.9rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e1e1e1;
  }

  span {
    padding: 0 10px;
    color: #777;
    font-size: 0.9rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9f9f9;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  color: #777;
  text-align: center;
  margin-top: 1.5rem;
`;

const BackToStore = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: #22465d;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");
  const [focusedField, setFocusedField] = useState(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Check if user exists with this email
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
    const user = allUsers[loginForm.email];

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userData", JSON.stringify(user));
      // Redirect to current page or checkout
      const previousPath = location.state?.from?.pathname || "/";
      navigate(previousPath === "/login" ? "/" : previousPath);
    } else {
      alert("User not found. Please sign up first.");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Validate password length
    if (signupForm.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Check if user already exists with this email
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");

    if (allUsers[signupForm.email]) {
      alert("User with this email already exists. Please login instead.");
      return;
    }

    // Generate unique user ID
    const userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

    const newUser = {
      userId,
      email: signupForm.email,
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      address: "",
      apartment: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      orders: [],
    };

    // Save user to all users list (using email as key for easy lookup)
    allUsers[signupForm.email] = newUser;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    // Login the user
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(newUser));

    // Redirect to current page or home
    const previousPath = location.state?.from?.pathname || "/";
    navigate(previousPath === "/login" ? "/" : previousPath);
  };

  return (
    <PageWrapper>
      <Container>
        <AuthContainer>
          <TabContainer>
            <Tab
              $active={activeTab === "login"}
              onClick={() => setActiveTab("login")}
            >
              Login
            </Tab>
            <Tab
              $active={activeTab === "signup"}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </Tab>
          </TabContainer>

          <FormContainer>
            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit}>
                <FormTitle>Welcome Back</FormTitle>

                <InputWrapper>
                  <InputLabel
                    htmlFor="login-email"
                    $focused={focusedField === "login-email"}
                    $hasValue={loginForm.email.length > 0}
                  >
                    Email
                  </InputLabel>
                  <Input
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    onFocus={() => setFocusedField("login-email")}
                    onBlur={() => setFocusedField(null)}
                    $focused={focusedField === "login-email"}
                    required
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel
                    htmlFor="login-password"
                    $focused={focusedField === "login-password"}
                    $hasValue={loginForm.password.length > 0}
                  >
                    Password
                  </InputLabel>
                  <Input
                    id="login-password"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    onFocus={() => setFocusedField("login-password")}
                    onBlur={() => setFocusedField(null)}
                    $focused={focusedField === "login-password"}
                    required
                  />
                </InputWrapper>

                <ForgotPassword>
                  <Link to="/forgot-password">Forgot password?</Link>
                </ForgotPassword>

                <SubmitButton type="submit">Login</SubmitButton>

                <Divider>
                  <span>OR</span>
                </Divider>

                <SocialButtons>
                  <SocialButton type="button">
                    <Icon icon="logos:facebook" width="20" height="20" />
                    Facebook
                  </SocialButton>
                  <SocialButton type="button">
                    <Icon icon="devicon:google" width="20" height="20" />
                    Google
                  </SocialButton>
                </SocialButtons>

                <Disclaimer>
                  By logging in, you agree to our Terms of Service and Privacy
                  Policy.
                </Disclaimer>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                <FormTitle>Create an Account</FormTitle>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <InputWrapper>
                    <InputLabel
                      htmlFor="signup-firstName"
                      $focused={focusedField === "signup-firstName"}
                      $hasValue={signupForm.firstName.length > 0}
                    >
                      First Name
                    </InputLabel>
                    <Input
                      id="signup-firstName"
                      type="text"
                      name="firstName"
                      value={signupForm.firstName}
                      onChange={handleSignupChange}
                      onFocus={() => setFocusedField("signup-firstName")}
                      onBlur={() => setFocusedField(null)}
                      $focused={focusedField === "signup-firstName"}
                      required
                    />
                  </InputWrapper>

                  <InputWrapper>
                    <InputLabel
                      htmlFor="signup-lastName"
                      $focused={focusedField === "signup-lastName"}
                      $hasValue={signupForm.lastName.length > 0}
                    >
                      Last Name
                    </InputLabel>
                    <Input
                      id="signup-lastName"
                      type="text"
                      name="lastName"
                      value={signupForm.lastName}
                      onChange={handleSignupChange}
                      onFocus={() => setFocusedField("signup-lastName")}
                      onBlur={() => setFocusedField(null)}
                      $focused={focusedField === "signup-lastName"}
                      required
                    />
                  </InputWrapper>
                </div>

                <InputWrapper>
                  <InputLabel
                    htmlFor="signup-email"
                    $focused={focusedField === "signup-email"}
                    $hasValue={signupForm.email.length > 0}
                  >
                    Email
                  </InputLabel>
                  <Input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    onFocus={() => setFocusedField("signup-email")}
                    onBlur={() => setFocusedField(null)}
                    $focused={focusedField === "signup-email"}
                    required
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel
                    htmlFor="signup-password"
                    $focused={focusedField === "signup-password"}
                    $hasValue={signupForm.password.length > 0}
                  >
                    Password
                  </InputLabel>
                  <Input
                    id="signup-password"
                    type="password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    onFocus={() => setFocusedField("signup-password")}
                    onBlur={() => setFocusedField(null)}
                    $focused={focusedField === "signup-password"}
                    required
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputLabel
                    htmlFor="signup-confirmPassword"
                    $focused={focusedField === "signup-confirmPassword"}
                    $hasValue={signupForm.confirmPassword.length > 0}
                  >
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="signup-confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    onFocus={() => setFocusedField("signup-confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    $focused={focusedField === "signup-confirmPassword"}
                    required
                  />
                </InputWrapper>

                <SubmitButton type="submit">Create Account</SubmitButton>

                <Divider>
                  <span>OR</span>
                </Divider>

                <SocialButtons>
                  <SocialButton type="button">
                    <Icon icon="logos:facebook" width="20" height="20" />
                    Facebook
                  </SocialButton>
                  <SocialButton type="button">
                    <Icon icon="devicon:google" width="20" height="20" />
                    Google
                  </SocialButton>
                </SocialButtons>

                <Disclaimer>
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </Disclaimer>
              </form>
            )}
          </FormContainer>
        </AuthContainer>

        <BackToStore to="/">← Back to store</BackToStore>
      </Container>
    </PageWrapper>
  );
}

export default Login;
