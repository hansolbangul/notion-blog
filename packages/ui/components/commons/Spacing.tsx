interface Props {
  size: number;
}

export default function Spacing({ size }: Props) {
  return (
    <div
      style={{
        height: `${size}px`,
        flex: "none",
      }}
    />
  );
}
