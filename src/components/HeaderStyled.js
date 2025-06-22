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
    font-size: 12px;
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
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderWrapperMob = styled.div`
  display: none;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  position: ${({ $isSticky }) => ($isSticky ? "fixed" : "relative")};
  top: ${({ $isSticky }) => ($isSticky ? "0" : "auto")};
  left: 0;
  z-index: 100;
  height: 56px;

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
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;

    &:hover {
      scale: 1.1;
    }
  }
`;

export const CartIconWrapperMob = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const CartCountBadgeMob = styled.div`
  position: absolute;
  top: -5px;
  right: -10px;
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
    font-size: 1rem;
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

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      scale: 1.1;
    }
  }
`;

export const CartIconWrapper = styled.div`
  position: relative;
`;

export const CartCountBadge = styled.div`
  position: absolute;
  top: 0;
  right: -10px;
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
  margin-top: 32px;
  width: 95vw;
  max-width: 900px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 18px 24px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  font-size: 1.5rem;
  position: relative;
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: 1.3rem;
  flex: 1;
  margin-left: 12px;
  outline: none;
`;

export const SearchClose = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #222;
  margin-left: 12px;
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
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.01em;
`;

export const SearchSuggestionDesc = styled.div`
  font-size: 0.8rem;
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
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 600;
  padding: 20px 40px;
  border-radius: 10px;
  text-transform: capitalize;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.5s;
  cursor: pointer;
  a {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover {
    box-shadow: inset 6em 0 0 0 ${({ theme }) => theme.colors.white},
      inset -6em 0 0 0 ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (max-width: 991px) {
    padding: 10px 30px;
    font-size: 14px;
    border-radius: 5px;
  }
`;

export const WhiteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  line-height: 1;
  font-weight: 600;
  padding: 20px 40px;
  border-radius: 10px;
  text-transform: capitalize;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.5s;
  cursor: pointer;
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    box-shadow: inset 7em 0 0 0 ${({ theme }) => theme.colors.primary},
      inset -7em 0 0 0 ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    a {
      color: ${({ theme }) => theme.colors.white};
    }
  }
  @media (max-width: 991px) {
    padding: 10px 30px;
    font-size: 14px;
    border-radius: 5px;
  }
`;
