import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * @param {string} name query 이름
 * @param {string} value? query 값
 */

export default function useQuery() {
  const router = useRouter();
  const pathName = usePathname();
  const query = useSearchParams();

  function get(name: string) {
    return query.get(name);
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(query);
      params.set(name, value);

      return params.toString();
    },
    [query]
  );

  function set(name: string, value: string) {
    router.push(pathName + "?" + createQueryString(name, value));
  }

  return { get, set };
}
