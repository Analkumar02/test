import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
  animation: ${slideIn} 0.3s ease;
`;

const SidebarLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  border-radius: 10px;
  animation: ${slideIn} 0.3s ease;
`;

const LoadingSpinner = styled.div`
  width: ${(props) => (props.size === "small" ? "40px" : "60px")};
  height: ${(props) => (props.size === "small" ? "40px" : "60px")};
  border: ${(props) => (props.size === "small" ? "2px" : "3px")} solid #f3f3f3;
  border-top: ${(props) => (props.size === "small" ? "2px" : "3px")} solid
    #1e415f;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${(props) => (props.size === "small" ? "12px" : "20px")};
`;

const LoadingText = styled.div`
  color: #1e415f;
  font-size: ${(props) => (props.size === "small" ? "0.9rem" : "1.1rem")};
  font-weight: 500;
  text-align: center;
  margin-bottom: ${(props) => (props.size === "small" ? "4px" : "8px")};
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingSubtext = styled.div`
  color: #666;
  font-size: ${(props) => (props.size === "small" ? "0.8rem" : "0.9rem")};
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite 0.5s;
`;

// Loading component for full-page overlays (like checkout)
export const FullPageLoader = ({
  message = "Updating cart...",
  subtext = "Please wait while we process your changes...",
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <LoadingOverlay>
      <LoadingSpinner />
      <LoadingText>{message}</LoadingText>
      <LoadingSubtext>{subtext}</LoadingSubtext>
    </LoadingOverlay>
  );
};

// Loading component for sidebar/smaller areas
export const SidebarLoader = ({
  message = "Updating cart...",
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <SidebarLoadingOverlay>
      <LoadingSpinner size="small" />
      <LoadingText size="small">{message}</LoadingText>
    </SidebarLoadingOverlay>
  );
};

// Inline loading component for buttons
export const ButtonLoader = ({ size = 16 }) => (
  <LoadingSpinner
    size="small"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTop: "2px solid white",
      margin: 0,
      marginRight: "8px",
    }}
  />
);

export default FullPageLoader;
