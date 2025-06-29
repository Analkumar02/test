import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OrderItem from "./OrderSummarySections/OrderItem";
import CouponSection from "./OrderSummarySections/CouponSection";
import DemoProductSection from "./OrderSummarySections/DemoProductSection";
import SubscriptionUpgrade from "./OrderSummarySections/SubscriptionUpgrade";
import TrustBadges from "./OrderSummarySections/TrustBadges";
import OrderSummaryDetails from "./OrderSummarySections/OrderSummaryDetails";

const OrderSummaryContainer = styled.div`
  background: ${({ theme }) => theme.colors.white_lite};
  border-radius: 15px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 0;
  right: 0;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const OrderSummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
`;

/**
 * OrderSummarySection component displays the order summary sidebar
 */
const OrderSummarySection = ({
  cartItems,
  imagePath,
  handleRemoveItem,
  couponApplied,
  couponDiscount,
  formData,
  handleCouponApply,
  couponError,
  showCouponSuggestion,
  hasDemoProduct,
  handleAddDemoProduct,
  subscriptionUpgraded,
  subscriptionSavings,
  deliveryFrequency,
  handleDismissUpgradeSuccess,
  hasOneTimePurchaseProducts,
  oneTimePurchaseProducts,
  calculateSavings,
  setDeliveryFrequency,
  handleUpgradeToSubscription,
  handleUndoUpgrade,
  subtotal,
  shipping,
  tax,
  total,
  getShippingMethodName,
}) => {
  const navigate = useNavigate();
  return (
    <OrderSummaryContainer>
      <OrderSummaryTitle>Order Summary</OrderSummaryTitle>

      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem 1rem",
            color: "#666",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "#444",
            }}
          >
            Your cart is empty
          </p>
          <p style={{ margin: "0.5rem 0 0.8rem 0", fontSize: "0.9rem" }}>
            Add products to complete your checkout
          </p>
          <button
            onClick={() => navigate("/shop")}
            style={{
              background: "#60983E",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.9rem",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Browse Products
          </button>
        </div>
      ) : (
        cartItems.map((item, index) => (
          <OrderItem
            key={index}
            item={item}
            imagePath={imagePath}
            onRemove={handleRemoveItem}
            couponApplied={couponApplied}
            couponDiscount={couponDiscount}
          />
        ))
      )}

      {/* Coupon Section */}
      <CouponSection
        formData={formData}
        handleInputChange={(e) => {
          const { value } = e.target;
          formData.promoCode = value;
        }}
        handleCouponApply={handleCouponApply}
        couponApplied={couponApplied}
        couponError={couponError}
        showCouponSuggestion={showCouponSuggestion}
        couponDiscount={couponDiscount}
      />

      {/* Demo Product Section - Only show if no demo product is in cart */}
      {!hasDemoProduct && (
        <DemoProductSection
          imagePath={imagePath}
          handleAddDemoProduct={handleAddDemoProduct}
        />
      )}

      {/* Subscription Upgrade Section */}
      <SubscriptionUpgrade
        subscriptionUpgraded={subscriptionUpgraded}
        subscriptionSavings={subscriptionSavings}
        deliveryFrequency={deliveryFrequency}
        cartItems={cartItems}
        handleDismissUpgradeSuccess={handleDismissUpgradeSuccess}
        hasOneTimePurchaseProducts={hasOneTimePurchaseProducts}
        oneTimePurchaseProducts={oneTimePurchaseProducts}
        calculateSavings={calculateSavings}
        setDeliveryFrequency={setDeliveryFrequency}
        handleUpgradeToSubscription={handleUpgradeToSubscription}
        handleUndoUpgrade={handleUndoUpgrade}
      />

      {/* Order Summary Details Section */}
      <OrderSummaryDetails
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        couponApplied={couponApplied}
        couponDiscount={couponDiscount}
        shippingMethod={formData.shippingMethod}
        getShippingMethodName={getShippingMethodName}
      />

      {/* Trust Badges Section */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <TrustBadges imagePath={imagePath} />
      </div>
    </OrderSummaryContainer>
  );
};

export default OrderSummarySection;
