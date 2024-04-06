export function renderPassword(password: string | undefined) {
  return password ? password : "\u00A0";
}
