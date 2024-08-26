"use client";

import styled from "styled-components";
import { Swiper } from "swiper/react";

export const CommendSwiper = styled(Swiper)`
  margin: 20px 0;
  width: 100%;
  height: 120px;
  border-radius: 8px;
`;

export const RecommendTitle = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;

  ${({ theme }) => theme.font.body16_bold};
  color: ${({ theme }) => theme.colors.white};
  z-index: 10;
`;

export const RecommendLink = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
`;
