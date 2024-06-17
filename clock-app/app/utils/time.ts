export function getIsNighttime(date: Date) {
  const hours = date.getHours();

  return 18 <= hours || hours < 5;
}
