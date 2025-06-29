import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const re = /^\d{5,6}$/;
  return re.test(String(zipCode));
};

const validatePhone = (phone) => {
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

const clearOrderData = (isLoggedIn, currentFormData) => {
  localStorage.removeItem("cartItems");
  sessionStorage.removeItem("cartItems");
  localStorage.removeItem("subscriptionUpgraded");
  localStorage.removeItem("subscriptionSavings");
  sessionStorage.removeItem("checkoutInProgress");

  if (isLoggedIn) {
    const clearedFormData = {
      ...currentFormData,
      cardNumber: "",
      expiry: "",
      cvv: "",
      cardName: "",
      savePaymentInfo: false,
      promoCode: "",
      shippingMethod: "standard",
    };
    localStorage.setItem("checkoutFormData", JSON.stringify(clearedFormData));
    return clearedFormData;
  } else {
    localStorage.removeItem("checkoutFormData");
    return {
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
      expiry: "",
      cvv: "",
      savePaymentInfo: false,
      promoCode: "",
    };
  }
};

// Helper to get cart key for current user
function getCartKey() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  let userKey = null;
  if (isLoggedIn) {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      if (userData && userData.email) {
        userKey = `cartItems_${userData.email}`;
      }
    } catch {}
  }
  return userKey || "cartItems";
}

function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
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
    expiry: "",
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
  const cvvTimerRef = useRef(null);
  const cartInitializedRef = useRef(false);
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
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
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
    if (cartInitializedRef.current) {
      return;
    }

    const getCartFromMultipleSources = () => {
      let cartData = null;

      const navigationState = location.state;
      if (
        navigationState &&
        navigationState.cartItems &&
        navigationState.fromCart
      ) {
        cartData = navigationState.cartItems;
      }

      if (!cartData) {
        const sessionCart = sessionStorage.getItem(getCartKey());
        if (sessionCart) {
          try {
            const parsedSessionCart = JSON.parse(sessionCart);
            if (
              parsedSessionCart &&
              Array.isArray(parsedSessionCart) &&
              parsedSessionCart.length > 0
            ) {
              cartData = parsedSessionCart;
            }
          } catch (error) {
            console.error("Failed to parse sessionStorage cart data:", error);
          }
        }
      }

      if (!cartData) {
        const localCart = localStorage.getItem(getCartKey());
        if (localCart) {
          try {
            const parsedLocalCart = JSON.parse(localCart);
            if (
              parsedLocalCart &&
              Array.isArray(parsedLocalCart) &&
              parsedLocalCart.length > 0
            ) {
              cartData = parsedLocalCart;
            }
          } catch (error) {
            console.error("Failed to parse localStorage cart data:", error);
          }
        }
      }

      return cartData;
    };

    const cartData = getCartFromMultipleSources();

    if (cartData && cartData.length > 0) {
      setCartItems(cartData);

      try {
        localStorage.setItem(getCartKey(), JSON.stringify(cartData));
        sessionStorage.setItem(getCartKey(), JSON.stringify(cartData));
      } catch (error) {
        console.error("Failed to save cart data to storage:", error);
      }

      sessionStorage.removeItem("checkoutInProgress");
    } else {
      setCartItems([]);

      try {
        localStorage.setItem(getCartKey(), JSON.stringify([]));
        sessionStorage.setItem(getCartKey(), JSON.stringify([]));
      } catch (error) {
        console.error("Failed to save empty cart data to storage:", error);
      }
    }

    const savedFormData = localStorage.getItem("checkoutFormData");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = localStorage.getItem("userData");

    let parsedUserData = null;
    if (isLoggedIn && userData) {
      try {
        parsedUserData = JSON.parse(userData);
        console.log("Parsed user data:", parsedUserData);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }

    if (savedFormData) {
      try {
        const parsedFormData = JSON.parse(savedFormData);
        const mergedFormData = { ...parsedFormData };

        if (parsedUserData) {
          if (parsedUserData.email) mergedFormData.email = parsedUserData.email;
          if (parsedUserData.firstName)
            mergedFormData.firstName = parsedUserData.firstName;
          if (parsedUserData.lastName)
            mergedFormData.lastName = parsedUserData.lastName;
          if (parsedUserData.phone) mergedFormData.phone = parsedUserData.phone;
          if (parsedUserData.address)
            mergedFormData.address1 = parsedUserData.address;
          if (parsedUserData.apartment)
            mergedFormData.address2 = parsedUserData.apartment;
          if (parsedUserData.city) mergedFormData.city = parsedUserData.city;
          if (parsedUserData.state) mergedFormData.state = parsedUserData.state;
          if (parsedUserData.country)
            mergedFormData.country = parsedUserData.country;
          if (parsedUserData.zipCode)
            mergedFormData.zipCode = parsedUserData.zipCode;
        }

        setFormData((prev) => ({ ...prev, ...mergedFormData }));
        console.log("Merged form data:", mergedFormData);
      } catch (error) {
        console.error("Failed to parse form data from localStorage", error);
      }
    } else if (parsedUserData) {
      setFormData((prev) => ({
        ...prev,
        email: parsedUserData.email || "",
        firstName: parsedUserData.firstName || "",
        lastName: parsedUserData.lastName || "",
        phone: parsedUserData.phone || "",
        address1: parsedUserData.address || "",
        address2: parsedUserData.apartment || "",
        city: parsedUserData.city || "",
        state: parsedUserData.state || "",
        country: parsedUserData.country || "United States",
        zipCode: parsedUserData.zipCode || "",
      }));
      console.log("Set form data from user data:", {
        email: parsedUserData.email || "",
        firstName: parsedUserData.firstName || "",
        lastName: parsedUserData.lastName || "",
        phone: parsedUserData.phone || "",
        address1: parsedUserData.address || "",
        address2: parsedUserData.apartment || "",
        city: parsedUserData.city || "",
        state: parsedUserData.state || "",
        country: parsedUserData.country || "United States",
        zipCode: parsedUserData.zipCode || "",
      });
    }

    const savedUpgradeStatus = localStorage.getItem("subscriptionUpgraded");
    const savedSavings = localStorage.getItem("subscriptionSavings");
    if (savedUpgradeStatus === "true" && savedSavings) {
      setSubscriptionUpgraded(true);
      setSubscriptionSavings(parseFloat(savedSavings));
    }

    cartInitializedRef.current = true;
  }, [location.state]);

  useEffect(() => {
    const calcSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const oneTimePurchaseTotal = cartItems
      .filter((item) => !item.isSubscription && !item.isDemoProduct)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const discountAmount = couponApplied ? oneTimePurchaseTotal * 0.1 : 0;
    const discountedSubtotal = calcSubtotal - discountAmount;

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

    const calcTax = discountedSubtotal * 0.06;
    const calcTotal = discountedSubtotal + calcShipping + calcTax;

    setSubtotal(calcSubtotal);
    setCouponDiscount(discountAmount);
    setShipping(calcShipping);
    setTax(calcTax);
    setTotal(calcTotal);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, couponApplied, formData.shippingMethod]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = localStorage.getItem("userData");

    let formDataToSave = { ...formData };

    if (isLoggedIn && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.email) formDataToSave.email = parsedUserData.email;
        if (parsedUserData.firstName)
          formDataToSave.firstName = parsedUserData.firstName;
        if (parsedUserData.lastName)
          formDataToSave.lastName = parsedUserData.lastName;
        if (parsedUserData.phone) formDataToSave.phone = parsedUserData.phone;
        if (parsedUserData.address)
          formDataToSave.address1 = parsedUserData.address;
        if (parsedUserData.apartment)
          formDataToSave.address2 = parsedUserData.apartment;
        if (parsedUserData.city) formDataToSave.city = parsedUserData.city;
        if (parsedUserData.state) formDataToSave.state = parsedUserData.state;
        if (parsedUserData.country)
          formDataToSave.country = parsedUserData.country;
        if (parsedUserData.zipCode)
          formDataToSave.zipCode = parsedUserData.zipCode;
      } catch (error) {
        console.error("Failed to parse user data when saving form:", error);
      }
    }

    localStorage.setItem("checkoutFormData", JSON.stringify(formDataToSave));
  }, [formData]);

  const handleShippingChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, shippingMethod: value }));
  };

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

    if (name === "resetForm" && type === "reset") {
      setFormData({
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
        expiry: "",
        cvv: "",
        savePaymentInfo: false,
        promoCode: "",
      });
      return;
    }

    if (name === "promoCode" && couponError) {
      setCouponError("");
    }

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (
        updated.sameShippingAddress &&
        [
          "firstName",
          "lastName",
          "address1",
          "address2",
          "city",
          "state",
          "zipCode",
          "phone",
          "country",
        ].includes(name)
      ) {
        const billingFieldName =
          name === "address1"
            ? "billingAddress1"
            : name === "address2"
            ? "billingAddress2"
            : `billing${name.charAt(0).toUpperCase() + name.slice(1)}`;

        updated[billingFieldName] = value;
      }

      if (name === "sameShippingAddress" && checked) {
        updated.billingFirstName = updated.firstName;
        updated.billingLastName = updated.lastName;
        updated.billingAddress1 = updated.address1;
        updated.billingAddress2 = updated.address2;
        updated.billingCity = updated.city;
        updated.billingState = updated.state;
        updated.billingZipCode = updated.zipCode;
        updated.billingPhone = updated.phone;
        updated.billingCountry = updated.country;
      }

      return updated;
    });
  };

  const updateCartGlobally = async (
    newItems,
    message = "",
    productName = ""
  ) => {
    setIsCartUpdating(true);
    setLoadingMessage(productName ? `${message} ${productName}...` : message);

    localStorage.setItem(getCartKey(), JSON.stringify(newItems));

    const newCartCount = newItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem("cartCount", newCartCount.toString());
    window.dispatchEvent(
      new CustomEvent("cartCountUpdate", {
        detail: { cartCount: newCartCount },
      })
    );

    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("localStorageChange"));

    await new Promise((resolve) => setTimeout(resolve, 500));

    setCartItems(newItems);
    setIsCartUpdating(false);
    setLoadingMessage("");
  };

  const handleRemoveItem = async (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (!itemToRemove) return;

    const newItems = cartItems.filter((item) => item.id !== itemId);
    await updateCartGlobally(
      newItems,
      "Removing",
      itemToRemove.productName || "item"
    );
  };

  const handleCouponRemove = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCouponApplied(false);
    setCouponError("");
    setFormData((prev) => ({ ...prev, promoCode: "" }));
  };

  const handleCouponApply = () => {
    const couponCode = formData.promoCode.trim().toUpperCase();

    setCouponError("");
    setShowCouponSuggestion(false);

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
    const existingItem = cartItems.find((item) => item.isDemoProduct);

    if (existingItem) {
      return;
    }

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

    const updatedCartItems = [...cartItems, demoProduct];

    await updateCartWithDelayLocal(
      updatedCartItems,
      `Adding ${demoProduct.productName}...`
    );
  };

  const handleUpgradeToSubscription = async () => {
    const oneTimePurchaseTotal = cartItems
      .filter((item) => !item.isSubscription && !item.isDemoProduct)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const savings = oneTimePurchaseTotal * 0.15;

    const updatedCartItems = cartItems.map((item) => {
      if (!item.isSubscription && !item.isDemoProduct) {
        return {
          ...item,
          isSubscription: true,
          subscriptionFrequency: deliveryFrequency,
          originalPrice: item.price,
          price: item.price * 0.85,
        };
      }
      return item;
    });

    await updateCartGlobally(updatedCartItems, "Upgrading to subscription...");

    localStorage.setItem("subscriptionUpgraded", "true");
    localStorage.setItem("subscriptionSavings", savings.toString());

    setSubscriptionUpgraded(true);
    setSubscriptionSavings(savings);
  };

  const handleDismissUpgradeSuccess = () => {
    setSubscriptionUpgraded(false);
    setSubscriptionSavings(0);
    localStorage.removeItem("subscriptionUpgraded");
    localStorage.removeItem("subscriptionSavings");
  };

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
    const restoredCartItems = cartItems.map((item) => {
      if (item.isSubscription && item.originalPrice) {
        return {
          ...item,
          isSubscription: false,
          price: item.originalPrice,
          originalPrice: null,
          subscriptionFrequency: null,
        };
      }
      return item;
    });

    await updateCartGlobally(restoredCartItems, "Removing the subscription...");

    localStorage.removeItem("subscriptionUpgraded");
    localStorage.removeItem("subscriptionSavings");

    setSubscriptionUpgraded(false);
    setSubscriptionSavings(0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

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

    setCardNumberError("");
    setExpiryError("");

    if (formData.paymentMethod === "creditCard") {
      if (!validateName(formData.cardName || "")) {
        newErrors.cardName = "Please enter the name on card";
        isValid = false;
      }

      if (!validateCardNumber(formData.cardNumber)) {
        setCardNumberError(
          "For testing, only card number 2222 2222 2222 2222 is accepted."
        );
        isValid = false;
      }

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

      if (formData.cvv.length !== 3) {
        newErrors.cvv = "CVV must be 3 digits";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (!formData.sameShippingAddress) {
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

    if (!isValid) {
      const firstErrorField = document.querySelector(".error-field");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsProcessingOrder(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderData = {
        cartItems,
        formData,
        subtotal,
        shipping,
        tax,
        total,
        orderDate: new Date().toISOString(),
        shippingMethod: getShippingMethodName(formData.shippingMethod),
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));
      localStorage.setItem("orderCompleted", "true");

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (isLoggedIn) {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");

        if (userData.email && allUsers[userData.email]) {
          const newOrder = {
            id: `ORDER-${Date.now()}`,
            date: new Date().toLocaleDateString(),
            total: total.toFixed(2),
            items: cartItems,
            shippingMethod: getShippingMethodName(formData.shippingMethod),
            shippingAddress: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address1: formData.address1,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              phone: formData.phone,
            },
          };

          if (!allUsers[userData.email].orders) {
            allUsers[userData.email].orders = [];
          }
          allUsers[userData.email].orders.unshift(newOrder); // Add to beginning

          allUsers[userData.email] = {
            ...allUsers[userData.email],
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address1,
            apartment: formData.address2,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zipCode: formData.zipCode,
            phone: formData.phone,
          };

          localStorage.setItem("allUsers", JSON.stringify(allUsers));
          localStorage.setItem(
            "userData",
            JSON.stringify(allUsers[userData.email])
          );
        }
      }

      const updatedFormData = clearOrderData(isLoggedIn, formData);

      localStorage.setItem("cartCount", "0");
      window.dispatchEvent(
        new CustomEvent("cartCountUpdate", {
          detail: { cartCount: 0 },
        })
      );

      setCartItems([]);
      setSubtotal(0);
      setShipping(0);
      setTax(0);
      setTotal(0);
      setCouponApplied(false);
      setCouponDiscount(0);
      setCouponError("");
      setShowCouponSuggestion(true);
      setSubscriptionUpgraded(false);
      setSubscriptionSavings(0);
      setCvvMasked("");

      setFormData(updatedFormData);

      setErrors({
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
      setCardNumberError("");
      setExpiryError("");

      setIsProcessingOrder(false);

      setTimeout(() => {
        navigate("/thank-you");
      }, 100);
    } catch (error) {
      console.error("Order processing error:", error);
      setIsProcessingOrder(false);
    }
  };

  useEffect(() => {
    if (cvvTimerRef.current) {
      clearTimeout(cvvTimerRef.current);
      cvvTimerRef.current = null;
    }

    if (formData.cvv.length === 0) {
      setCvvMasked("");
      return;
    }

    setCvvMasked(
      "*".repeat(formData.cvv.length - 1) +
        (formData.cvv.length > 0 ? formData.cvv[formData.cvv.length - 1] : "")
    );

    const timer = setTimeout(() => {
      setCvvMasked("*".repeat(formData.cvv.length));
    }, 1000);

    cvvTimerRef.current = timer;

    return () => {
      clearTimeout(timer);
    };
  }, [formData.cvv]);

  const hasOneTimePurchaseProducts = cartItems.some(
    (item) => !item.isSubscription && !item.isDemoProduct
  );

  const oneTimePurchaseProducts = cartItems.filter(
    (item) => !item.isSubscription && !item.isDemoProduct
  );

  const hasDemoProduct = cartItems.some((item) => item.isDemoProduct);

  const calculateSavings = () => {
    const oneTimeTotal = oneTimePurchaseProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return (oneTimeTotal * 0.2).toFixed(2);
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        const parsedItems = JSON.parse(savedCartItems);
        setCartItems(parsedItems);
      }
    };

    window.addEventListener("cartUpdate", handleCartUpdate);
    window.addEventListener("storage", (e) => {
      if (e.key === "cartItems") {
        handleCartUpdate();
      }
    });

    return () => {
      window.removeEventListener("cartUpdate", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FullPageLoader
        isVisible={isCartUpdating}
        message={loadingMessage || "Updating Cart"}
        subtext="Please wait while we process your changes..."
      />

      <FullPageLoader
        isVisible={isProcessingOrder}
        message="Processing Your Order"
        subtext="Please wait while we complete your purchase..."
      />

      <CheckoutContainer>
        <Container>
          <form onSubmit={(e) => e.preventDefault()}>
            <CheckoutLayout>
              <LeftColumnSection
                formData={formData}
                errors={errors}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleInputChange={handleInputChange}
                handleShippingChange={handleShippingChange}
                handleFormSubmit={handleFormSubmit}
                cardNumberError={cardNumberError}
                expiryError={expiryError}
                cvvMasked={cvvMasked}
                setFormData={setFormData}
                subtotal={subtotal}
              />

              <OrderSummarySection
                cartItems={cartItems}
                imagePath={imagePath}
                handleRemoveItem={handleRemoveItem}
                couponApplied={couponApplied}
                couponDiscount={couponDiscount}
                formData={formData}
                handleCouponApply={handleCouponApply}
                handleCouponRemove={handleCouponRemove}
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
