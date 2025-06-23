import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    *, ::after, ::before {
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
        overflow-x: hidden;
        touch-action: manipulation;
    }
    body {
        margin: 0;
        font-family: ${({ theme }) => theme.fonts.body};
        font-size: ${({ theme }) => theme.fontSizes.body};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
        line-height: ${({ theme }) => theme.lineHeights.body};
        color: ${({ theme }) => theme.colors.body};
    }
    @media screen and (min-width: 3001px) {
        body {
            zoom: 1.7;
        }
      }
      @media screen and (max-width: 3000px) and (min-width: 2801px) {
        body {
            zoom: 1.6;
        }
      }
      @media screen and (max-width: 2800px) and (min-width: 2601px) {
        body {
            zoom: 1.5;
        }
      }
      @media screen and (max-width: 2600px) and (min-width: 2401px) {
        body {
            zoom: 1.4;
        }
      }
      @media screen and (max-width: 2400px) and (min-width: 2201px) {
        body {
            zoom: 1.3;
        }
      }
      @media only screen and (max-width: 2200px) and (min-width: 2001px) {
        body {
            zoom: 1.2;
        }
      }
      @media only screen and (max-width: 2000px) and (min-width: 1801px) {
        body {
            zoom: 1.1;
        }
      }
      @media only screen and (max-width: 1600px) and (min-width: 1201px) {
        body {
            zoom: normal;
        }
      }
    h1, h2, h3, h4, h5, h6 {
        font-family: ${({ theme }) => theme.fonts.heading};
        color: ${({ theme }) => theme.colors.primary};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        line-height: ${({ theme }) => theme.lineHeights.heading};
        margin: 0;
    }
    h1 { font-size: ${({ theme }) => theme.fontSizes.h1}; }
    h2 { font-size: ${({ theme }) => theme.fontSizes.h2}; }
    h3 { font-size: ${({ theme }) => theme.fontSizes.h3}; }
    h4 { font-size: ${({ theme }) => theme.fontSizes.h4}; }
    h5 { font-size: ${({ theme }) => theme.fontSizes.h5}; }
    h6 { font-size: ${({ theme }) => theme.fontSizes.h6}; }
    a, button {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        transition: all 0.3s ease-out;

        &:hover {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        }

        &:focus {
        outline: none;
        box-shadow: none;
        }
    }
        img, .img {
    max-width: 100%;
    transition: all 0.3s ease-out;
  }

  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
    transition: all 0.3s ease-out;
  }

  p {
    margin: 0;
  }

  button, input, textarea {
    &:focus {
      outline: 0;
    }
  }
`;

export default GlobalStyle;
