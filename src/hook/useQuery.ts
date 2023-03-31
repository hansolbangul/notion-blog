import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  function set(name: string, value: string) {
    router.push(pathName + "?" + `${name}=${value}`);
  }
  return { get, set };
}
