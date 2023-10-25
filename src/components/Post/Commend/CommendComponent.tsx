import Image from "next/image";
import Text from "@elements/Text";
import Link from "next/link";

interface Props {
  slug: string;
  thumbnail: string;
  title: string;
}

const CommendComponent = ({ slug, thumbnail, title }: Props) => {
  return (
    <>
      <Link href={`/post/${slug}`}>
        <Image
          className="rounded-lg object-cover"
          fill
          sizes="(max-width: 768px) 100%"
          src={thumbnail}
          alt="commend_thumbnail"
        />
        <div className="w-full absolute pt-[60px] md:pb-[24px] md:px-[34px] pb-[12px] px-[16px] bottom-0 bg-gradient-custom z-10">
          <Text.H2 className="text-white text-3xl mt-2 font-bold truncate">{title}</Text.H2>
        </div>
      </Link>
    </>
  );
};

export default CommendComponent;
