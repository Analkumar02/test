import styled from "styled-components";
import { Icon } from "@iconify/react";

const OrderItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ProductImage = styled.div`
  max-width: 70px;
  max-height: 70px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem;

  .quantity-text {
    font-weight: 400;
    color: #666;
  }
`;

const ProductMeta = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SubscriptionInfo = styled.div`
  font-size: 0.8rem;
  color: #4caf50;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CouponTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #22c55e;
  font-size: 0.8rem;
  font-weight: 500;

  .discount-text {
    font-weight: 600;
  }
`;

const ProductActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
`;

const ProductPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
`;

const OrderItem = ({
  item,
  imagePath,
  onRemove,
  couponApplied = false,
  couponDiscount = 0,
}) => {
  return (
    <OrderItemWrapper>
      <ProductImage>
        <img src={`${imagePath}${item.thumbnail}`} alt={item.productName} />
      </ProductImage>
      <ProductInfo>
        <ProductDetails>
          <ProductName>
            {item.productName}{" "}
            <span className="quantity-text">x {item.quantity}</span>
          </ProductName>
          <ProductMeta>
            <div>{item.count}</div>
            {item.isSubscription && (
              <SubscriptionInfo>
                <Icon icon="mdi:check-circle" width="14" height="14" />
                Deliver every{" "}
                {item.subscriptionFrequency === "30"
                  ? "30 days"
                  : item.subscriptionFrequency === "60"
                  ? "60 days"
                  : item.subscriptionFrequency === "90"
                  ? "90 days"
                  : item.deliveryOption || "30 days"}
              </SubscriptionInfo>
            )}
            {/* Show coupon tag for one-time purchase products when coupon is applied */}
            {couponApplied && !item.isSubscription && !item.isDemoProduct && (
              <CouponTag>
                <Icon icon="mdi:tag" width="14" height="14" />
                <span className="discount-text">10% OFF</span>
                (-${(item.price * item.quantity * 0.1).toFixed(2)})
              </CouponTag>
            )}
          </ProductMeta>
        </ProductDetails>
        <ProductActions>
          <button
            onClick={() => onRemove(item.id)}
            style={{
              background: "transparent",
              border: "none",
              padding: "4px",
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Remove item"
          >
            <Icon
              icon="mdi:trash-can-outline"
              width="18"
              height="18"
              color="#FF0000"
            />
          </button>
          <ProductPrice>
            ${(item.price * item.quantity).toFixed(2)}
            {item.originalPrice && item.originalPrice > item.price && (
              <span
                style={{
                  color: "#8494a0",
                  textDecoration: "line-through",
                  fontSize: "0.95em",
                  marginLeft: 8,
                  display: "block",
                }}
              >
                ${(item.originalPrice * item.quantity).toFixed(2)}
              </span>
            )}
          </ProductPrice>
        </ProductActions>
      </ProductInfo>
    </OrderItemWrapper>
  );
};

export default OrderItem;
