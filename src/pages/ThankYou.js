import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { useImagePath } from "../context/ImagePathContext";

const ConfirmArea = styled.div`
  padding: 80px 0;
  background: #fff;
  @media (max-width: 991px) {
    padding: 40px 0;
  }
`;
const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
    span {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.secondary};
      margin-left: 10px;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    h2 {
      font-size: 1.5rem;
    }
  }
`;
const BtnBlue = styled.a`
  max-width: 250px;
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
const MessageBox = styled.div`
  margin-bottom: 30px;
  h5 {
    margin: 0 0 6px 0;
  }
`;
const OrderDetailsBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 24px;
  }
`;
const ShippingDetails = styled.div`
  width: 70%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const OrderTotal = styled.div`
  width: 30%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 40px;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px 0;
  }
`;
const InfoBlock = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 18px;
  .label {
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    margin-top: 18px;
    margin-bottom: 2px;
    display: block;
  }
  .value {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    margin-bottom: 2px;
    display: block;
  }
  a.value {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;
const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  background: #fff;
  padding: 18px 18px 18px 0;
  margin-bottom: 18px;
`;
const ProductImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background: #fff;
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  object-fit: contain;
`;
const ProductDetails = styled.div`
  flex: 1;
  .qty {
    font-size: 1rem;
    margin-bottom: 2px;
  }
  .name {
    font-weight: 600;
    margin-bottom: 2px;
  }
  .price {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    margin-bottom: 2px;
  }
`;
const DeliveryDetails = styled.div`
  min-width: 180px;
  .label {
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 2px;
  }
  .value {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 30px 0 20px 0;
`;
const FeedbackSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;
const FeedbackText = styled.div`
  flex: 1;
  .title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #222;
    margin-bottom: 6px;
  }
  .desc {
    color: #888;
    font-size: 1rem;
    margin-bottom: 0;
  }
`;
const FeedbackBtn = styled.a`
  max-width: 250px;
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
const OrderTotalBox = styled.div`
  background: ${({ theme }) => theme.colors.green_bg};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
`;
const OrderTotalTitle = styled.h4`
  margin-bottom: 18px;
`;
const OrderTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  span:last-child {
    font-weight: 600;
  }
`;
const OrderTotalDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.green_border};
  margin: 18px 0 16px 0;
`;
const OrderTotalFinal = styled(OrderTotalRow)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 18px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 14px;
    text-transform: capitalize;
  }
  h5 {
    text-transform: capitalize;
  }
  ul {
    list-style: disc;
    padding-left: 20px;
    li {
      list-style: disc;
      margin-bottom: 5px;
      font-size: 14px;
    }
  }
  @media (max-width: 991px) {
    gap: 7px;
  }
`;
const DownloadBtn = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  img {
    max-width: 170px;
    &:hover {
      transform: scale(1.1);
    }
  }
  @media (max-width: 991px) {
    img {
      max-width: 100px;
    }
  }
`;
const FeedbackModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FeedbackModal = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 36px 32px 28px 32px;
  min-width: 340px;
  max-width: 95vw;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
`;
const ModalTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1e415f;
`;
const ModalDesc = styled.p`
  color: #555;
  font-size: 1rem;
  margin-bottom: 18px;
`;
const ModalInput = styled.textarea`
  border: 1px solid #d6e7d0;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  min-height: 80px;
  margin-bottom: 18px;
  resize: vertical;
`;
const ModalOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`;
const ModalOptionLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #222;
  gap: 8px;
  cursor: pointer;
`;
const ModalRadio = styled.input`
  accent-color: #1e415f;
  margin-right: 6px;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
const ModalButton = styled.button`
  background: #1e415f;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #16324a;
  }
`;
const ModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;

function ThankYou() {
  const imagePath = useImagePath();
  const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");
  const orderNumber = orderData?.orderNumber || Math.floor(Math.random() * 1e9);
  const shipping = orderData?.formData || {};
  const shippingMethod = orderData?.shippingMethod || "Standard Ground";
  const orderDate = orderData?.orderDate
    ? new Date(orderData.orderDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";
  const deliveryEstimate = (() => {
    if (!orderDate) return "";
    const orderDateObj = orderData?.orderDate
      ? new Date(orderData.orderDate)
      : new Date();
    if (shippingMethod === "Standard Ground") {
      orderDateObj.setDate(orderDateObj.getDate() + 7);
      return orderDateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long",
      });
    }
    return "";
  })();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbackOption, setFeedbackOption] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ConfirmArea>
      <Container>
        <TitleArea>
          <h2>
            Thanks for your order <span>#{orderNumber}</span>
          </h2>
          <BtnBlue href="">Track Order</BtnBlue>
        </TitleArea>
        <MessageBox>
          <h5>Hi {shipping.firstName || "John Doe"}</h5>
          <p>We are delighted that you have found something you like!</p>
        </MessageBox>
        <OrderDetailsBox>
          <ShippingDetails>
            <InfoGrid>
              <InfoBlock>
                <span className="label">Shipping Address</span>
                <span className="value">
                  {shipping.firstName} {shipping.lastName}
                </span>
                <span className="value">{shipping.address1}</span>
                <span className="value">
                  {shipping.city}, {shipping.state} {shipping.zipCode},{" "}
                  {shipping.country}
                </span>
                <span className="value">{shipping.phone}</span>
                <span className="label">Sold by</span>
                <a
                  className="value"
                  href="https://velavie.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Velavie.com
                </a>
                <span className="label">Email Address</span>
                <a className="value" href={`mailto:${shipping.email}`}>
                  {shipping.email}
                </a>
                <span className="label">Delivery Method</span>
                <span className="value">
                  {shippingMethod === "Standard Ground"
                    ? "FedEx Ground"
                    : shippingMethod}
                </span>
              </InfoBlock>
              <InfoBlock>
                <span className="label">Billing Address</span>
                <span className="value">Same as shipping</span>
                <span className="value">{shipping.phone}</span>
                <span className="label">Order Date</span>
                <span className="value">{orderDate}</span>
                <span className="label">Payment Type</span>
                <span className="value">Cash on delivery</span>
              </InfoBlock>
            </InfoGrid>
            <Divider />
            {orderData.cartItems &&
              orderData.cartItems.map((item, idx) => (
                <ProductRow key={idx}>
                  <ProductImg
                    src={`${imagePath}${item.thumbnail}`}
                    alt={item.productName}
                  />
                  <ProductDetails>
                    <div className="name">{item.productName}</div>
                    <div className="qty">Qty: {item.quantity}</div>
                    <div className="price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </ProductDetails>
                  <DeliveryDetails>
                    <div className="label">Delivery Method</div>
                    <div className="value">
                      {shippingMethod === "Standard Ground"
                        ? "FedEx Ground"
                        : shippingMethod}
                    </div>
                    <div className="label">Arrives</div>
                    <div className="value">{deliveryEstimate}</div>
                  </DeliveryDetails>
                </ProductRow>
              ))}
            <Divider />
            <FeedbackSection>
              <FeedbackText>
                <div className="title">Tell us what you think.</div>
                <div className="desc">
                  Take our two minutes survey to tell us about your experience
                </div>
              </FeedbackText>
              <FeedbackBtn as="button" onClick={() => setShowFeedback(true)}>
                Feedback
              </FeedbackBtn>
            </FeedbackSection>
            <Divider />
          </ShippingDetails>
          <OrderTotal>
            <OrderTotalBox>
              <OrderTotalTitle>Order Total</OrderTotalTitle>
              <OrderTotalRow>
                <span>
                  Subtotal (
                  {orderData.cartItems
                    ? orderData.cartItems.reduce(
                        (sum, item) => sum + (item.quantity || 0),
                        0
                      )
                    : 0}{" "}
                  items)
                </span>
                <span>
                  ${orderData.subtotal ? orderData.subtotal.toFixed(2) : "0.00"}
                </span>
              </OrderTotalRow>
              <OrderTotalRow>
                <span>Shipping</span>
                <span>
                  {orderData.shipping === 0
                    ? "FREE"
                    : orderData.shipping
                    ? `$${orderData.shipping.toFixed(2)}`
                    : "$0.00"}
                </span>
              </OrderTotalRow>
              <OrderTotalRow>
                <span>TAX</span>
                <span>
                  ${orderData.tax ? orderData.tax.toFixed(2) : "0.00"}
                </span>
              </OrderTotalRow>
              <OrderTotalDivider />
              <OrderTotalFinal>
                <span>Total</span>
                <span>
                  ${orderData.total ? orderData.total.toFixed(2) : "0.00"}
                </span>
              </OrderTotalFinal>
            </OrderTotalBox>
            <ContentBox>
              <p>Unlock True Wellness</p>
              <h5>download the Velavie app</h5>
              <ul>
                <li>Unlock wellness with app-exclusive offers.</li>
                <li>Get early access to new formulas.</li>
                <li>Stay informed. Stay empowered.</li>
              </ul>
              <DownloadBtn>
                <img src={`${imagePath}playstore.png`} alt="Playstore" />
                <img src={`${imagePath}appstore.png`} alt="Appstore" />
              </DownloadBtn>
            </ContentBox>
          </OrderTotal>
        </OrderDetailsBox>
      </Container>
      {showFeedback && (
        <FeedbackModalOverlay>
          <FeedbackModal>
            <ModalClose onClick={() => setShowFeedback(false)}>
              &times;
            </ModalClose>
            {!submitted ? (
              <>
                <ModalTitle>We value your feedback</ModalTitle>
                <ModalDesc>
                  Please let us know about your experience with your order.
                </ModalDesc>
                <ModalOptions>
                  <ModalOptionLabel>
                    <ModalRadio
                      type="radio"
                      name="feedbackOption"
                      value="Website Experience"
                      checked={feedbackOption === "Website Experience"}
                      onChange={(e) => setFeedbackOption(e.target.value)}
                    />
                    Website Experience
                  </ModalOptionLabel>
                  <ModalOptionLabel>
                    <ModalRadio
                      type="radio"
                      name="feedbackOption"
                      value="Checkout Process"
                      checked={feedbackOption === "Checkout Process"}
                      onChange={(e) => setFeedbackOption(e.target.value)}
                    />
                    Checkout Process
                  </ModalOptionLabel>
                  <ModalOptionLabel>
                    <ModalRadio
                      type="radio"
                      name="feedbackOption"
                      value="Product Selection"
                      checked={feedbackOption === "Product Selection"}
                      onChange={(e) => setFeedbackOption(e.target.value)}
                    />
                    Product Selection
                  </ModalOptionLabel>
                  <ModalOptionLabel>
                    <ModalRadio
                      type="radio"
                      name="feedbackOption"
                      value="Other"
                      checked={feedbackOption === "Other"}
                      onChange={(e) => setFeedbackOption(e.target.value)}
                    />
                    Other
                  </ModalOptionLabel>
                </ModalOptions>
                <ModalInput
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Type your feedback here..."
                />
                <ModalActions>
                  <ModalButton
                    onClick={() => {
                      setSubmitted(true);
                      setTimeout(() => {
                        setShowFeedback(false);
                        setSubmitted(false);
                        setFeedbackText("");
                        setFeedbackOption("");
                      }, 1500);
                    }}
                    disabled={!feedbackText.trim() || !feedbackOption}
                  >
                    Submit
                  </ModalButton>
                </ModalActions>
              </>
            ) : (
              <ModalTitle>Thank you for your feedback!</ModalTitle>
            )}
          </FeedbackModal>
        </FeedbackModalOverlay>
      )}
    </ConfirmArea>
  );
}

export default ThankYou;
