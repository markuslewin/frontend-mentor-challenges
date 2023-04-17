export const getAdvice = async (init?: Parameters<typeof fetch>[1]) => {
  const response = await fetch("https://api.adviceslip.com/advice", init);
  const adviceObject = (await response.json()) as unknown;
  if (
    !(
      typeof adviceObject === "object" &&
      adviceObject !== null &&
      "slip" in adviceObject &&
      typeof adviceObject.slip === "object" &&
      adviceObject.slip !== null &&
      "id" in adviceObject.slip &&
      typeof adviceObject.slip.id === "number" &&
      "advice" in adviceObject.slip &&
      typeof adviceObject.slip.advice === "string"
    )
  ) {
    throw new Error("Unexpected shape of response");
  }

  const {
    slip: { advice, id },
  } = adviceObject;

  return { slip: { advice, id } };
};
