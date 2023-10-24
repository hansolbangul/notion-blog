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
        <div className="w-full absolute pt-[60px] pb-[24px] px-[34px] bottom-0 bg-gradient-custom z-10 truncate">
          <Text.H2 className="text-white text-3xl mt-2 font-bold">{title}</Text.H2>
        </div>
      </Link>
    </>
  );
};

export default CommendComponent;
