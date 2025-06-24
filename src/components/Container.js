import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
  @media (min-width: 1601px) {
    max-width: 1536px;
  }

  @media (max-width: 1600px) {
    max-width: 1400px;
  }

  @media (max-width: 1400px) {
    max-width: 1200px;
  }

  @media (max-width: 1200px) {
    max-width: 1024px;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (max-width: 480px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  @media (max-width: 320px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

export default Container;
