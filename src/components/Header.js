import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  UserIconWrapper,
  UserDropdown,
  UserDropdownItem,
  UserDropdownDivider,
  UserWelcomeText,
} from "./HeaderStyled";

const Header = () => {
  const imagePath = useImagePath();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userData = localStorage.getItem("userData");
  let parsedUserData = null;

  if (isLoggedIn && userData) {
    try {
      parsedUserData = JSON.parse(userData);
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }

  useEffect(() => {
    const storedCount = localStorage.getItem("cartCount");
    if (storedCount) {
      setCartCount(parseInt(storedCount, 10));
    }

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
    }, 3000);
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

  const toggleUserDropdown = () => setUserDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    // Save user cart to user key if logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    let userKey = null;
    if (isLoggedIn) {
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        if (userData && userData.email) {
          userKey = `cartItems_${userData.email}`;
          const guestCart = localStorage.getItem("cartItems");
          if (guestCart) {
            localStorage.setItem(userKey, guestCart);
          }
          // Also save cart count per user
          const guestCartCount = localStorage.getItem("cartCount");
          if (guestCartCount) {
            localStorage.setItem(`cartCount_${userData.email}`, guestCartCount);
          }
        }
      } catch {}
    }
    // Clear guest cart and count
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    localStorage.removeItem("checkoutFormData");
    setUserDropdownOpen(false);
    window.location.reload();
  };

  const handleLogin = () => {
    setUserDropdownOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setUserDropdownOpen(false);
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      const userDropdowns = document.querySelectorAll("[data-user-dropdown]");
      let clickedOutside = true;
      userDropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target)) {
          clickedOutside = false;
        }
      });
      if (clickedOutside) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <UserIconWrapper ref={dropdownRef} data-user-dropdown>
                <Icon
                  icon="lucide:circle-user-round"
                  width="24"
                  height="24"
                  style={{ color: "#1d3e57", cursor: "pointer" }}
                  onClick={toggleUserDropdown}
                />
                <UserDropdown $isOpen={isUserDropdownOpen}>
                  {isLoggedIn && parsedUserData ? (
                    <>
                      <UserWelcomeText>
                        Welcome, {parsedUserData.firstName || "User"}!
                      </UserWelcomeText>
                      <UserDropdownItem onClick={handleProfileClick}>
                        <Icon icon="lucide:user" width="16" height="16" />
                        My Profile
                      </UserDropdownItem>
                      <UserDropdownDivider />
                      <UserDropdownItem onClick={handleLogout}>
                        <Icon icon="lucide:log-out" width="16" height="16" />
                        Sign Out
                      </UserDropdownItem>
                    </>
                  ) : (
                    <>
                      <UserDropdownItem onClick={handleLogin}>
                        <Icon icon="lucide:log-in" width="16" height="16" />
                        Login
                      </UserDropdownItem>
                      <UserDropdownItem onClick={handleLogin}>
                        <Icon icon="lucide:user-plus" width="16" height="16" />
                        Sign Up
                      </UserDropdownItem>
                    </>
                  )}
                </UserDropdown>
              </UserIconWrapper>
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
              <UserIconWrapper data-user-dropdown>
                <Icon
                  icon="lucide:circle-user-round"
                  width="24"
                  height="24"
                  style={{ color: "#1d3e57", cursor: "pointer" }}
                  onClick={toggleUserDropdown}
                />
                <UserDropdown $isOpen={isUserDropdownOpen}>
                  {isLoggedIn && parsedUserData ? (
                    <>
                      <UserWelcomeText>
                        Welcome, {parsedUserData.firstName || "User"}!
                      </UserWelcomeText>
                      <UserDropdownItem onClick={handleProfileClick}>
                        <Icon icon="lucide:user" width="16" height="16" />
                        My Profile
                      </UserDropdownItem>
                      <UserDropdownDivider />
                      <UserDropdownItem onClick={handleLogout}>
                        <Icon icon="lucide:log-out" width="16" height="16" />
                        Sign Out
                      </UserDropdownItem>
                    </>
                  ) : (
                    <>
                      <UserDropdownItem onClick={handleLogin}>
                        <Icon icon="lucide:log-in" width="16" height="16" />
                        Login
                      </UserDropdownItem>
                      <UserDropdownItem onClick={handleLogin}>
                        <Icon icon="lucide:user-plus" width="16" height="16" />
                        Sign Up
                      </UserDropdownItem>
                    </>
                  )}
                </UserDropdown>
              </UserIconWrapper>
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
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isSticky={isSticky}
      />
      {isSearchOpen && (
        <SearchBar isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      )}
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
