import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * @param {string} name query 이름
 * @param {string} value? query 값
 */

function saveScrollPos(url: string) {
  const scrollPos = { x: window.scrollX, y: window.scrollY };
  sessionStorage.setItem(url, JSON.stringify(scrollPos));
}

function clearScrollPos(url: string) {
  sessionStorage.setItem(url, JSON.stringify({ x: 0, y: 0 }));
}

function restoreScrollPos(url: string) {
  const json = sessionStorage.getItem(url);
  const scrollPos = json ? JSON.parse(json) : undefined;
  if (scrollPos) {
    window.scrollTo(scrollPos.x, scrollPos.y);
  }
}

export default function useRouterQuery() {
  const router = useRouter();
  const pathName = usePathname();
  const query = useSearchParams();

  function get(name: string) {
    return query.get(name);
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(query.toString());
      params.set(name, value);

      return params.toString();
    },
    [query],
  );

  function set(name: string, value: string) {
    router.push(pathName + "?" + createQueryString(name, value));
  }

  function customSet(path: string, name: string, value: string) {
    router.push(path + "?" + createQueryString(name, value));
  }

  function push(url: string, cache: boolean) {
    if (cache) {
      saveScrollPos(window.location.pathname);
    } else {
      clearScrollPos(url);
    }
    router.push(url);
  }

  return { get, set, push, customSet };
}
