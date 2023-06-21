import { parse } from "@conform-to/react";

type Schema = {
  "first-name": string;
  "last-name": string;
  "email-address": string;
  password: string;
};

export const parseRegisterForm = (formData: FormData) => {
  return parse<Schema>(formData, {
    resolve({
      "first-name": firstNameInput,
      "last-name": lastNameInput,
      "email-address": emailAddressInput,
      password: passwordInput,
    }) {
      const firstName =
        typeof firstNameInput === "string" ? firstNameInput : "";
      const lastName = typeof lastNameInput === "string" ? lastNameInput : "";
      const emailAddress =
        typeof emailAddressInput === "string" ? emailAddressInput : "";
      const password = typeof passwordInput === "string" ? passwordInput : "";

      const error: Partial<Schema> = {};
      if (!firstName) {
        error["first-name"] = "First Name cannot be empty";
      }
      if (!lastName) {
        error["last-name"] = "Last Name cannot be empty";
      }
      if (!emailAddress) {
        error["email-address"] = "Email Address cannot be empty";
      } else if (
        // from `zod`
        !/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(
          emailAddress
        )
      ) {
        error["email-address"] = "Looks like this is not an email";
      }
      if (!password) {
        error.password = "Password cannot be empty";
      }

      if (
        error["first-name"] ||
        error["last-name"] ||
        error["email-address"] ||
        error.password
      ) {
        return { error };
      }
      return {
        value: {
          "first-name": firstName,
          "last-name": lastName,
          "email-address": emailAddress,
          password,
        },
      };
    },
  });
};
