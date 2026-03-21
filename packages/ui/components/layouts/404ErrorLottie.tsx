import Lottie from "react-lottie-player";
import errorLottie from "../../lotties/404errorLottie.json";

export default function NotFoundErrorLottie() {
  return (
    <div className="mx-auto w-full max-w-[780px]">
      <Lottie
        loop
        animationData={errorLottie}
        play
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
