import React from "react";
import styled from "styled-components";
import Container from "./Container";
import { Icon } from "@iconify/react";
import { shouldForwardProp } from "styled-components";

// Styled Components
const TableSection = styled.div`
  padding: 80px 0;

  @media (max-width: 767px) {
    padding: 40px 0;
  }
`;

const TableTitle = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;
  }

  p {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 16px;
    line-height: 1.5;
  }

  @media (max-width: 767px) {
    margin-bottom: 40px;

    p {
      font-size: 14px;
    }
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  position: relative;

  /* Fix for sticky columns */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1100px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.white};
`;

const TableHeadRow = styled.tr`
  border: none;
`;

const TableHeadCell = styled.th`
  padding: 20px 16px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  border-right: 1px solid ${({ theme }) => theme.colors.gray_lite};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  background: ${({ theme }) => theme.colors.white};
  min-width: 220px;
  width: 220px;

  &:first-child {
    text-align: left;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    border-top-left-radius: 12px;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 2;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.04);
    min-width: 220px;
    width: 220px;
    max-width: 220px;

    @media (max-width: 768px) {
      min-width: 160px;
      width: 160px;
      max-width: 160px;
    }

    /* Force the sticky behavior */
    transform: translateX(0);
  }

  &:not(:first-child) {
    @media (max-width: 768px) {
      min-width: 100px;
      width: 100px;
      max-width: 100px;
    }
  }

  &:last-child {
    border-right: none;
    border-top-right-radius: 12px;
  }

  @media (max-width: 768px) {
    padding: 16px 12px;
    font-size: 12px;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.white};
  }

  tr:nth-child(odd) {
    background: ${({ theme }) => theme.colors.white};
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) td:first-child {
    background: ${({ theme }) => theme.colors.white};
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 90;
    width: 300px;
  }

  tr:nth-child(odd) td:first-child {
    background: ${({ theme }) => theme.colors.white};
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 90;
    width: 300px;
  }
`;

const TableRow = styled.tr`
  border: none;
`;

const TableCell = styled.td`
  padding: 18px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.body};
  vertical-align: middle;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.body};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  border-right: 1px solid ${({ theme }) => theme.colors.gray_lite};
  min-width: 160px;
  width: 160px;

  &:first-child {
    text-align: left;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.body};
    min-width: 220px;
    width: 220px;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 2;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.04);

    /* Force the sticky behavior */
    transform: translateX(0);
  }

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 14px 12px;
    font-size: 13px;
  }
`;

const CheckIcon = styled(({ productColor, ...rest }) => <Icon {...rest} />)`
  color: ${({ productColor }) => productColor || "#60986E"};
  width: 50px;
  height: 50px;
`;

const CrossIcon = styled(Icon)`
  display: none;
`;

const ProductName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ComparisonTable = () => {
  // Product color codes
  const productColors = {
    sugarShift: "#006DA6",
    antibioticAntidote: "#DEB700",
    idealImmunity: "#EC7908",
    simpleSlumber: "#9200C2",
    heartCentered: "#BD0000",
  };

  const tableData = [
    {
      feature: "Increased energy",
      sugarShift: true,
      antibioticAntidote: false,
      idealImmunity: true,
      simpleSlumber: false,
      heartCentered: false,
    },
    {
      feature: "Stabilized blood sugar",
      sugarShift: true,
      antibioticAntidote: false,
      idealImmunity: false,
      simpleSlumber: false,
      heartCentered: false,
    },
    {
      feature: "Better sleep (bacterial melatonin)",
      sugarShift: true,
      antibioticAntidote: false,
      idealImmunity: true,
      simpleSlumber: true,
      heartCentered: false,
    },
    {
      feature: "Defense against foodborne pathogens",
      sugarShift: false,
      antibioticAntidote: true,
      idealImmunity: true,
      simpleSlumber: false,
      heartCentered: false,
    },
    {
      feature: "Improved mood",
      sugarShift: true,
      antibioticAntidote: false,
      idealImmunity: true,
      simpleSlumber: false,
      heartCentered: false,
    },
    {
      feature: "Better oral health",
      sugarShift: false,
      antibioticAntidote: true,
      idealImmunity: false,
      simpleSlumber: false,
      heartCentered: false,
    },
    {
      feature: "Production of CoQ10 and Nitric Oxide",
      sugarShift: false,
      antibioticAntidote: false,
      idealImmunity: false,
      simpleSlumber: false,
      heartCentered: true,
    },
    {
      feature: "Anti-fungal properties",
      sugarShift: false,
      antibioticAntidote: false,
      idealImmunity: false,
      simpleSlumber: false,
      heartCentered: true,
    },
    {
      feature: "A calming neurotransmitter",
      sugarShift: false,
      antibioticAntidote: false,
      idealImmunity: false,
      simpleSlumber: true,
      heartCentered: false,
    },
  ];

  const renderIcon = (hasFeature, productType) => {
    return hasFeature ? (
      <CheckIcon
        icon="material-symbols:check-circle"
        productColor={productColors[productType]}
      />
    ) : (
      <CrossIcon icon="material-symbols:cancel" />
    );
  };

  return (
    <TableSection>
      <Container>
        <TableTitle>
          <h2>Discover the perfect probiotic made just for you!</h2>
          <p>
            Velavie's advanced probiotics are designed to support shared
            wellness through targeted, science-backed solutions.
          </p>
        </TableTitle>

        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableHeadRow>
                <TableHeadCell>
                  What does your body need help with?
                </TableHeadCell>
                <TableHeadCell>
                  <ProductName>Sugar Shift</ProductName>
                </TableHeadCell>
                <TableHeadCell>
                  <ProductName>Antibiotic Antidote</ProductName>
                </TableHeadCell>
                <TableHeadCell>
                  <ProductName>Ideal Immunity</ProductName>
                </TableHeadCell>
                <TableHeadCell>
                  <ProductName>Simple Slumber</ProductName>
                </TableHeadCell>
                <TableHeadCell>
                  <ProductName>Heart Centered</ProductName>
                </TableHeadCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.feature}</TableCell>
                  <TableCell>
                    {renderIcon(row.sugarShift, "sugarShift")}
                  </TableCell>
                  <TableCell>
                    {renderIcon(row.antibioticAntidote, "antibioticAntidote")}
                  </TableCell>
                  <TableCell>
                    {renderIcon(row.idealImmunity, "idealImmunity")}
                  </TableCell>
                  <TableCell>
                    {renderIcon(row.simpleSlumber, "simpleSlumber")}
                  </TableCell>
                  <TableCell>
                    {renderIcon(row.heartCentered, "heartCentered")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>
      </Container>
    </TableSection>
  );
};

export default ComparisonTable;
