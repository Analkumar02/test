import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  MobileMenuOverlay,
  MobileMenuPanel,
  MobileMenuLinks,
  MobileMenuSocial,
  MobileMenuSocialIcons,
  MobileMenuSocialIconLink,
} from "./HeaderStyled";

// Desktop menu structure (sync with Header.js)
const menuItems = [
  { label: "Shop", to: "/shop" },
  { label: "Benefit", to: "#benefit" },
  { label: "Contact", to: "#contact" },
];

const ANIMATION_DURATION = 300;

const MobileMenu = ({ isOpen, onClose, isSticky }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const timeoutRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      timeoutRef.current = setTimeout(
        () => setShouldRender(false),
        ANIMATION_DURATION
      );
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <MobileMenuOverlay $isOpen={isOpen} $isSticky={isSticky} onClick={onClose}>
      <MobileMenuPanel $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <MobileMenuLinks>
          {menuItems.map((item) => (
            <Link key={item.label} to={item.to} onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </MobileMenuLinks>
        <MobileMenuSocial>
          <MobileMenuSocialIcons>
            <MobileMenuSocialIconLink href="#" aria-label="Facebook">
              <Icon
                icon="gg:facebook"
                width="24"
                height="24"
                style={{ color: "#ACACAC" }}
              />
            </MobileMenuSocialIconLink>
            <MobileMenuSocialIconLink href="#" aria-label="Twitter">
              <Icon
                icon="pajamas:twitter"
                width="24"
                height="24"
                style={{ color: "#ACACAC" }}
              />
            </MobileMenuSocialIconLink>
            <MobileMenuSocialIconLink href="#" aria-label="YouTube">
              <Icon
                icon="uil:youtube"
                width="28"
                height="28"
                style={{ color: "#ACACAC" }}
              />
            </MobileMenuSocialIconLink>
            <MobileMenuSocialIconLink href="#" aria-label="TikTok">
              <Icon
                icon="ic:sharp-tiktok"
                width="28"
                height="28"
                style={{ color: "#ACACAC" }}
              />
            </MobileMenuSocialIconLink>
          </MobileMenuSocialIcons>
        </MobileMenuSocial>
      </MobileMenuPanel>
    </MobileMenuOverlay>
  );
};

export default MobileMenu;
