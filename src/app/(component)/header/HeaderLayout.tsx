"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import media from "@/src/styles/media";

export const HeaderLayout = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid rgba(0, 27, 55, 0.1);
  z-index: 1000;
`;

export const HeaderInner = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const HamburgerButton = styled.button`
  display: none;
  ${media.mobile`
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  `}
`;

export const ContentWrapper = styled(motion.div)`
  display: none;
  ${media.desktop`
    flex: 1;
    margin-left: auto;
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    align-items: center;
    `}
`;

export const MobileContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  overflow: hidden;
  ${media.desktop`
    display: none;
  `}
`;

export const MenuItem = styled.a`
  margin: 0 15px;
  cursor: pointer;
  text-decoration: none;
  color: black;

  ${media.mobile`
    margin: 10px 0;
    text-align: center;
  `}
`;
