const poses = {
  front: { viewBox: "50 95 330 520", label: "서 있는" },
  side: { viewBox: "430 155 385 460", label: "노트북으로 작업하는" },
  back: { viewBox: "790 820 450 290", label: "엎드려 쉬는" },
  thinking: { viewBox: "850 90 360 525", label: "생각하는" },
  excited: { viewBox: "30 660 360 480", label: "두 손을 든" },
  crouching: { viewBox: "420 720 350 425", label: "쭈그려 앉은" },
};

export default function Character({
  pose = "front",
  className = "",
}: {
  pose?: keyof typeof poses;
  className?: string;
}) {
  const { viewBox, label } = poses[pose];
  return (
    <svg
      className={`box-character box-character-${pose} ${className}`}
      viewBox={viewBox}
      role="img"
      aria-label={`${label} 2등신 박스 캐릭터`}
    >
      <image href="/brand/chibi-poses-v1.png" width="1254" height="1254" />
    </svg>
  );
}
