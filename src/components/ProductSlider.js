import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Container from "./Container";
import products from "../data/product.json";
import { useImagePath } from "../context/ImagePathContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Styled Components
const ProductArea = styled.div`
  padding: 80px 0;

  @media (max-width: 767px) {
    padding: 40px 0;
  }
`;

const ProductBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  h2 {
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  position: relative;

  .swiper-wrapper {
    padding: 2rem 0 8rem;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 45px;
    height: 45px;
    background: ${({ theme }) => theme.colors.white || "#ffffff"};
    border: 2px solid ${({ theme }) => theme.colors.primary || "#1d3e57"};
    border-radius: 50%;
    position: absolute;
    top: auto;
    bottom: 30px;
    margin-top: 0;
    box-shadow: 0 4px 15px rgba(29, 62, 87, 0.15);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 10;
    cursor: pointer;

    &:after {
      font-size: 16px;
      font-weight: 900;
      color: ${({ theme }) => theme.colors.primary || "#1d3e57"};
    }

    &:hover {
      background: ${({ theme }) => theme.colors.primary || "#1d3e57"};
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(29, 62, 87, 0.25);

      &:after {
        color: ${({ theme }) => theme.colors.white || "#ffffff"};
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  .swiper-button-prev {
    left: calc(50% - 60px);
    right: auto;
  }

  .swiper-button-next {
    right: calc(50% - 60px);
    left: auto;
  }

  .swiper-button-disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      background: ${({ theme }) => theme.colors.white || "#ffffff"};
      transform: none;
      box-shadow: 0 4px 15px rgba(29, 62, 87, 0.15);

      &:after {
        color: ${({ theme }) => theme.colors.primary || "#1d3e57"};
      }
    }
  }

  @media (max-width: 768px) {
    .swiper-wrapper {
      padding: 2rem 0 6rem;
    }

    .swiper-button-next,
    .swiper-button-prev {
      width: 40px;
      height: 40px;
      bottom: 20px;

      &:after {
        font-size: 14px;
      }
    }

    .swiper-button-prev {
      left: calc(50% - 50px);
    }

    .swiper-button-next {
      right: calc(50% - 50px);
    }
  }
`;

const ProductSlide = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    max-width: 100%; // Remove fixed 300px constraint
    padding: 15px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 15px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08),
      0 0 0 1px rgba(29, 62, 87, 0.1);
    background: linear-gradient(145deg, #ffffff 0%, #f0f2f5 100%);

    &::before {
      left: 100%;
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    overflow: hidden;
    background: radial-gradient(circle at center, #fafbfc 0%, #f1f3f4 100%);

    @media (max-width: 768px) {
      max-width: 100%;
      height: 100%;
    }

    @media (max-width: 480px) {
      max-width: 100%;
      height: 100%;
    }
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: brightness(1) saturate(1);
  }

  .product-image-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0;
    transform: scale(1.1);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: brightness(1.05) saturate(1.1);
  }

  &:hover .product-image {
    opacity: 0;
    transform: scale(0.95);
  }

  &:hover .product-image-hover {
    opacity: 1;
    transform: scale(1);
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    transition: all 0.3s ease;
  }

  &:hover .content-wrapper {
    transform: translateY(-2px);
  }
`;

const ProductTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;

  @media (max-width: 991px) {
    font-size: 1.1rem;
  }
`;

const ProductType = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 0.05em;
  opacity: 0.8;
  transition: opacity 0.3s ease;
`;

const ProductButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #154a6b 100%
  );
  color: #fff;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: 14px 24px;
  border-radius: 12px;
  text-transform: capitalize;
  text-decoration: none;
  border: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(29, 62, 87, 0.3),
      0 4px 12px rgba(29, 62, 87, 0.2);
    background: linear-gradient(
      135deg,
      #1a4a6b 0%,
      ${({ theme }) => theme.colors.primary} 100%
    );
    color: ${({ theme }) => theme.colors.white};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 991px) {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 10px;
  }
`;

const ProductSlider = ({ hideTitle = false }) => {
  const imagePath = useImagePath();

  return (
    <ProductArea>
      <Container>
        <ProductBox>
          {!hideTitle && <h2>Explore Our Probiotic Range</h2>}
          <StyledSwiper
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={15}
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductSlide>
                  <div className="image-container">
                    {/* Main product image */}
                    <img
                      className="product-image"
                      src={`${imagePath}${product.slideshowImages[0]}`}
                      srcSet={
                        product.slideshowImages.length >= 3
                          ? `
                            ${imagePath}${product.slideshowImages[0]} 1x,
                            ${imagePath}${product.slideshowImages[1]} 2x,
                            ${imagePath}${product.slideshowImages[2]} 3x
                          `
                          : product.slideshowImages.length === 2
                          ? `
                            ${imagePath}${product.slideshowImages[0]} 1x,
                            ${imagePath}${product.slideshowImages[1]} 2x
                          `
                          : `${imagePath}${product.slideshowImages[0]} 1x`
                      }
                      alt={product.productName}
                    />

                    {/* Hover image (second image from slideshow) */}
                    {product.slideshowImages.length > 3 && (
                      <img
                        className="product-image-hover"
                        src={`${imagePath}${product.slideshowImages[3]}`}
                        srcSet={
                          product.slideshowImages.length >= 6
                            ? `
                              ${imagePath}${product.slideshowImages[3]} 1x,
                              ${imagePath}${product.slideshowImages[4]} 2x,
                              ${imagePath}${product.slideshowImages[5]} 3x
                            `
                            : product.slideshowImages.length === 5
                            ? `
                              ${imagePath}${product.slideshowImages[3]} 1x,
                              ${imagePath}${product.slideshowImages[4]} 2x
                            `
                            : `${imagePath}${product.slideshowImages[3]} 1x`
                        }
                        alt={`${product.productName} - Alternative view`}
                      />
                    )}
                  </div>

                  <div className="content-wrapper">
                    <ProductTitle>{product.productName}</ProductTitle>
                    <ProductType>{product.productType}</ProductType>
                    <ProductButton to={`/product/${product.id}`}>
                      Shop now
                    </ProductButton>
                  </div>
                </ProductSlide>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </ProductBox>
      </Container>
    </ProductArea>
  );
};

export default ProductSlider;
