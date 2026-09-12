"use client";
import { useState } from "react";
export default function ClientHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="journal-nav">
        <a
          href="/"
          className="journal-wordmark"
          aria-label="데굴데굴 블로그 홈"
        >
          <span className="rolling-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <strong>BANGUL</strong>
          <span className="nav-caption">A FRONTEND JOURNAL</span>
        </a>
        <nav aria-label="주 메뉴" className="desktop-nav">
          <a href="/#archive">글 모음</a>
          <a href="/#about">소개</a>
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
          <a href="/#archive">글 모음</a>
          <a href="/#about">소개</a>
          <a href="/tool/letter-count">도구</a>
          <a href="https://github.com/hansolbangul">GitHub ↗</a>
        </nav>
      )}
    </>
  );
}
