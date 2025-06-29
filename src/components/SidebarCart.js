import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useImagePath } from "../context/ImagePathContext";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import productData from "../data/product.json";
import { SidebarLoader } from "./LoadingComponents";
import { updateCartWithDelay } from "../utils/cartUtils";

// Animations
const slideIn = keyframes`
  from { transform: translateX(120%); }
  to { transform: translateX(0); }
`;
const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(120%); }
`;

// Mobile Animations
const slideInMobile = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;
const slideOutMobile = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

// Styled Components for removing inline styles
const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 20px 0;
`;

const RemoveItemIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OriginalPriceSpan = styled.span`
  color: #8494a0;
  text-decoration: line-through;
  font-size: 0.95em;
  margin-left: 8px;
`;

// Sidebar Wrapper
const SidebarWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isVisible",
})`
  position: fixed;
  float: right;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  margin: 10px;
  max-width: 500px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 10px;
  max-height: calc(100vh - 20px);
  box-shadow: -2px 0 16px rgba(44, 44, 44, 0.12);
  z-index: 2200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${({ isVisible }) =>
    isVisible
      ? css`
          ${slideIn} 0.3s forwards
        `
      : css`
          ${slideOut} 0.3s forwards
        `};

  @media (max-width: 600px) {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;
    padding: 1rem;
    border-radius: 0;
    box-shadow: none;
    animation: ${({ isVisible }) =>
      isVisible
        ? css`
            ${slideInMobile} 0.3s forwards
          `
        : css`
            ${slideOutMobile} 0.3s forwards
          `};
    overflow-x: hidden;
  }
`;

// Overlay
const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isVisible",
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2100;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
`;

// Header
const CartBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
`;

const CartTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
  }
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.body};
    cursor: pointer;
    line-height: 1;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Progress
const CartHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ShipStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  p {
    font-size: 12px;
  }
`;

const ProgressBar = styled.div`
  background-color: ${({ theme }) => theme.colors.white_lite};
  border-radius: 5px;
  height: 5px;
  width: 100%;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "percent",
})`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  width: ${({ percent }) => percent}%;
  transition: width 0.3s;
  border-radius: 5px;
`;

const CartHeadMsg = styled.p`
  font-size: 12px;
  margin: 0;
  text-align: center;
`;

// Cart Items
const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PrBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 12px 10px 12px 5px;
  background: ${({ theme }) => theme.colors.white};

  /* Styling the scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.white_lite};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
  }
`;

const PrInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PrThumb = styled.div`
  display: flex;
  gap: 10px;
`;

const PrImg = styled.div`
  background-color: ${({ theme }) => theme.colors.white_lite};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  height: 90px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const PrTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PrText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  p {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

// Quantity Box
const QtyBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray_lite};
  border-radius: 5px;
  width: 100px;
  height: 28px;
  overflow: hidden;
  box-sizing: border-box;
  > * {
    flex: 1 1 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    background: ${({ theme }) => theme.colors.white_lite};
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    user-select: none;
    transition: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.body};
    &:active {
      background: none;
    }
  }
  span {
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    user-select: none;
  }
`;

const PrRight = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  font-size: 1rem;
  font-weight: 600;
  gap: 8px;
  svg {
    cursor: pointer;
    margin-bottom: 8px;
  }
`;

const PrPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.body};
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

// Footer
const CartFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CartSubtotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1rem;
`;

const SubtotalPrice = styled.div`
  font-weight: 600;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const CheckoutBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 5px 40px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  text-decoration: none;
  box-sizing: border-box;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;

    &:before {
      height: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:visited {
    color: ${({ theme }) => theme.colors.white};
  }
`;

// Product Suggestions Styled Components

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const SuggestionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white_lite};
  }
`;

const SuggestionImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white_lite};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 5px;
  }
`;

const SuggestionName = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.body};
  margin: 0;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
`;

const SuggestionPrice = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  margin: 4px 0 0 0;
  font-weight: 600;
  text-align: center;
`;

const ProductSubscriptionOption = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 13px;
  padding: 0 5px;
`;

const SubscriptionToggle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.gray_lite};
  padding: 8px 12px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  svg {
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.white_lite};
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SubscriptionDropdown = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  margin-top: 10px;
  width: 100%;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${fadeIn} 0.2s forwards
        `
      : "none"};
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CustomSelect = styled.div`
  position: relative;
  width: 100%;
`;

const SelectHeader = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray_lite};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-top: 5px;

  svg {
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const OptionsContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_lite};
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  animation: ${fadeIn} 0.2s ease;
`;

const Option = styled.div`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.white_lite};
  }

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
    background-color: ${theme?.colors?.primary || "#0066cc"};
    color: white;
    font-weight: 600;
  `}
`;

const SubscriptionSavings = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

// Better Suggestions Component
const SuggestionsSection = styled.div`
  margin-top: 25px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_lite};
  padding-top: 20px;
`;

const SuggestionHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FREE_SHIP_THRESHOLD = 75;
const FAST_SHIP_THRESHOLD = 100;

const SidebarCart = ({ isVisible, onClose, onCartUpdate }) => {
  // Get the image path and navigation hook
  const imagePath = useImagePath();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const [animationState, setAnimationState] = useState(isVisible);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [orgSubtotal, setOrgSubtotal] = useState(0);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isCartUpdating, setIsCartUpdating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingProductName, setLoadingProductName] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  // Subscription state
  const [openSubscription, setOpenSubscription] = useState(null);
  const [openSelect, setOpenSelect] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState({});

  // Modern empty cart alert state
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSelect && !event.target.closest(".custom-select")) {
        setOpenSelect(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSelect]);

  // Function to toggle subscription option visibility
  const toggleSubscription = (itemId) => {
    setOpenSubscription(openSubscription === itemId ? null : itemId);
    // Close select dropdown when toggling subscription visibility
    setOpenSelect(null);
  };

  // Function to toggle select dropdown
  const toggleSelect = (itemId) => {
    setOpenSelect(openSelect === itemId ? null : itemId);
  };

  // Helper function to update cart globally
  const updateCartGlobally = (updatedCart) => {
    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Create and dispatch custom event for global updates
    const event = new CustomEvent("cartUpdate", {
      detail: {
        cartItems: updatedCart,
        count: updatedCart.reduce((total, item) => total + item.quantity, 0),
      },
    });
    window.dispatchEvent(event);

    // Also dispatch localStorage change event for other components
    const storageEvent = new CustomEvent("localStorageChange", {
      detail: {
        key: "cartItems",
        newValue: JSON.stringify(updatedCart),
      },
    });
    window.dispatchEvent(storageEvent);
  };

  // Helper function to simulate backend processing and update cart
  const updateCartWithDelayLocal = async (
    updatedCartItems,
    message = "Updating cart...",
    productName = "",
    action = ""
  ) => {
    try {
      setLoadingProductName(productName);
      setLoadingAction(action || message.split(" ")[0]);
      const displayMessage = productName
        ? `${action || message.split(" ")[0]} ${productName}...`
        : message;
      await updateCartWithDelay(
        updatedCartItems,
        setIsCartUpdating,
        setLoadingMessage,
        displayMessage
      );
      setCartItems(updatedCartItems);
      updateCartGlobally(updatedCartItems);
      setLoadingProductName("");
      setLoadingAction("");
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Function to select delivery option
  const selectDeliveryOption = async (itemId, option) => {
    setSelectedDelivery({
      ...selectedDelivery,
      [itemId]: option,
    });
    setOpenSelect(null);

    const item = cartItems.find((item) => item.id === itemId);
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        const productInfo = productData.find(
          (product) => product.id === itemId
        );
        if (productInfo && productInfo.pricing.subscribeAndSave) {
          return {
            ...cartItem,
            isSubscription: true,
            deliveryOption: option,
            price: productInfo.pricing.subscribeAndSave.discountedPrice,
            originalPrice: productInfo.pricing.oneTimePurchase.price,
          };
        }
      }
      return cartItem;
    });

    await updateCartWithDelayLocal(
      updatedItems,
      `Upgrading to subscription for`,
      item.productName
    );
  };

  // Function to remove subscription and revert to one-time purchase
  const removeSubscription = async (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        const productInfo = productData.find(
          (product) => product.id === itemId
        );
        if (productInfo) {
          return {
            ...cartItem,
            isSubscription: false,
            deliveryOption: null,
            price: productInfo.pricing.oneTimePurchase.price,
            originalPrice: null,
          };
        }
      }
      return cartItem;
    });

    await updateCartWithDelayLocal(
      updatedItems,
      `Removing subscription from`,
      item.productName
    );

    const newSelectedDelivery = { ...selectedDelivery };
    delete newSelectedDelivery[itemId];
    setSelectedDelivery(newSelectedDelivery);
  };

  // Track visibility changes to manage animation state
  useEffect(() => {
    if (isVisible) {
      setAnimationState(true);
    } else {
      // When closing, delay the actual state change until animation completes
      const timer = setTimeout(() => {
        setAnimationState(false);
      }, 300); // Match this to your animation duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Close on outside click
  useEffect(() => {
    if (!isVisible) return;
    const handleClick = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isVisible, onClose]);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);

        // Calculate the initial cart count when loading from localStorage
        const initialCartCount = parsedCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        if (onCartUpdate) {
          onCartUpdate(initialCartCount);
        }
      } catch (error) {
        console.error("Failed to parse cart data:", error);
        setCartItems([]);
        if (onCartUpdate) {
          onCartUpdate(0);
        }
      }
    } else {
      setCartItems([]);
      if (onCartUpdate) {
        onCartUpdate(0);
      }
    }
  }, [isVisible, onCartUpdate]);

  // Listen for localStorage changes to keep sidebar cart in sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cartItems") {
        try {
          const updatedCart = JSON.parse(e.newValue || "[]");
          setCartItems(updatedCart);

          // Calculate the updated cart count
          const updatedCartCount = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );
          if (onCartUpdate) {
            onCartUpdate(updatedCartCount);
          }
        } catch (error) {
          console.error("Error parsing updated cart from localStorage:", error);
        }
      }
    };

    // Listen for storage events (changes from other tabs/components)
    window.addEventListener("storage", handleStorageChange);

    // For same-page updates, we need a custom event
    const handleCustomStorageChange = (e) => {
      if (e.detail && e.detail.key === "cartItems") {
        try {
          const updatedCart = JSON.parse(e.detail.newValue || "[]");
          setCartItems(updatedCart);

          // Calculate the updated cart count
          const updatedCartCount = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );
          if (onCartUpdate) {
            onCartUpdate(updatedCartCount);
          }
        } catch (error) {
          console.error("Error parsing updated cart from custom event:", error);
        }
      }
    };

    window.addEventListener("localStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange
      );
    };
  }, [onCartUpdate]);

  // Listen for global cart updates
  useEffect(() => {
    const handleCartUpdate = (e) => {
      if (e.detail && e.detail.cartItems) {
        setCartItems(e.detail.cartItems);
        if (onCartUpdate) {
          onCartUpdate(e.detail.count);
        }
      }
    };

    window.addEventListener("cartUpdate", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, [onCartUpdate]);

  // Calculate totals when items change
  useEffect(() => {
    let subtotalSum = 0;
    let orgSubtotalSum = 0;

    cartItems.forEach((item) => {
      subtotalSum += item.price * item.quantity;
      if (item.originalPrice) {
        orgSubtotalSum += item.originalPrice * item.quantity;
      } else {
        orgSubtotalSum += item.price * item.quantity;
      }
    });

    setSubtotal(subtotalSum);
    setOrgSubtotal(orgSubtotalSum);

    // Calculate total quantity of items in cart and update the header
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Notify parent component about cart update if callback exists
    if (onCartUpdate) {
      onCartUpdate(totalQuantity);
    }

    // Also store the cart count in localStorage for persisting between page loads
    localStorage.setItem("cartCount", totalQuantity.toString());
  }, [cartItems, onCartUpdate]);

  // Generate random product suggestions when cart items change
  useEffect(() => {
    const generateSuggestions = () => {
      // Get IDs of items already in the cart
      const cartItemIds = cartItems.map((item) => item.id);

      // Filter out products that are already in the cart
      const availableProducts = productData.filter(
        (product) => !cartItemIds.includes(product.id)
      );

      // If we have at least 2 products to suggest
      if (availableProducts.length >= 2) {
        // Shuffle the available products
        const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());

        // Take the first 2 products
        const selected = shuffled.slice(0, 2).map((product) => ({
          id: product.id,
          productName: product.productName,
          thumbnail: product.thumbnail,
          price: product.pricing.oneTimePurchase.price,
        }));

        setSuggestedProducts(selected);
      } else {
        // Not enough products to suggest
        setSuggestedProducts([]);
      }
    };

    generateSuggestions();
  }, [cartItems]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((item) => item.id === itemId);
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
    );

    await updateCartWithDelayLocal(
      updatedItems,
      `Updating quantity for`,
      item.productName
    );
  };

  const handleRemoveItem = async (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    const updatedItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    await updateCartWithDelayLocal(updatedItems, `Removing`, item.productName);
  };
  const handleCheckoutClick = (e) => {
    e.preventDefault();

    // Check if cart has items
    if (cartItems.length === 0) {
      setShowEmptyCartAlert(true);
      return;
    }

    // Ensure cart items are saved to both localStorage and sessionStorage before navigation
    try {
      const cartData = JSON.stringify(cartItems);
      localStorage.setItem("cartItems", cartData);
      sessionStorage.setItem("cartItems", cartData);
      sessionStorage.setItem("checkoutInProgress", "true");

      // Navigate with state
      navigate("/checkout", { state: { cartItems, fromCart: true } });
    } catch (error) {
      console.error("Error saving cart to storage:", error);
      alert("There was an error saving your cart. Please try again.");
      return;
    }

    // Close the cart sidebar
    if (onClose) {
      onClose();
    }
  };

  const handleAddSuggestedProduct = async (productId) => {
    // Find the product in product data
    const productToAdd = productData.find(
      (product) => product.id === productId
    );

    if (!productToAdd) return;

    // Check if product is already in cart
    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct) {
      // Update quantity if already in cart
      await handleUpdateQuantity(productId, existingProduct.quantity + 1);
    } else {
      // Create a new cart item
      const newItem = {
        id: productToAdd.id,
        productName: productToAdd.productName,
        count: productToAdd.capsuleCount + "CT",
        price: productToAdd.pricing.oneTimePurchase.price,
        originalPrice: productToAdd.pricing.subscribeAndSave
          ? productToAdd.pricing.subscribeAndSave.originalPrice
          : null,
        quantity: 1,
        thumbnail: productToAdd.thumbnail,
      };

      // Add to cart
      const updatedItems = [...cartItems, newItem];
      await updateCartWithDelayLocal(
        updatedItems,
        `Adding`,
        productToAdd.productName
      );
    }
  };

  // Progress calculation: 0-50% for $0-$75, 50-100% for $75-$100
  let progress = 0;
  if (subtotal <= FREE_SHIP_THRESHOLD) {
    progress = (subtotal / FREE_SHIP_THRESHOLD) * 50;
  } else {
    progress =
      50 +
      ((Math.min(subtotal, FAST_SHIP_THRESHOLD) - FREE_SHIP_THRESHOLD) /
        (FAST_SHIP_THRESHOLD - FREE_SHIP_THRESHOLD)) *
        50;
  }
  progress = Math.min(progress, 100);

  // Shipping icon logic
  const freeShipIcon =
    subtotal >= FREE_SHIP_THRESHOLD
      ? `${imagePath}ship-checked.svg`
      : `${imagePath}free-ship.svg`;
  const fastShipIcon =
    subtotal >= FAST_SHIP_THRESHOLD
      ? `${imagePath}ship-checked.svg`
      : `${imagePath}fast-ship.svg`;

  // CartHeadMsg logic
  let cartMsg = null;
  if (subtotal < FREE_SHIP_THRESHOLD) {
    cartMsg = (
      <>
        You are <b>${(FREE_SHIP_THRESHOLD - subtotal).toFixed(2)}</b> away from{" "}
        <b>FREE SHIPPING!</b>
      </>
    );
  } else if (subtotal < FAST_SHIP_THRESHOLD) {
    cartMsg = (
      <>
        You are <b>${(FAST_SHIP_THRESHOLD - subtotal).toFixed(2)}</b> away from{" "}
        <b>FREE 2-day SHIPPING!</b>
      </>
    );
  } else {
    cartMsg = (
      <>
        <b>Congratulations!</b> You unlocked <b>FREE 2-day SHIPPING!</b>
      </>
    );
  }

  return (
    <>
      {/* Modern empty cart alert */}
      {showEmptyCartAlert && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              padding: "2.5rem 2rem 2rem 2rem",
              minWidth: 320,
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Icon
              icon="mdi:cart-off"
              width="48"
              height="48"
              color="#60983E"
              style={{ marginBottom: 12 }}
            />
            <h3
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#222",
                fontSize: 22,
              }}
            >
              Your cart is empty
            </h3>
            <p
              style={{
                margin: "8px 0 20px 0",
                color: "#555",
                fontSize: 16,
              }}
            >
              Please add some items before checkout.
            </p>
            <button
              style={{
                background: "#60983E",
                color: "white",
                border: "none",
                padding: "10px 28px",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(96,152,62,0.08)",
                marginTop: 8,
              }}
              onClick={() => setShowEmptyCartAlert(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {animationState && <Overlay isVisible={isVisible} onClick={onClose} />}
      {animationState && (
        <SidebarWrapper isVisible={isVisible} ref={cartRef}>
          <SidebarLoader
            isVisible={isCartUpdating}
            message={loadingMessage || "Updating cart..."}
            productName={loadingProductName}
            action={loadingAction}
          />
          <CartBody>
            <CartTitle>
              <p>Your Cart</p>
              <button onClick={onClose} aria-label="Close Cart">
                <Icon icon="mdi:close" width="24" height="24" />
              </button>
            </CartTitle>
            <CartHead>
              <IconBox>
                <ShipStep>
                  <img src={freeShipIcon} alt="" width={28} height={28} />
                  <p>FREE Standard Shipping</p>
                </ShipStep>
                <ShipStep>
                  <img src={fastShipIcon} alt="" width={28} height={28} />
                  <p>FREE 2-day Shipping</p>
                </ShipStep>
              </IconBox>
              <ProgressBar>
                <ProgressFill percent={progress} />
              </ProgressBar>
              <CartHeadMsg>{cartMsg}</CartHeadMsg>
            </CartHead>
            <CartItems>
              <PrBox>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => {
                    // Get product info for subscription options
                    const productInfo = productData.find(
                      (product) => product.id === item.id
                    );
                    const hasSubscriptionOption =
                      productInfo && productInfo.pricing.subscribeAndSave;
                    const deliveryOptions = hasSubscriptionOption
                      ? productInfo.pricing.subscribeAndSave.deliveryOptions
                      : [];

                    return (
                      <React.Fragment key={index}>
                        <PrInfo>
                          <PrThumb>
                            <PrImg>
                              <img
                                src={`${imagePath}${item.thumbnail}`}
                                alt={item.productName}
                              />
                            </PrImg>
                            <PrTextBox>
                              <PrText>
                                <p>{item.productName}</p>
                                <span>{item.count}</span>
                              </PrText>
                              <QtyBox>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  aria-label="Decrease"
                                >
                                  <Icon
                                    icon="mdi:minus"
                                    width="28"
                                    height="28"
                                  />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  aria-label="Increase"
                                >
                                  <Icon
                                    icon="mdi:plus"
                                    width="28"
                                    height="28"
                                  />
                                </button>
                              </QtyBox>
                            </PrTextBox>
                          </PrThumb>
                          <PrRight>
                            <RemoveItemIcon
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Icon
                                icon="mdi:trash-can-outline"
                                width="20"
                                height="20"
                                color="#FF0000"
                              />
                            </RemoveItemIcon>
                            <PrPrice>
                              ${(item.price * item.quantity).toFixed(2)}
                              {item.originalPrice &&
                                item.originalPrice > item.price && (
                                  <OriginalPriceSpan>
                                    $
                                    {(
                                      item.originalPrice * item.quantity
                                    ).toFixed(2)}
                                  </OriginalPriceSpan>
                                )}
                            </PrPrice>
                          </PrRight>
                        </PrInfo>

                        {/* Subscription Option UI */}
                        {hasSubscriptionOption && !item.isSubscription && (
                          <ProductSubscriptionOption>
                            <SubscriptionToggle
                              isOpen={openSubscription === item.id}
                              onClick={() => toggleSubscription(item.id)}
                            >
                              <Icon
                                icon="mdi:package-variant-plus"
                                width="16"
                                height="16"
                                style={{ marginRight: "4px" }}
                              />
                              Upgrade to Subscription &amp; Save 20%
                              <Icon
                                icon="mdi:chevron-down"
                                width="16"
                                height="16"
                                style={{ marginLeft: "4px" }}
                              />
                            </SubscriptionToggle>

                            <SubscriptionDropdown
                              isOpen={openSubscription === item.id}
                            >
                              <CustomSelect className="custom-select">
                                <SelectHeader
                                  isOpen={openSelect === item.id}
                                  onClick={() => toggleSelect(item.id)}
                                >
                                  {selectedDelivery[item.id] ||
                                    "Select delivery frequency"}
                                  <Icon
                                    icon="mdi:chevron-down"
                                    width="18"
                                    height="18"
                                  />
                                </SelectHeader>

                                <OptionsContainer
                                  isOpen={openSelect === item.id}
                                >
                                  {deliveryOptions.map((option, i) => (
                                    <Option
                                      key={i}
                                      $isSelected={
                                        selectedDelivery[item.id] === option
                                      }
                                      onClick={() =>
                                        selectDeliveryOption(item.id, option)
                                      }
                                    >
                                      {option}
                                    </Option>
                                  ))}
                                </OptionsContainer>
                              </CustomSelect>

                              {selectedDelivery[item.id] && (
                                <SubscriptionSavings>
                                  Save $
                                  {(
                                    (productInfo.pricing.oneTimePurchase.price -
                                      productInfo.pricing.subscribeAndSave
                                        .discountedPrice) *
                                    item.quantity
                                  ).toFixed(2)}{" "}
                                  with subscription
                                </SubscriptionSavings>
                              )}
                            </SubscriptionDropdown>
                          </ProductSubscriptionOption>
                        )}

                        {/* Show option to remove subscription */}
                        {item.isSubscription && (
                          <ProductSubscriptionOption>
                            <SubscriptionToggle
                              onClick={() => removeSubscription(item.id)}
                              style={{
                                backgroundColor: "#F8FFFA",
                                borderColor: "#4CAF50",
                              }}
                            >
                              <Icon
                                icon="mdi:check-circle"
                                color="#4CAF50"
                                width="18"
                                height="18"
                              />
                              Subscription:{" "}
                              {item.subscriptionFrequency === "30"
                                ? "Every 30 days"
                                : item.subscriptionFrequency === "60"
                                ? "Every 60 days"
                                : item.subscriptionFrequency === "90"
                                ? "Every 90 days"
                                : item.deliveryOption || "Every 30 days"}{" "}
                              delivery
                              <span
                                style={{
                                  marginLeft: "auto",
                                  color: "#FF0000",
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Icon
                                  icon="mdi:close-circle-outline"
                                  width="14"
                                  height="14"
                                  style={{ marginRight: "3px" }}
                                />
                                Remove
                              </span>
                            </SubscriptionToggle>
                          </ProductSubscriptionOption>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <EmptyCartMessage>
                    <p>Your cart is empty</p>
                    <button
                      style={{
                        background: "#60983E",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        fontWeight: 500,
                        marginTop: "1rem",
                      }}
                      onClick={() => {
                        if (onClose) onClose();
                        navigate("/shop");
                      }}
                    >
                      Browse Products
                    </button>
                  </EmptyCartMessage>
                )}
                {/* Product Suggestions with modern design */}
                {suggestedProducts.length > 0 && (
                  <SuggestionsSection>
                    <SuggestionHeader>You may also like</SuggestionHeader>
                    <SuggestionsGrid>
                      {suggestedProducts.map((product) => (
                        <SuggestionItem
                          key={product.id}
                          onClick={() => handleAddSuggestedProduct(product.id)}
                        >
                          <SuggestionImage>
                            <img
                              src={`${imagePath}${product.thumbnail}`}
                              alt={product.productName}
                            />
                          </SuggestionImage>
                          <SuggestionName>{product.productName}</SuggestionName>
                          <SuggestionPrice>
                            ${product.price.toFixed(2)}
                          </SuggestionPrice>
                        </SuggestionItem>
                      ))}
                    </SuggestionsGrid>
                  </SuggestionsSection>
                )}
              </PrBox>
            </CartItems>
          </CartBody>
          <CartFooter>
            <CartSubtotal>
              <p>
                Subtotal (
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                item
                {cartItems.reduce((total, item) => total + item.quantity, 0) > 1
                  ? "s"
                  : ""}
                )
              </p>
              <SubtotalPrice>
                ${subtotal.toFixed(2)}
                {cartItems.length > 0 && orgSubtotal > subtotal && (
                  <OriginalPriceSpan>
                    ${orgSubtotal.toFixed(2)}
                  </OriginalPriceSpan>
                )}
              </SubtotalPrice>
            </CartSubtotal>
            <CheckoutBtn as="button" onClick={handleCheckoutClick}>
              <Icon
                icon="mdi:cart-arrow-right"
                width="20"
                height="20"
                style={{ marginRight: "8px" }}
              />
              Proceed to Checkout
            </CheckoutBtn>
          </CartFooter>
        </SidebarWrapper>
      )}
    </>
  );
};

export default SidebarCart;
