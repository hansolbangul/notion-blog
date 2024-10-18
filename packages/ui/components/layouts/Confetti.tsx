import Lottie from "react-lottie-player";
import lottie from "../../lotties/confetti.json";

export default function Confetti() {
  return <Lottie animationData={lottie} play />;
}
