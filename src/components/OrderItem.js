import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const OrderItem = styled.div`
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eaeaea;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 5px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
`;

const ItemImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #333;
`;

const ItemInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
`;

const ItemPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ItemQuantity = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ItemPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ItemTotal = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

const OriginalPrice = styled.div`
  font-size: 0.75rem;
  text-decoration: line-through;
  color: #999;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #888;
  position: absolute;
  top: 0.75rem;
  right: 0;
  padding: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: #e53935;
  }
`;

const SubscriptionBadge = styled.span`
  background: linear-gradient(135deg, #60983e 0%, #4a8c28 100%);
  color: white;
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 12px;
  font-weight: 600;
  margin-left: 6px;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  gap: 3px;
`;

const DiscountedPrice = styled.span`
  color: #22c55e;
  font-weight: 600;
`;

const OrderItemComponent = ({ item, imagePath, onRemove, couponApplied }) => {
  // Check if item is undefined or null and provide default values
  if (!item) {
    return null; // Don't render anything if item is not provided
  }

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(item.id);
    }
  };

  // Calculate if this item has a coupon discount applied
  // Only one-time purchases get the discount, not subscriptions or demo products
  const hasDiscount =
    couponApplied && !item.isSubscription && !item.isDemoProduct;

  // Calculate the price after discount
  const price = hasDiscount ? item.price * 0.9 : item.price;
  const totalPrice = price * (item.quantity || 1);

  // Use default thumbnail if not provided
  const thumbnailSrc = item.thumbnail || "product-default.png";

  return (
    <OrderItem>
      <ItemImageWrapper>
        <ItemImage
          src={`${imagePath || ""}${thumbnailSrc}`}
          alt={item.productName || "Product"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${imagePath || ""}product-default.png`;
          }}
        />
      </ItemImageWrapper>

      <ItemDetails>
        <div>
          <ItemName>
            {item.productName}
            {item.isSubscription && (
              <SubscriptionBadge>
                <Icon icon="mdi:sync" width="12" height="12" />
                SUBSCRIPTION
              </SubscriptionBadge>
            )}
            {item.isDemoProduct && (
              <SubscriptionBadge
                style={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                }}
              >
                SAMPLE
              </SubscriptionBadge>
            )}
          </ItemName>

          <ItemInfo>
            {item.count}
            {item.isSubscription &&
              ` • Every ${item.subscriptionFrequency || "30"} days`}
          </ItemInfo>
        </div>

        <ItemPriceRow>
          <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
          <ItemPrice>
            {item.originalPrice && (
              <OriginalPrice>
                ${(item.originalPrice * item.quantity).toFixed(2)}
              </OriginalPrice>
            )}
            <ItemTotal>
              {hasDiscount ? (
                <DiscountedPrice>${totalPrice.toFixed(2)}</DiscountedPrice>
              ) : (
                `$${totalPrice.toFixed(2)}`
              )}
            </ItemTotal>
          </ItemPrice>
        </ItemPriceRow>
      </ItemDetails>

      <RemoveButton onClick={handleRemoveClick} title="Remove item">
        <Icon icon="mdi:close" width="18" height="18" />
      </RemoveButton>
    </OrderItem>
  );
};

export default OrderItemComponent;
