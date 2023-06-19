export const getElementById = <T extends unknown>(
  id: string,
  type: { new (): T }
): T => {
  const element = document.getElementById(id);
  if (element instanceof type) {
    return element;
  }
  throw new Error(`Error finding element by id "${id}"`);
};
