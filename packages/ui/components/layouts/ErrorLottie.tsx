"use client";

import { CSSProperties, ComponentType, useEffect, useState } from "react";
import errorLottie from "../../lotties/errorLottie.json";

type LottiePlayerProps = {
  loop?: boolean;
  animationData: unknown;
  play?: boolean;
  style?: CSSProperties;
};

export default function ErrorLottie() {
  const [player, setPlayer] = useState<{
    Component: ComponentType<LottiePlayerProps>;
  } | null>(null);

  useEffect(() => {
    let mounted = true;

    import("react-lottie-player").then((module) => {
      if (mounted) {
        setPlayer({
          Component: module.default as ComponentType<LottiePlayerProps>,
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[780px]">
      {player ? (
        <player.Component
          loop
          animationData={errorLottie}
          play
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div className="aspect-[4/3] w-full" />
      )}
    </div>
  );
}
