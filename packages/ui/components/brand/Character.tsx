export default function Character({
  pose = "front",
  className = "",
}: {
  pose?: "front" | "side" | "back";
  className?: string;
}) {
  return (
    <div
      className={`box-character box-character-${pose} ${className}`}
      role="img"
      aria-label="박스 머리를 쓴 istp.builders 캐릭터"
    />
  );
}
