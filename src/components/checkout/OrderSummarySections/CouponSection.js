import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const CouponSectionWrapper = styled.div`
  margin: 1.5rem 0;
`;

const CouponBox = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.gray_lite};
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
`;

const CouponInput = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  outline: none;
  color: #333;

  &::placeholder {
    color: #888;
    font-weight: 400;
  }

  &:focus {
    background: #fff;
  }
`;

const CouponButton = styled.button`
  padding: 14px 20px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CouponTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);

  .discount-text {
    font-weight: 700;
  }
`;

const CouponErrorMessage = styled.div`
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CouponSuggestion = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #0369a1;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

/**
 * CouponSection component for handling coupon input and display
 */
const CouponSection = ({
  formData,
  handleInputChange,
  handleCouponApply,
  couponApplied,
  couponError,
  showCouponSuggestion,
  couponDiscount,
}) => {
  return (
    <CouponSectionWrapper>
      <CouponBox>
        <CouponInput
          type="text"
          placeholder="Discount code or gift card"
          value={formData.promoCode}
          onChange={handleInputChange}
          name="promoCode"
        />
        <CouponButton onClick={handleCouponApply}>Apply</CouponButton>
      </CouponBox>

      {/* Show coupon success message */}
      {couponApplied && !couponError && (
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <CouponTag>
            <Icon icon="mdi:check-circle" width="16" height="16" />
            <span className="discount-text">10% OFF</span>
            applied to one-time purchases!
          </CouponTag>
        </div>
      )}

      {/* Show coupon error message */}
      {couponError && (
        <CouponErrorMessage>
          <Icon icon="mdi:alert-circle" width="16" height="16" />
          {couponError}
        </CouponErrorMessage>
      )}

      {/* Show coupon suggestion */}
      {showCouponSuggestion && !couponApplied && (
        <CouponSuggestion>
          <Icon icon="mdi:lightbulb-outline" width="16" height="16" />
          Try "SAVE10" or "DISCOUNT10" for 10% off on one-time purchases
        </CouponSuggestion>
      )}
    </CouponSectionWrapper>
  );
};

export default CouponSection;
