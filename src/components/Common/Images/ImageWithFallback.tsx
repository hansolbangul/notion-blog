'use client';

import { useState, ComponentProps } from "react";
import Image from "next/image";

export default function ImageWithFallback(props: ComponentProps<typeof Image>) {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <Image
      {...props}
      src={isImgError ? "/logo.png" : props.src}
      onError={() => setIsImgError(true)}
    />
  );
}
