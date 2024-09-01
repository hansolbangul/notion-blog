import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
  thumbnail: string;
  title: string;
}

const RecommendComponent = ({ slug, thumbnail, title }: Props) => {
  return (
    <Link href={`/post/${slug}`} className="relative block w-full h-full">
      <Image
        className="rounded-lg object-cover brightness-30"
        fill
        sizes="(max-width: 768px) 100%"
        src={thumbnail}
        alt="commend_thumbnail"
        style={{ filter: "brightness(0.5)" }}
      />
      <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-body16 font-bold text-white z-10">
        "{title}"
      </h2>
    </Link>
  );
};

export default RecommendComponent;
