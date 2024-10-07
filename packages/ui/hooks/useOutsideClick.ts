import { RefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: RefObject<HTMLDivElement | HTMLButtonElement>,
  callback: () => void,
) {
  const handleClick = (e: Event) => {
    const targetDiv = e.target as HTMLDivElement;
    if (ref.current && !ref.current.contains(targetDiv)) {
      callback();
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    document.addEventListener("click", handleClick);

    return () => {
      if (!ref.current) return;
      document.removeEventListener("click", handleClick);
    };
  }, [ref.current]);
}
