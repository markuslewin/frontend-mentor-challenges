import { getEntryValueString } from "./form-data";

export const parseRegisterForm = (formData: FormData) => {
  const firstName = getEntryValueString(formData.get("first-name"));
  const lastName = getEntryValueString(formData.get("last-name"));
  const emailAddress = getEntryValueString(formData.get("email-address"));
  const password = getEntryValueString(formData.get("password"));

  const errors: {
    [K in "first-name" | "last-name" | "email-address" | "password"]?: string;
  } = {};
  if (!firstName) {
    errors["first-name"] = "First Name cannot be empty";
  }
  if (!lastName) {
    errors["last-name"] = "Last Name cannot be empty";
  }
  if (!emailAddress) {
    errors["email-address"] = "Email Address cannot be empty";
  } else if (
    // from `zod`
    !/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(
      emailAddress
    )
  ) {
    errors["email-address"] = "Looks like this is not an email";
  }
  if (!password) {
    errors.password = "Password cannot be empty";
  }

  if (Object.keys(errors).length) {
    return { errors };
  }
  return {
    values: {
      "first-name": firstName,
      "last-name": lastName,
      "email-address": emailAddress,
      password,
    },
  };
};
