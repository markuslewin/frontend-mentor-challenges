export function toRootAbsolute(path: string) {
  return path.replace(/^\.\//, "/");
}
