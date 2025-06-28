/**
 * Cart utility functions for consistent cart operations across the application
 */

/**
 * Simulates backend processing delay with loading feedback
 * @param {Array} updatedCartItems - The updated cart items
 * @param {Function} setIsLoading - Loading state setter
 * @param {Function} setLoadingMessage - Loading message setter
 * @param {string} message - Custom loading message
 * @returns {Promise} Promise that resolves when update is complete
 */
export const updateCartWithDelay = async (
  updatedCartItems,
  setIsLoading,
  setLoadingMessage,
  message = "Updating cart..."
) => {
  setIsLoading(true);
  setLoadingMessage(message);

  try {
    // Simulate backend processing delay (1.5-2.5 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 1500)
    );

    // Update localStorage and sessionStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Calculate and update cart count
    const newCartCount = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem("cartCount", newCartCount.toString());

    // Dispatch custom events for comprehensive updates
    window.dispatchEvent(
      new CustomEvent("localStorageChange", {
        detail: {
          key: "cartItems",
          newValue: JSON.stringify(updatedCartItems),
        },
      })
    );

    window.dispatchEvent(
      new CustomEvent("cartCountUpdate", {
        detail: {
          cartCount: newCartCount,
        },
      })
    );

    // Show brief success feedback
    setLoadingMessage("Cart updated successfully!");
    await new Promise((resolve) => setTimeout(resolve, 500));

    return updatedCartItems;
  } catch (error) {
    console.error("Error updating cart:", error);
    setLoadingMessage("Error updating cart. Please try again.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw error;
  } finally {
    setIsLoading(false);
    setLoadingMessage("");
  }
};

/**
 * Gets cart items from multiple sources (priority: sessionStorage -> localStorage)
 * @returns {Array} Cart items array
 */
export const getCartItems = () => {
  try {
    // Try sessionStorage first
    const sessionCart = sessionStorage.getItem("cartItems");
    if (sessionCart) {
      return JSON.parse(sessionCart);
    }

    // Fall back to localStorage
    const localCart = localStorage.getItem("cartItems");
    if (localCart) {
      return JSON.parse(localCart);
    }

    return [];
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
};

/**
 * Gets cart count from localStorage
 * @returns {number} Cart count
 */
export const getCartCount = () => {
  try {
    const count = localStorage.getItem("cartCount");
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error("Error getting cart count:", error);
    return 0;
  }
};

/**
 * Calculates cart totals
 * @param {Array} cartItems - Array of cart items
 * @param {boolean} couponApplied - Whether coupon is applied
 * @returns {Object} Object containing subtotal, shipping, tax, total calculations
 */
export const calculateCartTotals = (cartItems, couponApplied = false) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate discount only for one-time purchase products
  const oneTimePurchaseTotal = cartItems
    .filter((item) => !item.isSubscription && !item.isDemoProduct)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discountAmount = couponApplied ? oneTimePurchaseTotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discountAmount;

  const shipping = discountedSubtotal >= 75 ? 0 : 8.99;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + shipping + tax;

  return {
    subtotal,
    discountAmount,
    discountedSubtotal,
    shipping,
    tax,
    total,
  };
};

/**
 * Validates if a product already exists in cart
 * @param {Array} cartItems - Current cart items
 * @param {string} productId - Product ID to check
 * @returns {Object|null} Existing cart item or null
 */
export const findItemInCart = (cartItems, productId) => {
  return cartItems.find((item) => item.id === productId) || null;
};

/**
 * Creates a standardized cart item object
 * @param {Object} product - Product data
 * @param {number} quantity - Item quantity
 * @param {Object} options - Additional options (isSubscription, etc.)
 * @returns {Object} Standardized cart item
 */
export const createCartItem = (product, quantity = 1, options = {}) => {
  return {
    id: product.id,
    productName: product.productName,
    count: product.count || `${product.capsuleCount}CT`,
    price: options.isSubscription
      ? product.pricing?.subscribeAndSave?.discountedPrice || product.price
      : product.pricing?.oneTimePurchase?.price || product.price,
    originalPrice: options.isSubscription
      ? product.pricing?.oneTimePurchase?.price
      : null,
    quantity,
    thumbnail: product.thumbnail,
    isSubscription: !!options.isSubscription,
    isDemoProduct: !!options.isDemoProduct,
    deliveryOption: options.deliveryOption || null,
    ...options,
  };
};
