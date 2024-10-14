import Lottie from "react-lottie-player";
import errorLottie from "../../lotties/404errorLottie.json";

export default function NotFoundErrorLottie() {
  return <Lottie loop animationData={errorLottie} play />;
}
