import React from "react";
import styled from "styled-components";

const OrderSummaryDetailsContainer = styled.div`
  margin-top: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;

  span:first-child {
    color: #666;
  }

  span:last-child {
    font-weight: ${(props) => (props.$bold ? "600" : "normal")};
  }

  &:last-child {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

const DiscountRow = styled(SummaryRow)`
  color: #22c55e;
  font-weight: 600;

  span:first-child {
    color: #22c55e;
  }
`;

const getDisplayShippingMethodName = (method) => {
  if (method === "Standard Ground") return "FedEx Ground";
  if (method === "2nd Day Air") return "FedEx Air";
  return method;
};

/**
 * OrderSummaryDetails component displays the price breakdown for the order
 */
const OrderSummaryDetails = ({
  subtotal,
  shipping,
  tax,
  total,
  couponApplied,
  couponDiscount,
  shippingMethod,
  getShippingMethodName,
}) => {
  return (
    <OrderSummaryDetailsContainer>
      <SummaryRow>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </SummaryRow>

      {couponApplied && couponDiscount > 0 && (
        <DiscountRow>
          <span>Coupon Discount (10% off)</span>
          <span>-${couponDiscount.toFixed(2)}</span>
        </DiscountRow>
      )}

      <SummaryRow>
        <span>
          Shipping (
          {getDisplayShippingMethodName(getShippingMethodName(shippingMethod))})
        </span>
        <span>
          {shipping === 0 ? (
            <span
              style={{
                color: "#28a745",
                fontWeight: "600",
                background: "#e8f5e9",
                padding: "2px 6px",
                borderRadius: "3px",
                fontSize: "0.9rem",
              }}
            >
              FREE
            </span>
          ) : (
            `$${shipping.toFixed(2)}`
          )}
        </span>
      </SummaryRow>

      <SummaryRow>
        <span>Estimated Tax</span>
        <span>${tax.toFixed(2)}</span>
      </SummaryRow>

      <SummaryRow $bold={true}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </SummaryRow>
    </OrderSummaryDetailsContainer>
  );
};

export default OrderSummaryDetails;
