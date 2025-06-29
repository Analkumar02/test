import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import { Icon } from "@iconify/react";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
`;

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 800px;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;
  height: fit-content;
`;

const UserProfile = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #1e3a5f 100%
  );
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }

  * {
    position: relative;
    z-index: 1;
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);

  svg {
    font-size: 2.5rem;
    color: white;
  }
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
`;

const MenuList = styled.div`
  padding: 1.5rem 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : "#666")};
  background: ${({ $active }) =>
    $active ? "rgba(34, 70, 93, 0.08)" : "transparent"};
  border-right: ${({ $active, theme }) =>
    $active ? `3px solid ${theme.colors.primary}` : "3px solid transparent"};

  &:hover {
    background: rgba(34, 70, 93, 0.05);
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const MainContent = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #eef2f7;
  background: linear-gradient(135deg, #fafbfc 0%, #f4f7fb 100%);
`;

const ContentTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
`;

const ContentSubtitle = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 1rem;
`;

const ContentBody = styled.div`
  padding: 2rem;
`;

const SectionCard = styled.div`
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  background: white;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  flex: 1;
`;

const EditButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background: #1a4a6b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(34, 70, 93, 0.3);
  }
`;

const SaveButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }
`;

const CancelButton = styled.button`
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #4b5563;
    transform: translateY(-1px);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(34, 70, 93, 0.1);
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  &.error {
    border-color: #ef4444;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(34, 70, 93, 0.1);
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  &.error {
    border-color: #ef4444;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const InfoDisplay = styled.div`
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 1rem;
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
`;

const OrderCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const OrderId = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

const OrderDate = styled.span`
  color: #64748b;
  font-size: 0.9rem;
`;

const OrderStatus = styled.span`
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const OrderTotal = styled.div`
  font-weight: 600;
  color: #059669;
  font-size: 1.2rem;
`;

const OrderItems = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const ViewDetailsButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-1px);
  }
`;

const OrderDetails = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

const OrderDetailSection = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const OrderDetailTitle = styled.h5`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const OrderDetailContent = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.4;
`;

const OrderItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const OrderItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.span`
  font-weight: 500;
  color: #374151;
  font-size: 0.85rem;
`;

const ItemDetails = styled.span`
  color: #64748b;
  font-size: 0.75rem;
`;

const ItemPrice = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.85rem;
`;

const NoOrdersMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #64748b;

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h4 {
    margin: 0 0 0.5rem 0;
    color: #374151;
  }

  p {
    margin: 0;
  }
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
`;

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState("personal");
  const [validationErrors, setValidationErrors] = useState({});
  const [expandedOrders, setExpandedOrders] = useState({});

  // US States list
  const US_STATES = [
    { value: "", label: "Select State" },
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Load user data
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
    setUserData(storedUserData);
    setEditForm(storedUserData);
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setValidationErrors({});
  };

  const handleCancel = () => {
    setEditForm(userData);
    setIsEditing(false);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};

    // Validate phone number (optional, but if provided should be valid)
    if (editForm.phone && editForm.phone.length > 0) {
      if (editForm.phone.length !== 10 || !/^\d{10}$/.test(editForm.phone)) {
        errors.phone = "Phone number must be 10 digits";
      }
    }

    // Validate ZIP code (optional, but if provided should be valid)
    if (editForm.zipCode && editForm.zipCode.length > 0) {
      if (editForm.zipCode.length < 5 || !/^\d{5,6}$/.test(editForm.zipCode)) {
        errors.zipCode = "ZIP code must be 5-6 digits";
      }
    }

    return errors;
  };

  const handleSave = () => {
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Update user data in localStorage
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
    allUsers[userData.email] = editForm;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    localStorage.setItem("userData", JSON.stringify(editForm));

    setUserData(editForm);
    setIsEditing(false);
    setValidationErrors({});
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;

    // Handle phone number input (only allow digits, max 10)
    if (field === "phone") {
      processedValue = value.replace(/\D/g, "").substring(0, 10);
    }

    // Handle ZIP code input (only allow digits, max 6)
    if (field === "zipCode") {
      processedValue = value.replace(/\D/g, "").substring(0, 6);
    }

    setEditForm((prev) => ({
      ...prev,
      [field]: processedValue,
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const formatOrderDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If the date is invalid, try to parse it as a localized string
        return dateString;
      }

      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  const toggleOrderDetails = (orderIndex) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderIndex]: !prev[orderIndex],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    navigate("/");
  };

  if (!userData) {
    return (
      <PageWrapper>
        <Container>
          <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
        </Container>
      </PageWrapper>
    );
  }

  const totalOrders = userData.orders ? userData.orders.length : 0;
  const totalSpent = userData.orders
    ? userData.orders.reduce(
        (sum, order) => sum + parseFloat(order.total || 0),
        0
      )
    : 0;

  return (
    <PageWrapper>
      <Container>
        <ProfileContainer>
          {/* Sidebar */}
          <Sidebar>
            <UserProfile>
              <Avatar>
                <Icon icon="lucide:user" />
              </Avatar>
              <UserName>
                {userData.firstName} {userData.lastName}
              </UserName>
              <UserEmail>{userData.email}</UserEmail>
            </UserProfile>

            <MenuList>
              <MenuItem
                $active={activeTab === "personal"}
                onClick={() => setActiveTab("personal")}
              >
                <Icon icon="lucide:user" />
                Personal Information
              </MenuItem>
              <MenuItem
                $active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
              >
                <Icon icon="lucide:package" />
                Order History
              </MenuItem>
              <MenuItem
                $active={activeTab === "stats"}
                onClick={() => setActiveTab("stats")}
              >
                <Icon icon="lucide:bar-chart-3" />
                Account Stats
              </MenuItem>
            </MenuList>

            <LogoutButton onClick={handleLogout}>
              <Icon icon="lucide:log-out" />
              Sign Out
            </LogoutButton>
          </Sidebar>

          {/* Main Content */}
          <MainContent>
            {activeTab === "personal" && (
              <>
                <ContentHeader>
                  <ContentTitle>Personal Information</ContentTitle>
                  <ContentSubtitle>
                    Manage your account details and preferences
                  </ContentSubtitle>
                </ContentHeader>

                <ContentBody>
                  <SectionCard>
                    <SectionHeader>
                      <SectionTitle>Contact Details</SectionTitle>
                      {!isEditing && (
                        <EditButton onClick={handleEdit}>
                          <Icon icon="lucide:edit" />
                          Edit
                        </EditButton>
                      )}
                      {isEditing && (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <SaveButton onClick={handleSave}>
                            <Icon icon="lucide:check" />
                            Save
                          </SaveButton>
                          <CancelButton onClick={handleCancel}>
                            <Icon icon="lucide:x" />
                            Cancel
                          </CancelButton>
                        </div>
                      )}
                    </SectionHeader>

                    <FormGrid>
                      <FormGroup>
                        <Label>First Name</Label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={editForm.firstName || ""}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                          />
                        ) : (
                          <InfoDisplay>
                            {userData.firstName || "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Last Name</Label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={editForm.lastName || ""}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                          />
                        ) : (
                          <InfoDisplay>
                            {userData.lastName || "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Email Address</Label>
                        <InfoDisplay>{userData.email}</InfoDisplay>
                      </FormGroup>

                      <FormGroup>
                        <Label>Phone Number</Label>
                        {isEditing ? (
                          <>
                            <Input
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={editForm.phone || ""}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              placeholder="Enter 10-digit phone number"
                              className={validationErrors.phone ? "error" : ""}
                            />
                            {validationErrors.phone && (
                              <ErrorMessage>
                                {validationErrors.phone}
                              </ErrorMessage>
                            )}
                          </>
                        ) : (
                          <InfoDisplay>
                            {userData.phone
                              ? userData.phone.replace(
                                  /(\d{3})(\d{3})(\d{4})/,
                                  "($1) $2-$3"
                                )
                              : "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>
                    </FormGrid>
                  </SectionCard>

                  <SectionCard>
                    <SectionHeader>
                      <SectionTitle>Address Information</SectionTitle>
                    </SectionHeader>

                    <FormGrid>
                      <FormGroup>
                        <Label>Street Address</Label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={editForm.address || ""}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                          />
                        ) : (
                          <InfoDisplay>
                            {userData.address || "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Apartment/Suite</Label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={editForm.apartment || ""}
                            onChange={(e) =>
                              handleInputChange("apartment", e.target.value)
                            }
                          />
                        ) : (
                          <InfoDisplay>
                            {userData.apartment || "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>City</Label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={editForm.city || ""}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                          />
                        ) : (
                          <InfoDisplay>
                            {userData.city || "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>State/Province</Label>
                        {isEditing ? (
                          <Select
                            value={editForm.state || ""}
                            onChange={(e) =>
                              handleInputChange("state", e.target.value)
                            }
                          >
                            {US_STATES.map((state) => (
                              <option key={state.value} value={state.value}>
                                {state.label}
                              </option>
                            ))}
                          </Select>
                        ) : (
                          <InfoDisplay>
                            {userData.state
                              ? US_STATES.find(
                                  (s) => s.value === userData.state
                                )?.label || userData.state
                              : "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Country</Label>
                        {isEditing ? (
                          <Select
                            value={editForm.country || "United States"}
                            onChange={(e) =>
                              handleInputChange("country", e.target.value)
                            }
                          >
                            <option value="United States">United States</option>
                          </Select>
                        ) : (
                          <InfoDisplay>
                            {userData.country || "United States"}
                          </InfoDisplay>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>ZIP/Postal Code</Label>
                        {isEditing ? (
                          <>
                            <Input
                              type="text"
                              inputMode="numeric"
                              maxLength={6}
                              value={editForm.zipCode || ""}
                              onChange={(e) =>
                                handleInputChange("zipCode", e.target.value)
                              }
                              placeholder="Enter ZIP code"
                              className={
                                validationErrors.zipCode ? "error" : ""
                              }
                            />
                            {validationErrors.zipCode && (
                              <ErrorMessage>
                                {validationErrors.zipCode}
                              </ErrorMessage>
                            )}
                          </>
                        ) : (
                          <InfoDisplay>
                            {userData.zipCode || "Not provided"}
                          </InfoDisplay>
                        )}
                      </FormGroup>
                    </FormGrid>
                  </SectionCard>
                </ContentBody>
              </>
            )}

            {activeTab === "orders" && (
              <>
                <ContentHeader>
                  <ContentTitle>Order History</ContentTitle>
                  <ContentSubtitle>
                    View and track your past orders
                  </ContentSubtitle>
                </ContentHeader>

                <ContentBody>
                  {userData.orders && userData.orders.length > 0 ? (
                    <OrdersGrid>
                      {userData.orders.map((order, index) => (
                        <OrderCard key={index}>
                          <OrderHeader>
                            <OrderInfo>
                              <OrderId>
                                Order #{order.id || `ORDER-${index + 1}`}
                              </OrderId>
                              <OrderDate>
                                {formatOrderDate(order.date) ||
                                  formatOrderDate(
                                    new Date().toLocaleDateString()
                                  )}
                              </OrderDate>
                            </OrderInfo>
                            <div style={{ textAlign: "right" }}>
                              <OrderStatus>Completed</OrderStatus>
                              <OrderTotal>${order.total || "0.00"}</OrderTotal>
                            </div>
                          </OrderHeader>
                          <OrderItems>
                            <Icon icon="lucide:package" />
                            {order.items
                              ? `${order.items.length} item(s)`
                              : "Order details not available"}
                          </OrderItems>

                          <ViewDetailsButton
                            onClick={() => toggleOrderDetails(index)}
                          >
                            <Icon
                              icon={
                                expandedOrders[index]
                                  ? "lucide:chevron-up"
                                  : "lucide:chevron-down"
                              }
                            />
                            {expandedOrders[index]
                              ? "Hide Details"
                              : "View Details"}
                          </ViewDetailsButton>

                          {expandedOrders[index] && (
                            <OrderDetails>
                              <OrderDetailSection>
                                <OrderDetailTitle>
                                  Order Information
                                </OrderDetailTitle>
                                <OrderDetailContent>
                                  <div>
                                    Order ID: {order.id || `ORDER-${index + 1}`}
                                  </div>
                                  <div>
                                    Date:{" "}
                                    {formatOrderDate(order.date) ||
                                      formatOrderDate(
                                        new Date().toLocaleDateString()
                                      )}
                                  </div>
                                  <div>Status: Completed</div>
                                  <div>
                                    Shipping Method:{" "}
                                    {order.shippingMethod || "Standard Ground"}
                                  </div>
                                </OrderDetailContent>
                              </OrderDetailSection>

                              {order.items && order.items.length > 0 && (
                                <OrderDetailSection>
                                  <OrderDetailTitle>
                                    Items Ordered
                                  </OrderDetailTitle>
                                  <OrderItemsList>
                                    {order.items.map((item, itemIndex) => (
                                      <OrderItemRow key={itemIndex}>
                                        <ItemInfo>
                                          <ItemName>
                                            {item.productName ||
                                              item.name ||
                                              "Product"}
                                          </ItemName>
                                          <ItemDetails>
                                            Quantity: {item.quantity || 1}
                                            {item.selectedOption &&
                                              ` • ${item.selectedOption}`}
                                          </ItemDetails>
                                        </ItemInfo>
                                        <ItemPrice>
                                          $
                                          {(
                                            (item.price || 0) *
                                            (item.quantity || 1)
                                          ).toFixed(2)}
                                        </ItemPrice>
                                      </OrderItemRow>
                                    ))}
                                  </OrderItemsList>
                                </OrderDetailSection>
                              )}

                              {order.shippingAddress && (
                                <OrderDetailSection>
                                  <OrderDetailTitle>
                                    Shipping Address
                                  </OrderDetailTitle>
                                  <OrderDetailContent>
                                    <div>
                                      {order.shippingAddress.firstName}{" "}
                                      {order.shippingAddress.lastName}
                                    </div>
                                    <div>{order.shippingAddress.address1}</div>
                                    {order.shippingAddress.address2 && (
                                      <div>
                                        {order.shippingAddress.address2}
                                      </div>
                                    )}
                                    <div>
                                      {order.shippingAddress.city},{" "}
                                      {order.shippingAddress.state}{" "}
                                      {order.shippingAddress.zipCode}
                                    </div>
                                    {order.shippingAddress.phone && (
                                      <div>
                                        Phone: {order.shippingAddress.phone}
                                      </div>
                                    )}
                                  </OrderDetailContent>
                                </OrderDetailSection>
                              )}

                              <OrderDetailSection>
                                <OrderDetailTitle>
                                  Order Summary
                                </OrderDetailTitle>
                                <OrderDetailContent>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginBottom: "0.25rem",
                                    }}
                                  >
                                    <span>Subtotal:</span>
                                    <span>
                                      ${order.subtotal || order.total || "0.00"}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginBottom: "0.25rem",
                                    }}
                                  >
                                    <span>Shipping:</span>
                                    <span>${order.shipping || "0.00"}</span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginBottom: "0.25rem",
                                    }}
                                  >
                                    <span>Tax:</span>
                                    <span>${order.tax || "0.00"}</span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontWeight: "600",
                                      borderTop: "1px solid #e2e8f0",
                                      paddingTop: "0.5rem",
                                    }}
                                  >
                                    <span>Total:</span>
                                    <span>${order.total || "0.00"}</span>
                                  </div>
                                </OrderDetailContent>
                              </OrderDetailSection>
                            </OrderDetails>
                          )}
                        </OrderCard>
                      ))}
                    </OrdersGrid>
                  ) : (
                    <NoOrdersMessage>
                      <Icon icon="lucide:shopping-bag" />
                      <h4>No Orders Yet</h4>
                      <p>
                        You haven't placed any orders yet. Start shopping to see
                        your order history here!
                      </p>
                    </NoOrdersMessage>
                  )}
                </ContentBody>
              </>
            )}

            {activeTab === "stats" && (
              <>
                <ContentHeader>
                  <ContentTitle>Account Statistics</ContentTitle>
                  <ContentSubtitle>
                    Overview of your account activity
                  </ContentSubtitle>
                </ContentHeader>

                <ContentBody>
                  <StatsGrid>
                    <StatCard>
                      <StatValue>{totalOrders}</StatValue>
                      <StatLabel>Total Orders</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>${totalSpent.toFixed(2)}</StatValue>
                      <StatLabel>Total Spent</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>
                        {userData.orders && userData.orders.length > 0
                          ? userData.orders[userData.orders.length - 1].date
                          : "Never"}
                      </StatValue>
                      <StatLabel>Last Order</StatLabel>
                    </StatCard>
                  </StatsGrid>
                </ContentBody>
              </>
            )}
          </MainContent>
        </ProfileContainer>
      </Container>
    </PageWrapper>
  );
};

export default MyProfile;
