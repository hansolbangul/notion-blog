import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { PostDetail } from "../types";
import { queryKey } from "../constants/queryKey";

const usePostQuery = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useQuery<PostDetail>({
    queryKey: queryKey.post(`${slug}`),
    enabled: false,
  });

  return data;
};

export default usePostQuery;
