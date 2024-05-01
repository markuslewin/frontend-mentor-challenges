export function clamp({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) {
  return Math.max(min, Math.min(max - 1, value));
}
