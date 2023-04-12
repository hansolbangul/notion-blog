import { useEffect } from "react";

function saveScrollPos(url: string) {
  const scrollPos = { x: window.scrollX, y: window.scrollY };
  sessionStorage.setItem(url, JSON.stringify(scrollPos));
}

function restoreScrollPos(url: string) {
  const json = sessionStorage.getItem(url);
  const scrollPos = json ? JSON.parse(json) : undefined;
  if (scrollPos) {
    window.scrollTo(scrollPos.x, scrollPos.y);
  }
}

export default function useScrollRestoration(router: string) {
  useEffect(() => {
    restoreScrollPos(router);
  }, [router]);
}
