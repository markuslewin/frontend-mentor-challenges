import { useForm } from "@conform-to/react";
import { useId } from "preact/hooks";
import { parseRegisterForm } from "../helpers/validation";

export const RegisterForm = ({ payload, errors }: Props) => {
  const id = useId();
  const [
    form,
    {
      "first-name": firstName,
      "last-name": lastName,
      "email-address": emailAddress,
      password,
    },
  ] = useForm({
    id,
    lastSubmission:
      !payload && !errors
        ? null
        : {
            payload: payload ?? {},
            error: errors ?? {},
            intent: "submit",
          },
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseRegisterForm(formData);
    },
  });

  return (
    <form method="post" {...form.props}>
      <label class="sr-only" for={firstName.id}>
        First Name
      </label>
      <input
        id={firstName.id}
        type="text"
        name={firstName.name}
        autocomplete="given-name"
        required
        placeholder="First Name"
        defaultValue={firstName.defaultValue}
        autofocus={!!firstName.error}
        aria-describedby={firstName.errorId}
        aria-invalid={!!firstName.error}
      />
      <p id={firstName.errorId}>{firstName.error}</p>
      <label class="sr-only" for={lastName.id}>
        Last Name
      </label>
      <input
        id={lastName.id}
        type="text"
        name={lastName.name}
        autocomplete="family-name"
        required
        placeholder="Last Name"
        defaultValue={lastName.defaultValue}
        autofocus={!!lastName.error}
        aria-describedby={lastName.errorId}
        aria-invalid={!!lastName.error}
      />
      <p id={lastName.errorId}>{lastName.error}</p>
      <label class="sr-only" for={emailAddress.id}>
        Email Address
      </label>
      <input
        id={emailAddress.id}
        type="email"
        name={emailAddress.name}
        autocomplete="email"
        required
        placeholder="Email Address"
        defaultValue={emailAddress.defaultValue}
        autofocus={!!emailAddress.error}
        aria-describedby={emailAddress.errorId}
        aria-invalid={!!emailAddress.error}
      />
      <p id={emailAddress.errorId}>{emailAddress.error}</p>
      <label class="sr-only" for={password.id}>
        Password
      </label>
      <input
        id={password.id}
        type="password"
        name={password.name}
        autocomplete="new-password"
        required
        placeholder="Password"
        autofocus={!!password.error}
        aria-describedby={password.errorId}
        aria-invalid={!!password.error}
      />
      <p id={password.errorId}>{password.error}</p>
      <button type="submit" aria-describedby="agreement">
        Claim your free trial
      </button>
      <small id="agreement">
        By clicking the button, you are agreeing to our{" "}
        <a href="#">Terms and Services</a>
      </small>
    </form>
  );
};

type Props = {
  payload:
    | {
        [F in Exclude<Fields, "password">]?: string;
      }
    | undefined;
  errors:
    | {
        [F in Fields]?: string;
      }
    | undefined;
};

type Fields = "first-name" | "last-name" | "email-address" | "password";
