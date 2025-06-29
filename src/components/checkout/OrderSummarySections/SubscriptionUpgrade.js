import React from "react";
import styled from "styled-components";

const UpgradeSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
  margin: 1.5rem 0;
`;

const UpgradeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const UpgradeTitle = styled.h4`
  margin: 0;
`;

const UpgradeDescription = styled.p`
  font-size: 0.9rem;
  margin: 0 0 16px 0;
  line-height: 1.4;
`;

const UpgradeProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
`;

const UpgradeProductItem = styled.li`
  font-size: 0.85rem;
  margin-bottom: 4px;
  padding-left: 8px;
  position: relative;

  &::before {
    content: "•";
    color: #17a2b8;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const DeliverySection = styled.div`
  margin-bottom: 16px;
`;

const DeliveryLabel = styled.label`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 8px;
  display: block;
`;

const DeliverySelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d4e6e1;
  border-radius: 6px;
  background: white;
  font-size: 0.85rem;
  color: #333;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 2px rgba(23, 162, 184, 0.1);
  }
`;

const UpgradeButton = styled.button`
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

const UpgradeSuccessSection = styled.div`
  background: linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%);
  border: 1px solid #4caf50;
  border-radius: 12px;
  padding: 20px;
  margin: 1.5rem 0;
  position: relative;
`;

const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SuccessTitle = styled.h5`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const SuccessDescription = styled.p`
  font-size: 0.9rem;
  color: #2e7d32;
  margin: 0 0 16px 0;
  line-height: 1.4;
`;

const SubscriptionProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubscriptionProductItem = styled.li`
  font-size: 0.85rem;
  color: #2e7d32;
  margin-bottom: 4px;
  padding-left: 8px;
  position: relative;

  &::before {
    content: "•";
    color: #4caf50;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const UndoLink = styled.button`
  background: none;
  border: none;
  color: #2e7d32;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 12px;

  &:hover {
    color: #1b5e20;
  }
`;

/**
 * SubscriptionUpgrade component for handling subscription upgrade functionality
 */
const SubscriptionUpgrade = ({
  subscriptionUpgraded,
  subscriptionSavings,
  deliveryFrequency,
  cartItems,
  handleDismissUpgradeSuccess,
  hasOneTimePurchaseProducts,
  oneTimePurchaseProducts,
  calculateSavings,
  setDeliveryFrequency,
  handleUpgradeToSubscription,
  handleUndoUpgrade,
}) => {
  if (subscriptionUpgraded) {
    return (
      <UpgradeSuccessSection>
        <SuccessHeader>
          <SuccessTitle>
            ✅ You saved ${subscriptionSavings.toFixed(2)} by upgrading products
            to a subscription! 🎉
          </SuccessTitle>
          <DismissButton onClick={handleDismissUpgradeSuccess} title="Dismiss">
            ×
          </DismissButton>
        </SuccessHeader>

        <SuccessDescription>
          Deliver every{" "}
          {deliveryFrequency === "30"
            ? "30 days"
            : deliveryFrequency === "60"
            ? "60 days"
            : "90 days"}
          :
        </SuccessDescription>

        <SubscriptionProductList>
          {cartItems
            .filter((item) => item.isSubscription && !item.isDemoProduct)
            .map((item, index) => (
              <SubscriptionProductItem key={index}>
                {item.productName} - {item.count}
              </SubscriptionProductItem>
            ))}
        </SubscriptionProductList>

        <UndoLink onClick={handleUndoUpgrade}>Undo savings</UndoLink>
      </UpgradeSuccessSection>
    );
  }

  if (hasOneTimePurchaseProducts) {
    return (
      <UpgradeSection>
        <UpgradeHeader>
          <UpgradeTitle>⬆️ Upgrade to a Subscription and Save!</UpgradeTitle>
        </UpgradeHeader>

        <UpgradeDescription>
          Upgrade the following products to a subscription and save up to $
          {calculateSavings()} today!
        </UpgradeDescription>

        <UpgradeProductList>
          {oneTimePurchaseProducts.map((item, index) => (
            <UpgradeProductItem key={index}>
              {item.productName} - {item.count}
            </UpgradeProductItem>
          ))}
        </UpgradeProductList>

        <DeliverySection>
          <DeliveryLabel>Deliver every</DeliveryLabel>
          <DeliverySelect
            value={deliveryFrequency}
            onChange={(e) => setDeliveryFrequency(e.target.value)}
          >
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </DeliverySelect>
        </DeliverySection>

        <UpgradeButton onClick={handleUpgradeToSubscription}>
          Upgrade
        </UpgradeButton>
      </UpgradeSection>
    );
  }

  return null;
};

export default SubscriptionUpgrade;
