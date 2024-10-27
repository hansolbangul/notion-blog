"use client";

import { useParams } from "next/navigation";
import { useGetPageDetail } from "@blog/notions/service/page/usePageService";
import NotionTemplate from "@app/(component)/notion/page/NotionTemplate";

export default function NotionInfoPage() {
  const params = useParams();
  const { data: post } = useGetPageDetail(params.slug);

  return (
    <div className={"-mt-16"}>
      <NotionTemplate post={post} />
    </div>
  );
}
