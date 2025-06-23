import styled from "styled-components";

const Container = styled.div`
  max-width: 1536px;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;

  @media (max-width: 1920px) and (min-width: 1537px) {
    max-width: 1536px;
  }
  @media (max-width: 1536px) and (min-width: 1281px) {
    max-width: 1280px;
  }
  @media (max-width: 1280px) and (min-width: 1025px) {
    max-width: 1024px;
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    max-width: 768px;
  }
  @media (max-width: 768px) and (min-width: 640px) {
    max-width: 640px;
  }
  @media (max-width: 639px) {
    max-width: 100%;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 0;
  }
`;

export default Container;
