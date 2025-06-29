import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import { useImagePath } from "../context/ImagePathContext";
import { FullPageLoader } from "../components/LoadingComponents";
import { updateCartWithDelay } from "../utils/cartUtils";

import ExpressCheckout from "../components/checkout/LeftColumnArea/ExpressCheckout";
import OrderSummarySection from "../components/checkout/OrderSummarySection";

const CheckoutContainer = styled.div`
  padding: 80px 0;
  margin: 0 auto;
  @media (max-width: 991px) {
    padding: 40px 0;
  }
  @media (max-width: 767px) {
    padding: 20px;
  }
`;

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LeftColumn = styled.div`
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 1rem;
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

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.75rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr !important;
    gap: 0.75rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 0.75rem;

  ${FormRow} & {
    margin-bottom: 0;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 0.75rem;
  top: ${(props) => (props.$focused || props.$hasValue ? "-0.5rem" : "50%")};
  transform: translateY(
    ${(props) => (props.$focused || props.$hasValue ? "0" : "-50%")}
  );
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 0.25rem;
  font-size: ${(props) =>
    props.$focused || props.$hasValue ? "0.75rem" : "0.9rem"};
  color: ${(props) => (props.$focused ? "#333" : "#777")};
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border 0.2s ease;
  outline: none;
  background: #fff;

  &:focus {
    border-color: #333;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border 0.2s ease;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.85em;
  background-color: #fff;

  &:focus {
    border-color: #333;
  }
`;

const ShippingMethodGroup = styled.div`
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  background: #fff;
`;

const ShippingOption = styled.label`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px;
  background: ${({ selected }) => (selected ? "#FBFBF5" : "#fff")};
  border: ${({ selected }) =>
    selected ? "1.5px solid #60983E" : "1px solid #E0E0E0"};
  position: relative;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, border 0.2s;
  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const CustomRadio = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 1.25rem;
  margin-top: 2px;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? "#60983E" : "#C4C4C4")};
  background: #fff;
  position: relative;
  flex-shrink: 0;
  &::after {
    content: "";
    display: ${({ selected }) => (selected ? "block" : "none")};
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background: #60983e;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ButtonBase = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #154a6b 100%
  );
  color: #fff;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: 1.25rem;
  border-radius: 12px;
  text-transform: capitalize;
  border: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

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

  &:disabled {
    background: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;

const PlaceOrderButton = styled(ButtonBase)`
  margin-top: 1.5rem;
`;

// Payment Section styled like Shipping Options
const PaymentMethodGroup = ShippingMethodGroup;
const PaymentOption = ShippingOption;
const PaymentCustomRadio = CustomRadio;

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

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}

function isExpiryValid(expiry) {
  if (!expiry || expiry.length < 5) return false;

  const [mm, yy] = expiry.split("/");
  if (!mm || !yy) return false;

  const month = parseInt(mm, 10);
  const year = 2000 + parseInt(yy, 10);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;

  const now = new Date();
  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();
  const maxYear = thisYear + 100;

  if (year < thisYear) return false;
  if (year > maxYear) return false;
  if (year === thisYear && month < thisMonth) return false;

  return true;
}

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateZipCode = (zipCode) => {
  const re = /^\d{5}(-\d{4})?$/;
  return re.test(String(zipCode));
};

const validatePhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(String(phone));
};

const validateName = (name) => {
  return name.trim().length >= 2;
};

const validateAddress = (address) => {
  return address.trim().length >= 5;
};

const validateCity = (city) => {
  return city.trim().length >= 2;
};

const validateState = (state) => {
  return state.trim().length > 0;
};

const validateCardNumber = (cardNumber) => {
  const cleanCardNum = cardNumber.replace(/\s/g, "");
  return cleanCardNum === "2222222222222222";
};

function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const imagePath = useImagePath();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    sameShippingAddress: true,
    shippingMethod: "standard",
    paymentMethod: "creditCard",
    cardName: "",
    cardNumber: "",
    expiry: "", // Added missing expiry field
    cvv: "",
    savePaymentInfo: false,
    promoCode: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [cvvMasked, setCvvMasked] = useState("");
  const [cvvTimer, setCvvTimer] = useState(null);
  const [cardNumberError, setCardNumberError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [showCouponSuggestion, setShowCouponSuggestion] = useState(true);
  const [expiryError, setExpiryError] = useState("");
  const [deliveryFrequency, setDeliveryFrequency] = useState("30");
  const [subscriptionUpgraded, setSubscriptionUpgraded] = useState(false);
  const [subscriptionSavings, setSubscriptionSavings] = useState(0);
  const [isCartUpdating, setIsCartUpdating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    billingFirstName: "",
    billingLastName: "",
    billingAddress1: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingPhone: "",
    cardName: "",
    cvv: "",
  });

  useEffect(() => {
    console.log("CheckOut component useEffect triggered");

    // Get cart data from multiple sources
    const getCartFromMultipleSources = () => {
      let cartData = null;

      // First, try to get from navigation state (most reliable for direct navigation)
      if (
        location.state &&
        location.state.cartItems &&
        location.state.fromCart
      ) {
        console.log(
          "Found cart data in navigation state:",
          location.state.cartItems
        );
        cartData = location.state.cartItems;
      }

      // If not found, try sessionStorage (backup for React StrictMode issues)
      if (!cartData) {
        const sessionCart = sessionStorage.getItem("cartItems");
        if (sessionCart) {
          try {
            const parsedSessionCart = JSON.parse(sessionCart);
            if (
              parsedSessionCart &&
              Array.isArray(parsedSessionCart) &&
              parsedSessionCart.length > 0
            ) {
              console.log(
                "Found cart data in sessionStorage:",
                parsedSessionCart
              );
              cartData = parsedSessionCart;
            }
          } catch (error) {
            console.error("Failed to parse sessionStorage cart data:", error);
          }
        }
      }

      // Finally, try localStorage
      if (!cartData) {
        const localCart = localStorage.getItem("cartItems");
        if (localCart) {
          try {
            const parsedLocalCart = JSON.parse(localCart);
            if (
              parsedLocalCart &&
              Array.isArray(parsedLocalCart) &&
              parsedLocalCart.length > 0
            ) {
              console.log("Found cart data in localStorage:", parsedLocalCart);
              cartData = parsedLocalCart;
            }
          } catch (error) {
            console.error("Failed to parse localStorage cart data:", error);
          }
        }
      }

      return cartData;
    };

    const processCartData = () => {
      const cartData = getCartFromMultipleSources();

      if (cartData && cartData.length > 0) {
        console.log("Valid cart found, setting cart items:", cartData);
        setCartItems(cartData);

        // Ensure data is saved to both storages for consistency
        try {
          localStorage.setItem("cartItems", JSON.stringify(cartData));
          sessionStorage.setItem("cartItems", JSON.stringify(cartData));
        } catch (error) {
          console.error("Failed to save cart data to storage:", error);
        }

        // Clear checkout progress flag
        sessionStorage.removeItem("checkoutInProgress");
      } else {
        console.log("No valid cart data found, redirecting to home");
        // Add a small delay before redirecting to ensure this isn't a timing issue
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    };

    // Process immediately
    processCartData();

    // Also check after a brief delay in case of timing issues
    const timeoutId = setTimeout(() => {
      const currentCartItems = getCartFromMultipleSources();
      if (!currentCartItems || currentCartItems.length === 0) {
        console.log("Secondary check: cart is still empty, redirecting");
        navigate("/");
      }
    }, 200);

    const savedFormData = localStorage.getItem("checkoutFormData");
    if (savedFormData) {
      try {
        const parsedFormData = JSON.parse(savedFormData);
        setFormData((prev) => ({ ...prev, ...parsedFormData }));
      } catch (error) {
        console.error("Failed to parse form data from localStorage", error);
      }
    }

    // Check for persisted upgrade status
    const savedUpgradeStatus = localStorage.getItem("subscriptionUpgraded");
    const savedSavings = localStorage.getItem("subscriptionSavings");
    if (savedUpgradeStatus === "true" && savedSavings) {
      setSubscriptionUpgraded(true);
      setSubscriptionSavings(parseFloat(savedSavings));
    }

    return () => clearTimeout(timeoutId);
  }, [navigate, location.state]);

  useEffect(() => {
    const calcSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Calculate discount only for one-time purchase products (not subscriptions or demo products)
    const oneTimePurchaseTotal = cartItems
      .filter((item) => !item.isSubscription && !item.isDemoProduct)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const discountAmount = couponApplied ? oneTimePurchaseTotal * 0.1 : 0;
    const discountedSubtotal = calcSubtotal - discountAmount;

    // Calculate shipping based on selected method and free shipping thresholds
    let calcShipping = 0;
    switch (formData.shippingMethod) {
      case "standard":
        calcShipping = discountedSubtotal >= 75 ? 0 : 8.99;
        break;
      case "twoDayAir":
        calcShipping = discountedSubtotal >= 100 ? 0 : 12.99;
        break;
      case "nextDay":
        calcShipping = 22.99;
        break;
      default:
        calcShipping = discountedSubtotal >= 75 ? 0 : 8.99;
    }

    const calcTax = discountedSubtotal * 0.08;
    const calcTotal = discountedSubtotal + calcShipping + calcTax;

    setSubtotal(calcSubtotal);
    setCouponDiscount(discountAmount);
    setShipping(calcShipping);
    setTax(calcTax);
    setTotal(calcTotal);

    // Save cart items to localStorage whenever they change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, couponApplied, formData.shippingMethod]);

  useEffect(() => {
    localStorage.setItem("checkoutFormData", JSON.stringify(formData));
  }, [formData]);

  const handleShippingChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, shippingMethod: value }));
  };

  // Helper function to get shipping method display name
  const getShippingMethodName = (method) => {
    switch (method) {
      case "standard":
        return "Standard Ground";
      case "twoDayAir":
        return "2nd Day Air";
      case "nextDay":
        return "Next Day";
      default:
        return "Standard Ground";
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear coupon error when user starts typing in the coupon field
    if (name === "promoCode" && couponError) {
      setCouponError("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRemoveItem = async (itemId) => {
    const newItems = cartItems.filter((item) => item.id !== itemId);

    if (newItems.length === 0) {
      // If cart becomes empty, clear storage and navigate
      try {
        localStorage.removeItem("cartItems");
        sessionStorage.removeItem("cartItems");
        console.log("Cart is now empty, removed from storage");

        // Dispatch custom event for empty cart
        window.dispatchEvent(
          new CustomEvent("localStorageChange", {
            detail: {
              key: "cartItems",
              newValue: "[]",
            },
          })
        );

        // Navigate back to home after a short delay
        setTimeout(() => {
          navigate("/");
        }, 100);
      } catch (error) {
        console.error("Error updating cart storage:", error);
      }
    } else {
      // Update cart with loading animation
      await updateCartWithDelayLocal(newItems, "Removing item...");
    }
  };

  const handleCouponApply = () => {
    const couponCode = formData.promoCode.trim().toUpperCase();

    // Reset states
    setCouponError("");
    setShowCouponSuggestion(false);

    // Check if coupon code is valid (you can customize this logic)
    if (couponCode === "SAVE10" || couponCode === "DISCOUNT10") {
      setCouponApplied(true);
      setCouponError("");
    } else if (couponCode === "") {
      setCouponError("Please enter a coupon code.");
      setShowCouponSuggestion(true);
    } else {
      setCouponError("Invalid coupon code. Please try a valid code.");
      setShowCouponSuggestion(true);
    }
  };

  const handleAddDemoProduct = async () => {
    // Check if demo product already exists in cart
    const existingItem = cartItems.find((item) => item.isDemoProduct);

    // If demo product already exists, don't add it again
    if (existingItem) {
      console.log("Demo product already exists in cart");
      return;
    }

    // Demo product details
    const demoProduct = {
      id: "demo-perfect-peace",
      productName: "Perfect Peace",
      count: "60ct",
      price: 18.49,
      originalPrice: 36.99,
      quantity: 1,
      thumbnail: "pp-thumb.png",
      isSubscription: false,
      isDemoProduct: true,
    };

    // Add new demo product to cart
    const updatedCartItems = [...cartItems, demoProduct];

    // Update cart with loading animation
    await updateCartWithDelayLocal(updatedCartItems, "Adding demo product...");
  };

  const handleUpgradeToSubscription = async () => {
    // Calculate savings before upgrade
    const oneTimePurchaseTotal = cartItems
      .filter((item) => !item.isSubscription && !item.isDemoProduct)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const savings = oneTimePurchaseTotal * 0.15; // 15% savings

    // Find all one-time purchase products
    const updatedCartItems = cartItems.map((item) => {
      // Only upgrade one-time purchase products (not subscriptions or demo products)
      if (!item.isSubscription && !item.isDemoProduct) {
        return {
          ...item,
          isSubscription: true,
          subscriptionFrequency: deliveryFrequency, // Use the selected delivery frequency
          originalPrice: item.price, // Store the original one-time price
          price: item.price * 0.85, // Apply 15% subscription discount
        };
      }
      return item;
    });

    // Set upgrade success state immediately
    setSubscriptionUpgraded(true);
    setSubscriptionSavings(savings);

    // Store upgrade status in localStorage
    try {
      localStorage.setItem("subscriptionUpgraded", "true");
      localStorage.setItem("subscriptionSavings", savings.toString());
    } catch (error) {
      console.error("Error saving upgrade status:", error);
    }

    // Update cart with loading animation
    await updateCartWithDelayLocal(
      updatedCartItems,
      "Upgrading to subscription..."
    );
  };

  const handleDismissUpgradeSuccess = () => {
    setSubscriptionUpgraded(false);
    setSubscriptionSavings(0);
    localStorage.removeItem("subscriptionUpgraded");
    localStorage.removeItem("subscriptionSavings");
  };

  // Helper function to simulate backend processing and update cart
  const updateCartWithDelayLocal = async (
    updatedCartItems,
    loadingMessage = "Updating cart..."
  ) => {
    try {
      await updateCartWithDelay(
        updatedCartItems,
        setIsCartUpdating,
        setLoadingMessage,
        loadingMessage
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleUndoUpgrade = async () => {
    // Convert subscription products back to one-time purchase
    const updatedCartItems = cartItems.map((item) => {
      if (item.isSubscription && !item.isDemoProduct && item.originalPrice) {
        return {
          ...item,
          isSubscription: false,
          price: item.originalPrice, // Restore original price
          subscriptionFrequency: undefined,
          originalPrice: undefined,
        };
      }
      return item;
    });

    // Clear upgrade success state
    setSubscriptionUpgraded(false);
    setSubscriptionSavings(0);

    // Remove upgrade status from localStorage
    try {
      localStorage.removeItem("subscriptionUpgraded");
      localStorage.removeItem("subscriptionSavings");
    } catch (error) {
      console.error("Error removing upgrade status:", error);
    }

    // Update cart with loading animation
    await updateCartWithDelayLocal(
      updatedCartItems,
      "Reverting subscription..."
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Reset all errors
    const newErrors = {
      email: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      billingFirstName: "",
      billingLastName: "",
      billingAddress1: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      billingPhone: "",
      cardName: "",
      cvv: "",
    };

    let isValid = true;

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate shipping information
    if (!validateName(formData.firstName)) {
      newErrors.firstName = "First name is required (min 2 characters)";
      isValid = false;
    }

    if (!validateName(formData.lastName)) {
      newErrors.lastName = "Last name is required (min 2 characters)";
      isValid = false;
    }

    if (!validateAddress(formData.address1)) {
      newErrors.address1 = "Please enter a valid address";
      isValid = false;
    }

    if (!validateCity(formData.city)) {
      newErrors.city = "Please enter a valid city";
      isValid = false;
    }

    if (!validateState(formData.state)) {
      newErrors.state = "Please select a state";
      isValid = false;
    }

    if (!validateZipCode(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid 5-digit ZIP code";
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Validate billing information if different from shipping
    if (!formData.sameShippingAddress) {
      if (!validateName(formData.billingFirstName || "")) {
        newErrors.billingFirstName =
          "First name is required (min 2 characters)";
        isValid = false;
      }

      if (!validateName(formData.billingLastName || "")) {
        newErrors.billingLastName = "Last name is required (min 2 characters)";
        isValid = false;
      }

      if (!validateAddress(formData.billingAddress1 || "")) {
        newErrors.billingAddress1 = "Please enter a valid address";
        isValid = false;
      }

      if (!validateCity(formData.billingCity || "")) {
        newErrors.billingCity = "Please enter a valid city";
        isValid = false;
      }

      if (!validateState(formData.billingState || "")) {
        newErrors.billingState = "Please select a state";
        isValid = false;
      }

      if (!validateZipCode(formData.billingZipCode || "")) {
        newErrors.billingZipCode = "Please enter a valid 5-digit ZIP code";
        isValid = false;
      }

      if (!validatePhone(formData.billingPhone || "")) {
        newErrors.billingPhone = "Please enter a valid phone number";
        isValid = false;
      }
    }

    // Clear previous card errors
    setCardNumberError("");
    setExpiryError("");

    // Validate payment information
    if (formData.paymentMethod === "creditCard") {
      // Validate card name
      if (!validateName(formData.cardName || "")) {
        newErrors.cardName = "Please enter the name on card";
        isValid = false;
      }

      // Only accept card number 2222222222222222 for testing
      if (!validateCardNumber(formData.cardNumber)) {
        setCardNumberError(
          "For testing, only card number 2222 2222 2222 2222 is accepted."
        );
        isValid = false;
      }

      // Expiry validation
      if (!isExpiryValid(formData.expiry)) {
        const [mm, yy] = (formData.expiry || "").split("/");
        if (mm && yy) {
          const year = 2000 + parseInt(yy, 10);
          const now = new Date();
          const maxYear = now.getFullYear() + 100;
          if (year > maxYear) {
            setExpiryError(`Card expiry year cannot be more than ${maxYear}`);
          } else {
            setExpiryError("Card expiry cannot be in the past");
          }
        } else {
          setExpiryError("Please enter a valid expiry date in MM/YY format");
        }
        isValid = false;
      }

      // CVV validation
      if (formData.cvv.length !== 3) {
        newErrors.cvv = "CVV must be 3 digits";
        isValid = false;
      }
    }

    // Update errors state with validation results
    setErrors(newErrors);

    // Check if billing address fields are required
    if (!formData.sameShippingAddress) {
      // Validate that billing fields are filled out if using different address
      if (
        !formData.billingFirstName ||
        !formData.billingLastName ||
        !formData.billingAddress1 ||
        !formData.billingCity ||
        !formData.billingState ||
        !formData.billingZipCode ||
        !formData.billingPhone
      ) {
        isValid = false;
      }
    }

    // City and state validation already handled above

    // Card number validation already handled above

    if (!isValid) {
      // Smooth scroll to the first error field
      const firstErrorField = document.querySelector(".error-field");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Process order
    // For demo purposes, just clear cart and navigate to thank you page
    localStorage.removeItem("cartItems");
    localStorage.setItem("orderCompleted", "true");

    navigate("/thank-you");
  };

  useEffect(() => {
    if (formData.cvv.length === 0) {
      setCvvMasked("");
      if (cvvTimer) clearTimeout(cvvTimer);
      return;
    }
    setCvvMasked(
      "*".repeat(formData.cvv.length - 1) +
        (formData.cvv.length > 0 ? formData.cvv[formData.cvv.length - 1] : "")
    );
    if (cvvTimer) clearTimeout(cvvTimer);
    const timer = setTimeout(() => {
      setCvvMasked("*".repeat(formData.cvv.length));
    }, 1000);
    setCvvTimer(timer);
    return () => clearTimeout(timer);
  }, [formData.cvv, cvvTimer]);
  useEffect(() => {
    if (formData.sameShippingAddress) {
      setFormData((prev) => ({
        ...prev,
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
  }, [
    formData.sameShippingAddress,
    formData.firstName,
    formData.lastName,
    formData.address1,
    formData.address2,
    formData.city,
    formData.state,
    formData.zipCode,
    formData.phone,
    formData.country,
  ]);

  const BillingAddressGroup = ShippingMethodGroup;
  const BillingOption = ShippingOption;
  const BillingCustomRadio = CustomRadio;

  // Check if there are one-time purchase products in cart (not subscriptions or demo products)
  const hasOneTimePurchaseProducts = cartItems.some(
    (item) => !item.isSubscription && !item.isDemoProduct
  );

  // Get one-time purchase products for upgrade section
  const oneTimePurchaseProducts = cartItems.filter(
    (item) => !item.isSubscription && !item.isDemoProduct
  );

  // Check if demo product is already in cart
  const hasDemoProduct = cartItems.some((item) => item.isDemoProduct);

  // Calculate potential savings from subscription upgrade
  const calculateSavings = () => {
    const oneTimeTotal = oneTimePurchaseProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return (oneTimeTotal * 0.2).toFixed(2); // 20% savings
  };

  return (
    <>
      {/* Loading Overlay */}
      <FullPageLoader
        isVisible={isCartUpdating}
        message={loadingMessage || "Updating Cart"}
        subtext="Please wait while we process your changes..."
      />

      <CheckoutContainer>
        <Container>
          <form onSubmit={handleFormSubmit}>
            <CheckoutLayout>
              <LeftColumn>
                <ExpressCheckout />
                <OrDivider>
                  <span>OR</span>
                </OrDivider>

                <FormSection>
                  <SectionHeader>
                    <SectionTitle>Contact</SectionTitle>
                    <LoginLink onClick={() => navigate("/login")}>
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
                        border: errors.email
                          ? "1.5px solid #e53935"
                          : undefined,
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
                    <InputWrapper
                      className={errors.firstName ? "error-field" : ""}
                    >
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
                          colors: {
                            secondary: "#60983E",
                            gray_lite: "#AFAFAF",
                          },
                        }}
                        style={{
                          border: errors.firstName
                            ? "1.5px solid #e53935"
                            : undefined,
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
                    <InputWrapper
                      className={errors.lastName ? "error-field" : ""}
                    >
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
                          colors: {
                            secondary: "#60983E",
                            gray_lite: "#AFAFAF",
                          },
                        }}
                        style={{
                          border: errors.lastName
                            ? "1.5px solid #e53935"
                            : undefined,
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
                  <InputWrapper
                    className={errors.address1 ? "error-field" : ""}
                  >
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
                        border: errors.address1
                          ? "1.5px solid #e53935"
                          : undefined,
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
                  <FormRow
                    style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}
                  >
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
                          colors: {
                            secondary: "#60983E",
                            gray_lite: "#AFAFAF",
                          },
                        }}
                        style={{
                          border: errors.city
                            ? "1.5px solid #e53935"
                            : undefined,
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
                          colors: {
                            secondary: "#60983E",
                            gray_lite: "#AFAFAF",
                          },
                        }}
                        style={{
                          border: errors.state
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
                    </InputWrapper>
                    <InputWrapper
                      className={errors.zipCode ? "error-field" : ""}
                    >
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
                        value={formData.zipCode}
                        onChange={handleInputChange}
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
                          border: errors.zipCode
                            ? "1.5px solid #e53935"
                            : undefined,
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      $focused={focusedField === "phone"}
                      $theme={{
                        colors: { secondary: "#60983E", gray_lite: "#AFAFAF" },
                      }}
                      style={{
                        border: errors.phone
                          ? "1.5px solid #e53935"
                          : undefined,
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

                <FormSection>
                  <SectionTitle>Shipping method</SectionTitle>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#777",
                      marginBottom: "1rem",
                    }}
                  >
                    Please note: Ground shipping orders may experience a delay
                    of up to 2 days.
                  </div>
                  <ShippingMethodGroup>
                    <ShippingOption
                      selected={formData.shippingMethod === "standard"}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === "standard"}
                        onChange={handleShippingChange}
                        style={{ display: "none" }}
                      />
                      <CustomRadio
                        selected={formData.shippingMethod === "standard"}
                      />
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
                          "$8.99"
                        )}
                      </div>
                    </ShippingOption>
                    <ShippingOption
                      selected={formData.shippingMethod === "twoDayAir"}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="twoDayAir"
                        checked={formData.shippingMethod === "twoDayAir"}
                        onChange={handleShippingChange}
                        style={{ display: "none" }}
                      />
                      <CustomRadio
                        selected={formData.shippingMethod === "twoDayAir"}
                      />
                      <div style={{ flex: 1 }}>
                        <strong>
                          2nd Day Air (Orders placed before 1pm PST)
                        </strong>
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
                          "$12.99"
                        )}
                      </div>
                    </ShippingOption>
                    <ShippingOption
                      selected={formData.shippingMethod === "nextDay"}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="nextDay"
                        checked={formData.shippingMethod === "nextDay"}
                        onChange={handleShippingChange}
                        disabled={false}
                        style={{ display: "none" }}
                      />
                      <CustomRadio
                        selected={formData.shippingMethod === "nextDay"}
                      />
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
                        }}
                      >
                        $22.99
                      </div>
                    </ShippingOption>
                  </ShippingMethodGroup>
                </FormSection>

                <FormSection>
                  <SectionTitle>Payment</SectionTitle>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#777",
                      marginBottom: "1rem",
                    }}
                  >
                    All transactions are secure and encrypted.
                  </div>
                  <PaymentMethodGroup
                    style={{
                      borderRadius: 10,
                      overflow: "visible",
                    }}
                  >
                    <PaymentOption
                      selected={formData.paymentMethod === "creditCard"}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: "creditCard",
                        }))
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
                          formData.paymentMethod === "creditCard"
                            ? "#FBFBF5"
                            : "none",
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
                        src={`${imagePath}creditcards.png`}
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
                              $theme={{
                                colors: {
                                  secondary: "#60983E",
                                  gray: "#ACACAC",
                                },
                              }}
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
                                const raw = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 16);
                                setFormData((prev) => ({
                                  ...prev,
                                  cardNumber: raw,
                                }));
                                setCardNumberError("");
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
                                paddingRight: formData.cardNumber.startsWith(
                                  "2222"
                                )
                                  ? 48
                                  : undefined, // Add space for Visa logo
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
                                src={`${imagePath}visa.png`}
                                alt="Visa"
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
                              $hasValue={
                                formData.expiry && formData.expiry.length > 0
                              }
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
                                const raw = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 4);
                                let formatted = raw;
                                if (raw.length > 2)
                                  formatted =
                                    raw.slice(0, 2) + "/" + raw.slice(2);
                                setFormData((prev) => ({
                                  ...prev,
                                  expiry: formatted,
                                }));
                                setExpiryError("");
                              }}
                              onFocus={() => setFocusedField("expiry")}
                              onBlur={() => {
                                setFocusedField(null);
                                if (formData.expiry) {
                                  const [mm, yy] = (
                                    formData.expiry || ""
                                  ).split("/");
                                  if (mm && yy) {
                                    const year = 2000 + parseInt(yy, 10);
                                    const now = new Date();
                                    const maxYear = now.getFullYear() + 100;
                                    if (!isExpiryValid(formData.expiry)) {
                                      if (year > maxYear) {
                                        setExpiryError(
                                          `Card expiry year cannot be more than ${maxYear}`
                                        );
                                      } else {
                                        setExpiryError(
                                          "Card expiry cannot be in the past"
                                        );
                                      }
                                    } else {
                                      setExpiryError("");
                                    }
                                  }
                                }
                              }}
                              $focused={focusedField === "expiry"}
                              $theme={{
                                colors: {
                                  secondary: "#60983E",
                                  gray_lite: "#AFAFAF",
                                },
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
                              value={
                                focusedField === "cvv"
                                  ? formData.cvv
                                  : cvvMasked
                              }
                              onChange={(e) => {
                                const raw = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 3);
                                setFormData((prev) => ({ ...prev, cvv: raw }));
                                if (focusedField === "cvv") {
                                  setCvvMasked(raw);
                                }
                              }}
                              onFocus={() => {
                                setFocusedField("cvv");
                                setCvvMasked(formData.cvv); // Show real value on focus
                              }}
                              onBlur={() => {
                                setFocusedField(null);
                                // Mask all digits after 1s
                                if (formData.cvv.length > 0) {
                                  setTimeout(() => {
                                    setCvvMasked(
                                      "*".repeat(formData.cvv.length)
                                    );
                                  }, 1000);
                                }
                              }}
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
                                focusedField === "cvv" ||
                                formData.cvv.length > 0
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
                                focusedField === "cardName" ||
                                formData.cardName.length > 0
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
                    <div
                      style={{ borderTop: "1px solid #e0e0e0", margin: 0 }}
                    />
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
                          formData.paymentMethod === "cashOnDelivery"
                            ? "#FBFBF5"
                            : "#none",
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
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sameShippingAddress: true,
                        }))
                      }
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
                        onChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            sameShippingAddress: true,
                          }))
                        }
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
                    {formData.sameShippingAddress ? null : (
                      <div style={{ margin: 0 }} />
                    )}
                    <BillingOption
                      selected={!formData.sameShippingAddress}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sameShippingAddress: false,
                        }))
                      }
                      style={{
                        borderRadius: !formData.sameShippingAddress
                          ? "0"
                          : "0 0 10px 10px",
                        background: !formData.sameShippingAddress
                          ? "#FBFBF5"
                          : "none",
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
                        onChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            sameShippingAddress: false,
                          }))
                        }
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
                    <div
                      style={{
                        padding: "2rem 2rem 1.5rem 2rem",
                        position: "relative",
                        zIndex: 1,
                        animation: "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderRadius: "0 0 10px 10px",
                        marginTop: "-12px",
                        boxShadow: "0 4px 10px rgba(60,72,88,0.15)",
                        border: "1.5px solid #60983E",
                        borderTop: "none",
                        transform: "translateY(0)",
                      }}
                    >
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
                      <InputWrapper
                        className={errors.billingAddress1 ? "error-field" : ""}
                      >
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
                      <FormRow>
                        <InputWrapper
                          className={errors.billingCity ? "error-field" : ""}
                        >
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
                        <InputWrapper
                          className={errors.billingState ? "error-field" : ""}
                        >
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
                      </FormRow>
                      <FormRow>
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
                            value={formData.billingZipCode || ""}
                            onChange={handleInputChange}
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
                      <InputWrapper
                        className={errors.billingPhone ? "error-field" : ""}
                      >
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
                          value={formData.billingPhone || ""}
                          onChange={handleInputChange}
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
                          type="tel"
                          style={{
                            border: errors.billingPhone
                              ? "1.5px solid #e53935"
                              : undefined,
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
                    </div>
                  )}
                </FormSection>

                <PlaceOrderButton type="submit">Place Order</PlaceOrderButton>
              </LeftColumn>

              <OrderSummarySection
                cartItems={cartItems}
                imagePath={imagePath}
                handleRemoveItem={handleRemoveItem}
                couponApplied={couponApplied}
                couponDiscount={couponDiscount}
                formData={formData}
                handleCouponApply={handleCouponApply}
                couponError={couponError}
                showCouponSuggestion={showCouponSuggestion}
                hasDemoProduct={hasDemoProduct}
                handleAddDemoProduct={handleAddDemoProduct}
                subscriptionUpgraded={subscriptionUpgraded}
                subscriptionSavings={subscriptionSavings}
                deliveryFrequency={deliveryFrequency}
                handleDismissUpgradeSuccess={handleDismissUpgradeSuccess}
                hasOneTimePurchaseProducts={hasOneTimePurchaseProducts}
                oneTimePurchaseProducts={oneTimePurchaseProducts}
                calculateSavings={calculateSavings}
                setDeliveryFrequency={setDeliveryFrequency}
                handleUpgradeToSubscription={handleUpgradeToSubscription}
                handleUndoUpgrade={handleUndoUpgrade}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                getShippingMethodName={getShippingMethodName}
              />
            </CheckoutLayout>
          </form>
        </Container>
      </CheckoutContainer>
    </>
  );
}

export default CheckOut;
