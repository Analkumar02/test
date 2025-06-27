import styled, { keyframes, css } from "styled-components";

export const slideIn = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Slide = styled.div`
  position: absolute;
  width: 100%;
  padding: 0.75rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-transform: uppercase;
  color: ${({ theme }) => theme.fontSizes.white};
  transform: ${({ $isActive }) =>
    $isActive ? "translateY(0)" : "translateY(100%)"};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  animation: ${({ $isActive }) =>
    $isActive
      ? css`
          ${slideIn} 1s ease-in-out
        `
      : "none"};

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const Slide1 = styled(Slide)`
  background: ${({ theme }) => theme.gradients.blueWave};
`;

export const Slide2 = styled(Slide)`
  background: ${({ theme }) => theme.gradients.purpleMystic};
`;

export const Slide3 = styled(Slide)`
  background: ${({ theme }) => theme.gradients.greenWave};
`;

export const Topbar = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 46px;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 768px) {
    height: 28px;
  }
`;

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  transition: box-shadow 0.3s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1; // Always visible
  transform: translateY(0); // Always at top
  box-shadow: ${({ $isSticky }) =>
    $isSticky ? "0 2px 16px rgba(0,0,0,0.08)" : "none"};
  // Only animate shadow on scroll
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderWrapperMob = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: none;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  height: 56px;
  transition: box-shadow 0.3s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1; // Always visible
  transform: translateY(0); // Always at top
  box-shadow: ${({ $isSticky }) =>
    $isSticky ? "0 2px 16px rgba(0,0,0,0.08)" : "none"};
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const LogoMob = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    max-height: 45px;
  }
`;

export const IconsMob = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 50%;
    position: relative;
    overflow: visible;

    &::before {
      content: "";
      position: absolute;
      top: -4px;
      left: -4px;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(29, 62, 87, 0.1) 50%,
        transparent 100%
      );
      border-radius: 50%;
      transform: scale(0);
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: -1;
    }

    &:hover {
      transform: translateY(-1px);
      color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 3px 12px rgba(29, 62, 87, 0.12),
        0 1px 6px rgba(29, 62, 87, 0.08);

      &::before {
        transform: scale(1);
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 6px rgba(29, 62, 87, 0.08);
    }
  }
`;

export const CartIconWrapperMob = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  overflow: visible;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    width: calc(100% + 12px);
    height: calc(100% + 12px);
    background: radial-gradient(
      circle,
      rgba(70, 157, 117, 0.08) 0%,
      rgba(70, 157, 117, 0.04) 50%,
      transparent 80%
    );
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    border: 1.5px solid transparent;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: -1;
  }

  svg {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    transform: scale(1.08);

    &::before {
      transform: scale(1);
    }

    &::after {
      border-color: rgba(70, 157, 117, 0.3);
      transform: scale(1.15);
    }

    svg {
      color: ${({ theme }) => theme.colors.secondary};
      filter: drop-shadow(0 1px 3px rgba(70, 157, 117, 0.2));
    }
  }

  &:active {
    transform: scale(1.03);

    &::after {
      transform: scale(1.08);
    }
  }
`;

export const CartCountBadgeMob = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border: 2px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const HeaderContainerMob = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    max-height: 76px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  max-width: 400px;
  width: 100%;

  a {
    position: relative;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    display: flex;
    align-items: center;
    transition: color 0.2s;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.colors.primary};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
      pointer-events: none;
    }

    &:hover::after {
      transform: scaleX(1);
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }

    img {
      margin-left: 0.25rem;
    }
  }
`;

export const Icons = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  max-width: 400px;
  width: 100%;
  position: relative;
  align-items: center;

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 50%;
    position: relative;
    overflow: visible;

    &::before {
      content: "";
      position: absolute;
      top: -6px;
      left: -6px;
      width: calc(100% + 12px);
      height: calc(100% + 12px);
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(29, 62, 87, 0.1) 50%,
        transparent 100%
      );
      border-radius: 50%;
      transform: scale(0);
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: -1;
    }

    &:hover {
      transform: translateY(-2px);
      color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 4px 15px rgba(29, 62, 87, 0.15),
        0 2px 8px rgba(29, 62, 87, 0.1);

      &::before {
        transform: scale(1);
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(29, 62, 87, 0.1);
    }
  }
`;

export const CartIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  overflow: visible;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    background: radial-gradient(
      circle,
      rgba(70, 157, 117, 0.08) 0%,
      rgba(70, 157, 117, 0.04) 50%,
      transparent 80%
    );
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border: 2px solid transparent;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: -1;
  }

  svg {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    transform: scale(1.1);

    &::before {
      transform: scale(1);
    }

    &::after {
      border-color: rgba(70, 157, 117, 0.3);
      transform: scale(1.2);
    }

    svg {
      color: ${({ theme }) => theme.colors.secondary};
      filter: drop-shadow(0 2px 4px rgba(70, 157, 117, 0.2));
    }
  }

  &:active {
    transform: scale(1.05);

    &::after {
      transform: scale(1.1);
    }
  }
`;

export const CartCountBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border: 2px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const searchSlideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;
export const searchSlideUp = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
`;

export const SearchBarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background: ${({ theme }) => theme.colors.white_lite};
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${searchSlideDown} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards
        `
      : css`
          ${searchSlideUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards
        `};
`;

export const SearchBarBox = styled.div`
  margin-top: 1.67vw;
  width: 95vw;
  max-width: 900px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.63vw;
  display: flex;
  align-items: center;
  padding: 0.94vw 1.25vw;
  box-shadow: 0 0.1vw 0.83vw rgba(0, 0, 0, 0.04);
  font-size: 1.5vw;
  position: relative;

  @media (max-width: 600px) {
    padding: 4vw 3vw;
    font-size: 4vw;
    margin-top: 4vw;
    border-radius: 2vw;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: 1.3vw;
  flex: 1;
  margin-left: 0.63vw;
  outline: none;

  @media (max-width: 600px) {
    font-size: 4vw;
    margin-left: 2vw;
  }
`;

export const SearchClose = styled.button`
  background: none;
  border: none;
  font-size: 2vw;
  cursor: pointer;
  color: #222;
  margin-left: 0.63vw;

  @media (max-width: 600px) {
    font-size: 6vw;
    margin-left: 2vw;
  }
`;

export const SearchSuggestionsBox = styled.div`
  width: 95vw;
  max-width: 900px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  margin-top: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  padding: 24px;
`;

export const SearchSectionTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
`;

export const SearchNoResults = styled.div`
  font-size: 14px;
`;

export const SearchSuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 24px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const SearchSuggestionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  cursor: pointer;
  padding: 8px;
  transition: background 0.15s;
  border-radius: 8px;
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.Whiteout};
  }
`;

export const SearchSuggestionImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.green_border};
`;

export const SearchSuggestionText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchSuggestionName = styled.div`
  font-size: clamp(1rem, 0.9354rem + 0.2756vw, 1.2rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.01em;
`;

export const SearchSuggestionDesc = styled.div`
  font-size: clamp(0.75rem, 0.7339rem + 0.0689vw, 0.8rem);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: ${({ $isSticky }) => ($isSticky ? "56px" : "84px")};
  left: 0;
  width: 100vw;
  height: ${({ $isSticky }) =>
    $isSticky ? "calc(100vh - 56px)" : "calc(100vh - 84px)"};
  background: rgba(34, 44, 56, 0.6);
  z-index: 2000;
  display: flex;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s, top 0.3s, height 0.3s;
`;

export const MobileMenuPanel = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 85vw;
  max-width: 350px;
  height: 100%;
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
`;

export const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1.5rem 1rem 1.5rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.5rem 0;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const MobileMenuSocial = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.white_lite};
  border-top: 1px solid ${({ theme }) => theme.colors.gray_lite};
`;

export const MobileMenuSocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;
`;

export const MobileMenuSocialIconLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.7rem;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const BlueButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #154a6b 100%
  );
  color: ${({ theme }) => theme.colors.white};
  font-size: clamp(0.875rem, 0.7943rem + 0.3445vw, 1.125rem);
  font-weight: 600;
  padding: 20px 40px;
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
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(29, 62, 87, 0.3),
      0 4px 12px rgba(29, 62, 87, 0.2);
    background: linear-gradient(
      135deg,
      #1a4a6b 0%,
      ${({ theme }) => theme.colors.primary} 100%
    );

    &::before {
      left: 100%;
    }

    a {
      color: ${({ theme }) => theme.colors.white};
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

export const WhiteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.white} 0%,
    #f8f9fa 100%
  );
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(0.875rem, 0.7943rem + 0.3445vw, 1.125rem);
  line-height: 1;
  font-weight: 600;
  padding: 20px 40px;
  border-radius: 10px;
  text-transform: capitalize;
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.colors.primary};
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
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s ease;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(29, 62, 87, 0.25),
      0 4px 12px rgba(29, 62, 87, 0.15);
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary} 0%,
      #154a6b 100%
    );
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &::before {
      left: 100%;
    }

    a {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(29, 62, 87, 0.2);
  }

  @media (max-width: 991px) {
    padding: 10px 30px;
    border-radius: 5px;
  }
`;
