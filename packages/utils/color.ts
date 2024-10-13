export function generatePastelColor() {
  const randomValue = () => Math.floor(Math.random() * 128) + 127;
  const r = randomValue();
  const g = randomValue();
  const b = randomValue();
  return `rgb(${r}, ${g}, ${b})`;
}
