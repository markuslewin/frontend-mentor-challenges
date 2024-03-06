const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWZYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "!()-.?[]_`~;:!@#$%^&*+=";

export function getCharacterSet(settings: {
  "include-uppercase": boolean;
  "include-lowercase": boolean;
  "include-numbers": boolean;
  "include-symbols": boolean;
}) {
  return (
    (settings["include-uppercase"] ? uppercaseLetters : "") +
    (settings["include-lowercase"] ? lowercaseLetters : "") +
    (settings["include-numbers"] ? numbers : "") +
    (settings["include-symbols"] ? symbols : "")
  );
}

export function getStrength(settings: {
  length: number;
  "include-uppercase": boolean;
  "include-lowercase": boolean;
  "include-numbers": boolean;
  "include-symbols": boolean;
}) {
  const characterSet = getCharacterSet(settings);
  const score = characterSet.length ** settings.length;
  if (2.15e28 < score) {
    return "Strong";
  }
  if (8.39e17 < score) {
    return "Medium";
  }
  if (14776336 < score) {
    return "Weak";
  }
  return "Too weak!";
}
