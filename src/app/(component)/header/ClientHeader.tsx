"use client";

import { useState } from "react";
import {
  HeaderInner,
  HamburgerButton,
  MobileContentWrapper,
  ContentWrapper,
  MenuItem,
} from "@app/(component)/header/HeaderLayout";

export default function ClientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HeaderInner>
        <div>Title</div>
        <HamburgerButton onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </HamburgerButton>
        <ContentWrapper>
          <MenuItem href="#home">Home</MenuItem>
          <MenuItem href="#services">Services</MenuItem>
          <MenuItem href="#about">About</MenuItem>
          <MenuItem href="#contact">Contact</MenuItem>
        </ContentWrapper>
      </HeaderInner>
      <MobileContentWrapper
        initial={{ height: 0 }}
        animate={isMenuOpen ? { height: "auto" } : { height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MenuItem href="#home">Home</MenuItem>
        <MenuItem href="#services">Services</MenuItem>
        <MenuItem href="#about">About</MenuItem>
        <MenuItem href="#contact">Contact</MenuItem>
      </MobileContentWrapper>
    </>
  );
}
