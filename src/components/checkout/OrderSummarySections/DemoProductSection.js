import React from "react";
import styled from "styled-components";

const DemoProductSectionWrapper = styled.div`
  margin: 1.5rem 0;
`;

const DemoProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DemoProductImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 2px;
  }
`;

const DemoProductInfo = styled.div`
  flex: 1;
`;

const DemoProductName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem;
`;

const DemoProductPrice = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const DemoAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
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

/**
 * DemoProductSection component displays a demo product that can be added to the cart
 */
const DemoProductSection = ({ imagePath, handleAddDemoProduct }) => {
  return (
    <DemoProductSectionWrapper>
      <DemoProductName>60ct Perfect Peace Samples—50% OFF</DemoProductName>
      <DemoProductWrapper>
        <DemoProductImage>
          <img
            src={`${imagePath}perfectpeace.png`}
            alt="Perfect Peace"
            onError={(e) => {
              e.target.src = `${imagePath}product1-image1.png`;
            }}
          />
        </DemoProductImage>
        <DemoProductInfo>
          <div style={{ fontWeight: 500, color: "#333" }}>Perfect Peace</div>
          <DemoProductPrice>$36.99</DemoProductPrice>
        </DemoProductInfo>
        <DemoAddButton onClick={handleAddDemoProduct}>Add</DemoAddButton>
      </DemoProductWrapper>
    </DemoProductSectionWrapper>
  );
};

export default DemoProductSection;
