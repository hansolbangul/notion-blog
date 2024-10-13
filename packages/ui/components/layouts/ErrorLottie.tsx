import Lottie from "react-lottie-player";
import errorLottie from "../../lotties/errorLottie.json";

export default function ErrorLottie() {
  return <Lottie loop animationData={errorLottie} play />;
}
