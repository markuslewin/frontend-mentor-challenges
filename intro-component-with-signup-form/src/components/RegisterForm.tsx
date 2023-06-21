export const RegisterForm = ({ payload, errors }: Props) => {
  return (
    <form method="post" noValidate>
      <label class="sr-only" for="first-name">
        First Name
      </label>
      <input
        id="first-name"
        type="text"
        name="first-name"
        autocomplete="given-name"
        required
        placeholder="First Name"
        value={payload?.["first-name"]}
        autofocus={!!errors?.["first-name"]}
        aria-describedby="first-name-error"
        aria-invalid={!!errors?.["first-name"]}
      />
      <p id="first-name-error">{errors?.["first-name"]}</p>
      <label class="sr-only" for="last-name">
        Last Name
      </label>
      <input
        id="last-name"
        type="text"
        name="last-name"
        autocomplete="family-name"
        required
        placeholder="Last Name"
        value={payload?.["last-name"]}
        autofocus={!!errors?.["last-name"]}
        aria-describedby="last-name-error"
        aria-invalid={!!errors?.["last-name"]}
      />
      <p id="last-name-error">{errors?.["last-name"]}</p>
      <label class="sr-only" for="email-address">
        Email Address
      </label>
      <input
        id="email-address"
        type="email"
        name="email-address"
        autocomplete="email"
        required
        placeholder="Email Address"
        value={payload?.["email-address"]}
        autofocus={!!errors?.["email-address"]}
        aria-describedby="email-address-error"
        aria-invalid={!!errors?.["email-address"]}
      />
      <p id="email-address-error">{errors?.["email-address"]}</p>
      <label class="sr-only" for="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        autocomplete="new-password"
        required
        placeholder="Password"
        autofocus={!!errors?.["password"]}
        aria-describedby="password-error"
        aria-invalid={!!errors?.["password"]}
      />
      <p id="password-error">{errors?.["password"]}</p>
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
