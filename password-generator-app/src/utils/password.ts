const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWZYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "!()-.?[]_`~;:!@#$%^&*+=";

export function generatePassword(settings: Settings) {
  const characterSet = getCharacterSet(settings);
  const password = [...Array(settings.length).keys()]
    .map(() => characterSet.at(getRandomInt(characterSet.length)))
    .join("");
  return password;
}

export function getStrength(settings: Settings) {
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

function getCharacterSet(settings: Settings) {
  return (
    (settings["include-uppercase"] ? uppercaseLetters : "") +
    (settings["include-lowercase"] ? lowercaseLetters : "") +
    (settings["include-numbers"] ? numbers : "") +
    (settings["include-symbols"] ? symbols : "")
  );
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type Settings = {
  length: number;
  "include-uppercase": boolean;
  "include-lowercase": boolean;
  "include-numbers": boolean;
  "include-symbols": boolean;
};
