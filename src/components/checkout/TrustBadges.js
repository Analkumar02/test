import React from "react";
import styled from "styled-components";

const TrustBadgesContainer = styled.div`
  text-align: center;
`;

const TrustBadgesTitle = styled.h4`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const BadgesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const BadgeItem = styled.div`
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const badges = [
  { id: 1, name: "Health Badge", filename: "badge1.svg" },
  { id: 2, name: "Organic Badge", filename: "badge2.svg" },
  { id: 3, name: "Non-GMO Badge", filename: "badge3.svg" },
  { id: 4, name: "Gluten Free Badge", filename: "badge4.svg" },
  { id: 5, name: "Vegan Badge", filename: "badge5.svg" },
];

/**
 * TrustBadges component displays trust badges at the bottom of the order summary
 */
const TrustBadges = ({ imagePath }) => {
  return (
    <TrustBadgesContainer>
      <TrustBadgesTitle>Why You Should Trust Velavie</TrustBadgesTitle>
      <BadgesWrapper>
        {badges.map((badge) => (
          <BadgeItem key={badge.id}>
            <img src={`${imagePath}${badge.filename}`} alt={badge.name} />
          </BadgeItem>
        ))}
      </BadgesWrapper>
    </TrustBadgesContainer>
  );
};

export default TrustBadges;
