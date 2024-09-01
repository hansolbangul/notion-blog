"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import RecommendComponent from "./RecommendComponent";
import { TPosts } from "@blog/notions/types";
import useSwiperProgress from "@blog/notions/hook/useSwiperProgress";

type Props = {
  commendPosts: TPosts;
};

const RecommendSwiper = ({ commendPosts }: Props) => {
  const { progress } = useSwiperProgress();

  return (
    <Swiper
      spaceBetween={50}
      loop
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        type: "fraction",
      }}
      className="my-5 w-full h-[120px] rounded-lg px-4"
    >
      {commendPosts.map((post) => (
        <SwiperSlide key={post.id} className="w-full px-4">
          <RecommendComponent
            slug={post.slug}
            thumbnail={post.thumbnail || ""}
            title={post.title}
          />
        </SwiperSlide>
      ))}
      {progress}
    </Swiper>
  );
};

export default RecommendSwiper;
