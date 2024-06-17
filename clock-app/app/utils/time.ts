export function getIsNighttime(date: Date) {
  const hours = date.getHours();

  return 18 <= hours || hours < 5;
}

export const greeting = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
};

export function getGreeting(date: Date) {
  const hours = date.getHours();

  if (5 <= hours && hours < 12) {
    return greeting.morning;
  } else if (12 <= hours && hours < 18) {
    return greeting.afternoon;
  } else {
    return greeting.evening;
  }
}
