import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import { useImagePath } from "../context/ImagePathContext";
import { FullPageLoader } from "../components/LoadingComponents";
import { updateCartWithDelay } from "../utils/cartUtils";

import LeftColumnSection from "../components/checkout/LeftColumnSection";
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
  // Ensure zipCode is exactly 5 or 6 digits
  const re = /^\d{5,6}$/;
  return re.test(String(zipCode));
};

const validatePhone = (phone) => {
  // Ensure phone is exactly 10 digits
  const re = /^\d{10}$/;
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
        console.log("No valid cart data found, showing empty cart state");
        // Set cart items to empty array instead of redirecting
        setCartItems([]);

        // Initialize empty cart in storage
        try {
          localStorage.setItem("cartItems", JSON.stringify([]));
          sessionStorage.setItem("cartItems", JSON.stringify([]));
        } catch (error) {
          console.error("Failed to save empty cart data to storage:", error);
        }
      }
    };

    // Process immediately
    processCartData();

    // Also check after a brief delay in case of timing issues
    const timeoutId = setTimeout(() => {
      const currentCartItems = getCartFromMultipleSources();
      if (!currentCartItems || currentCartItems.length === 0) {
        console.log(
          "Secondary check: cart is still empty, showing empty state"
        );
        setCartItems([]);
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
      // If cart becomes empty, update storage but stay on the page
      try {
        // Set empty cart items in state and storage
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
        sessionStorage.setItem("cartItems", JSON.stringify([]));
        console.log("Cart is now empty, updated storage");

        // Dispatch custom event for empty cart
        window.dispatchEvent(
          new CustomEvent("localStorageChange", {
            detail: {
              key: "cartItems",
              newValue: "[]",
            },
          })
        );
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
      newErrors.zipCode = "Please enter a valid ZIP code (5-6 digits only)";
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
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
        newErrors.billingZipCode =
          "Please enter a valid ZIP code (5-6 digits only)";
        isValid = false;
      }

      if (!validatePhone(formData.billingPhone || "")) {
        newErrors.billingPhone = "Please enter a valid 10-digit phone number";
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
    // Only sync shipping to billing when "Same as shipping address" is selected
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
  }, [formData.sameShippingAddress, formData]);

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
              <LeftColumnSection
                formData={formData}
                errors={errors}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleInputChange={handleInputChange}
                navigate={navigate}
                handleShippingChange={handleShippingChange}
                handleFormSubmit={handleFormSubmit}
                cardNumberError={cardNumberError}
                expiryError={expiryError}
                cvvMasked={cvvMasked}
                setFormData={setFormData}
              />

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
