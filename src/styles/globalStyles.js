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
