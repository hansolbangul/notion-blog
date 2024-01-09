import { TPosts } from "@/src/types";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Autoplay } from "swiper/modules";
import useSwiperProgress from "@/src/hook/useSwiperProgress";
import ComponentTitle from "@common/ComponentTitle";

import "swiper/css";
import CommendComponent from "./CommendComponent";

type Props = {
  commendPosts: TPosts;
};

const Commend = ({ commendPosts }: Props) => {
  const [isSwiper, setIsSwiper] = useState<SwiperCore>();

  const { progress, onAutoplayTimeLeft } = useSwiperProgress();

  const nextCommend = () => {
    isSwiper?.slideNext();
  };

  const prevCommend = () => {
    isSwiper?.slidePrev();
  };

  if (!commendPosts.length) return null;

  return (
    <ComponentTitle
      title={"Tech"}
      rightBtn={
        <div className="flex space-x-4">
          <FaArrowLeftLong onClick={prevCommend} className="text-bold cursor-pointer w-8 h-8" />
          <FaArrowRightLong onClick={nextCommend} className="text-bold cursor-pointer w-8 h-8" />
        </div>
      }
    >
      <Swiper
        className="w-full aspect-video md:h-96 relative cursor-pointer rounded-lg"
        spaceBetween={50}
        loop
        onSwiper={(swiper) => setIsSwiper(swiper)}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        pagination={{
          type: "fraction",
        }}
      >
        {commendPosts.map((post) => (
          <SwiperSlide key={post.id} className="w-full">
            <CommendComponent slug={post.slug} thumbnail={post.thumbnail || ""} title={post.title} />
          </SwiperSlide>
        ))}
        {progress}
      </Swiper>
    </ComponentTitle>
  );
};

export default Commend;
