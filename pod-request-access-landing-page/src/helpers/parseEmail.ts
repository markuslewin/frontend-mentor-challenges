export const parseEmail = (email: string) => {
  let error = "";
  if (!email) {
    error = "Oops! Please add your email";
  } else if (
    // from `zod`
    !/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(
      email
    )
  ) {
    error = "Oops! Please check your email";
  }
  return {
    value: email,
    error,
  };
};
