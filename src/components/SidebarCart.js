import React, { useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useImagePath } from "../context/ImagePathContext";

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

// Sidebar Wrapper
const SidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  margin: 10px;
  max-width: 500px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 10px;
  height: 100%;
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
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.body};
    cursor: pointer;
    line-height: 1;
    padding: 0;
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

const ProgressFill = styled.div`
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
    svg {
      fill: ${({ theme }) => theme.colors.body};
    }
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

// Upgrade Button
const UpgdBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 5px 40px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.body};
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    padding: 5px 20px;
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

const CheckoutBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 5px 40px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
`;

const PRODUCT = {
  name: "Sugar Shift",
  count: "60CT",
  orgprice: 21.99,
  price: 15.99,
  image: "pr-img1.png",
};

const FREE_SHIP_THRESHOLD = 75;
const FAST_SHIP_THRESHOLD = 100;

const SidebarCart = ({ isVisible, onClose }) => {
  const imagePath = useImagePath();
  const [qty, setQty] = React.useState(1);
  const cartRef = useRef(null);

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

  // Calculate subtotals
  const subtotal = PRODUCT.price * qty;
  const orgSubtotal = PRODUCT.orgprice * qty;

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
    <SidebarWrapper isVisible={isVisible} ref={cartRef}>
      <CartBody>
        <CartTitle>
          <p>Your Cart</p>
          <button onClick={onClose} aria-label="Close Cart">
            &times;
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
            <PrInfo>
              <PrThumb>
                <PrImg>
                  <img src={`${imagePath}${PRODUCT.image}`} alt="" />
                </PrImg>
                <PrTextBox>
                  <PrText>
                    <p>{PRODUCT.name}</p>
                    <span>{PRODUCT.count}</span>
                  </PrText>
                  <QtyBox>
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease"
                    >
                      <svg width="28" height="28" viewBox="0 0 28 28">
                        <rect
                          x="7"
                          y="13"
                          width="14"
                          height="2"
                          rx="1"
                          fill="#353535"
                        />
                      </svg>
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase"
                    >
                      <svg width="28" height="28" viewBox="0 0 28 28">
                        <rect
                          x="13"
                          y="7"
                          width="2"
                          height="14"
                          rx="1"
                          fill="#353535"
                        />
                        <rect
                          x="7"
                          y="13"
                          width="14"
                          height="2"
                          rx="1"
                          fill="#353535"
                        />
                      </svg>
                    </button>
                  </QtyBox>
                </PrTextBox>
              </PrThumb>
              <PrRight>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#FF0000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"
                    strokeWidth="1"
                  />
                </svg>
                <PrPrice>
                  ${subtotal.toFixed(2)}
                  <span
                    style={{
                      color: "#8494a0",
                      textDecoration: "line-through",
                      fontSize: "0.95em",
                      marginLeft: 8,
                    }}
                  >
                    ${orgSubtotal.toFixed(2)}
                  </span>
                </PrPrice>
              </PrRight>
            </PrInfo>
            <UpgdBtn>Upgrade to Subscription &amp; Save 20%</UpgdBtn>
          </PrBox>
        </CartItems>
      </CartBody>
      <CartFooter>
        <CartSubtotal>
          <p>
            Subtotal ({qty} item{qty > 1 ? "s" : ""})
          </p>
          <SubtotalPrice>
            ${subtotal.toFixed(2)}
            <span
              style={{
                color: "#8494a0",
                textDecoration: "line-through",
                fontSize: "0.95em",
                marginLeft: 8,
              }}
            >
              ${orgSubtotal.toFixed(2)}
            </span>
          </SubtotalPrice>
        </CartSubtotal>
        <CheckoutBtn>Proceed to Checkout</CheckoutBtn>
      </CartFooter>
    </SidebarWrapper>
  );
};

export default SidebarCart;
