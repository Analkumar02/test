import styled from "styled-components";

export const FormSection = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 1rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr 1fr"};
  column-gap: 1rem;
  row-gap: 1rem;
  margin-bottom: 0.75rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr !important;
    column-gap: 0.75rem;
    row-gap: 0.75rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* Add spacing for error message, but keep input/label area compact */
  padding-bottom: 0.5rem;

  ${FormRow} & {
    margin-bottom: 0;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  left: 0.75rem;
  /* Vertically center label based on input padding, not wrapper */
  top: 0.65rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 0.25rem;
  font-size: 0.9rem;
  color: #777;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 2;
  line-height: 1.2;
  min-height: 1.2em;
  height: 1.2em;
  display: flex;
  align-items: center;
  width: auto;
  max-width: calc(100% - 1.5rem);
  box-sizing: border-box;
  will-change: top, font-size, color;
  background-clip: padding-box;

  ${({ $focused, $hasValue }) =>
    ($focused || $hasValue) &&
    `
      top: -0.7rem;
      font-size: 0.75rem;
      color: #333;
      transform: none;
    `}
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border 0.2s ease;
  outline: none;
  background: #fff;

  &:focus {
    border-color: #333;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border 0.2s ease;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.85em;
  background-color: #fff;

  &:focus {
    border-color: #333;
  }
`;

export const ButtonBase = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #154a6b 100%
  );
  color: #fff;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: 1.25rem;
  border-radius: 12px;
  text-transform: capitalize;
  border: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

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

  &:disabled {
    background: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;

// Option Group components (used for shipping/payment/billing options)
export const OptionGroup = styled.div`
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  background: #fff;
`;

export const Option = styled.label`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px;
  background: ${({ selected }) => (selected ? "#FBFBF5" : "#fff")};
  border: ${({ selected }) =>
    selected ? "1.5px solid #60983E" : "1px solid #E0E0E0"};
  position: relative;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, border 0.2s;

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

export const CustomRadio = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 1.25rem;
  margin-top: 2px;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? "#60983E" : "#C4C4C4")};
  background: #fff;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: "";
    display: ${({ selected }) => (selected ? "block" : "none")};
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background: #60983e;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;
