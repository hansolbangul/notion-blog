"use client";
import { useState } from "react";
export default function ClientHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="journal-nav">
        <a href="/" className="journal-wordmark" aria-label="istp.builders 홈">
          <img
            className="brand-icon"
            src="/brand/chibi-icon-v1.svg"
            alt=""
            width="38"
            height="38"
          />
          <strong>istp.builders</strong>
        </a>
        <nav aria-label="주 메뉴" className="desktop-nav">
          <a href="/#archive">기록</a>
          <a href="/services">서비스</a>

          <a href="/tool/letter-count">도구</a>
          <a
            href="https://github.com/hansolbangul"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
        <button
          className="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen(!open)}
        >
          {open ? "닫기 −" : "메뉴 +"}
        </button>
      </div>
      {open && (
        <nav
          className="mobile-nav"
          aria-label="모바일 메뉴"
          onClick={() => setOpen(false)}
        >
          <a href="/#archive">기록</a>
          <a href="/services">서비스</a>

          <a href="/tool/letter-count">도구</a>
          <a href="https://github.com/hansolbangul">GitHub ↗</a>
        </nav>
      )}
    </>
  );
}
