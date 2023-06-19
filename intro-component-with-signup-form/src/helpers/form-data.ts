export const getEntryValueString = (value: FormDataEntryValue | null) => {
  return typeof value === "string" ? value : "";
};
