export function randomNumber(min = 1, max = 10): number {
  const maxRandom = max - min;
  return min + Math.round(Math.random() * maxRandom);
}

export const lottoNumber = randomNumber.apply.bind(
  randomNumber,
  null,
  [1, 46],
) as () => number;
