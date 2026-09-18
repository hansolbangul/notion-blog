const poses = {
  front: { file: "standing", width: 306, height: 489, label: "서 있는" },
  side: {
    file: "coding",
    width: 349,
    height: 434,
    label: "노트북으로 작업하는",
  },
  back: { file: "resting", width: 443, height: 255, label: "엎드려 쉬는" },
  thinking: { file: "thinking", width: 325, height: 495, label: "생각하는" },
  excited: { file: "excited", width: 343, height: 469, label: "두 손을 든" },
  crouching: {
    file: "crouching",
    width: 319,
    height: 410,
    label: "쭈그려 앉은",
  },
};

export default function Character({
  pose = "front",
  className = "",
}: {
  pose?: keyof typeof poses;
  className?: string;
}) {
  const { file, width, height, label } = poses[pose];
  return (
    <img
      className={`box-character box-character-${pose} ${className}`}
      src={`/brand/chibi/${file}.webp`}
      width={width}
      height={height}
      alt={`${label} 2등신 박스 캐릭터`}
      decoding="async"
    />
  );
}
