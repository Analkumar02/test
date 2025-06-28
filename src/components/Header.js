import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import SidebarCart from "./SidebarCart";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { useImagePath } from "../context/ImagePathContext";
import { Icon } from "@iconify/react";
import {
  Slide1,
  Slide2,
  Slide3,
  Topbar,
  HeaderWrapper,
  HeaderWrapperMob,
  HeaderContainerMob,
  LogoMob,
  IconsMob,
  CartIconWrapperMob,
  CartCountBadgeMob,
  HeaderContainer,
  Logo,
  NavLinks,
  Icons,
  CartIconWrapper,
  CartCountBadge,
} from "./HeaderStyled";

const Header = () => {
  const imagePath = useImagePath();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Initialize cart count from localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem("cartCount");
    if (storedCount) {
      setCartCount(parseInt(storedCount, 10));
    }

    // Listen for cart count updates from other components
    const handleCartCountUpdate = (e) => {
      if (e.detail && typeof e.detail.cartCount === "number") {
        setCartCount(e.detail.cartCount);
      }
    };

    window.addEventListener("cartCountUpdate", handleCartCountUpdate);

    return () => {
      window.removeEventListener("cartCountUpdate", handleCartCountUpdate);
    };
  }, []);

  const slides = [
    { text: "FREE SHIPPING ON DOMESTIC ORDERS OVER $75", gradient: Slide1 },
    { text: "50,000+ happy customers", gradient: Slide2 },
    { text: "Subscribe & Save 20%", gradient: Slide3 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCart = () => setCartVisible((prev) => !prev);

  return (
    <>
      <Topbar>
        {slides.map((slide, index) => {
          const SlideComponent = slide.gradient;
          return (
            <SlideComponent key={index} $isActive={index === activeIndex}>
              {slide.text}
            </SlideComponent>
          );
        })}
      </Topbar>
      {/* Desktop Header */}
      <HeaderWrapper $isSticky={isSticky} $atTop={!isSticky}>
        <Container>
          <HeaderContainer>
            <NavLinks>
              <Link to="/shop">Shop</Link>
              <Link to="#benefit">Benefit</Link>
              <Link to="#contact">Contact</Link>
            </NavLinks>
            <Logo>
              <Link to="/">
                <img
                  src={`${imagePath}Logo.png`}
                  srcSet={`
                    ${imagePath}Logo.png 1x,
                    ${imagePath}Logo@2x.png 2x,
                    ${imagePath}Logo@3x.png 3x
                  `}
                  alt="Logo"
                />
              </Link>
            </Logo>
            <Icons>
              <Icon
                icon="tabler:search"
                width="24"
                height="24"
                style={{ color: "#1d3e57", cursor: "pointer" }}
                onClick={() => setSearchOpen(true)}
              />
              <Icon
                icon="lucide:circle-user-round"
                width="24"
                height="24"
                style={{ color: "#1d3e57" }}
              />
              <CartIconWrapper
                onClick={toggleCart}
                style={{ cursor: "pointer" }}
              >
                <Icon
                  icon="solar:cart-broken"
                  width="24"
                  height="24"
                  style={{ color: "#1d3e57" }}
                />
                <CartCountBadge>{cartCount}</CartCountBadge>
              </CartIconWrapper>
            </Icons>
          </HeaderContainer>
        </Container>
      </HeaderWrapper>
      {/* Mobile Header */}
      <HeaderWrapperMob $isSticky={isSticky} $atTop={!isSticky}>
        <Container>
          <HeaderContainerMob>
            <LogoMob>
              <Icon
                icon={isMobileMenuOpen ? "tabler:x" : "tabler:menu-2"}
                width="28"
                height="28"
                style={{
                  color: "#1d3e57",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  transform: isMobileMenuOpen ? "rotate(90deg)" : "none",
                }}
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              />
              <Link to="/">
                <img
                  src={`${imagePath}Logo.png`}
                  srcSet={`
                    ${imagePath}Logo.png 1x,
                    ${imagePath}Logo@2x.png 2x,
                    ${imagePath}Logo@3x.png 3x
                  `}
                  alt="Logo"
                />
              </Link>
            </LogoMob>
            <IconsMob>
              <Icon
                icon="tabler:search"
                width="24"
                height="24"
                style={{ color: "#1d3e57", cursor: "pointer" }}
                onClick={() => setSearchOpen(true)}
              />
              <Icon
                icon="lucide:circle-user-round"
                width="24"
                height="24"
                style={{ color: "#1d3e57" }}
              />
              <CartIconWrapperMob
                onClick={toggleCart}
                style={{ cursor: "pointer" }}
              >
                <Icon
                  icon="solar:cart-broken"
                  width="24"
                  height="24"
                  style={{ color: "#1d3e57" }}
                />
                <CartCountBadgeMob>{cartCount}</CartCountBadgeMob>
              </CartIconWrapperMob>
            </IconsMob>
          </HeaderContainerMob>
        </Container>
      </HeaderWrapperMob>
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isSticky={isSticky}
      />
      {/* Search Bar */}
      {isSearchOpen && (
        <SearchBar isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      )}
      {/* Sidebar Cart */}
      {isCartVisible && (
        <SidebarCart
          isVisible={isCartVisible}
          onClose={toggleCart}
          onCartUpdate={setCartCount}
        />
      )}
    </>
  );
};

export default Header;
