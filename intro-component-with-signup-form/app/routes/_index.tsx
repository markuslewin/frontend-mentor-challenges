import { Form, useActionData } from "@remix-run/react";
import { type ActionArgs, json, redirect } from "@remix-run/node";
import { useId } from "react";
import { useForm } from "@conform-to/react";
import { parseRegisterForm } from "~/helpers/validation";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const submission = parseRegisterForm(formData);

  if (submission.intent !== "submit" || !submission.value) {
    return json({
      ...submission,
      payload: {
        "first-name": submission.payload["first-name"],
        "last-name": submission.payload["last-name"],
        "email-address": submission.payload["email-address"],
        // no password
      },
    });
  }

  // todo: persist
  return redirect("/");
};

export default function Index() {
  const lastSubmission = useActionData<typeof action>();
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
    lastSubmission,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseRegisterForm(formData);
    },
  });

  return (
    <main>
      <div className="intro">
        <h1>Learn to code by watching others</h1>
        <p>
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </div>
      <div className="register">
        <h2 className="sr-only">Claim your free trial</h2>
        <p className="pricing">
          <strong>Try it free 7 days</strong> then $20/mo. thereafter
        </p>
        <Form method="post" {...form.props}>
          <label className="sr-only" htmlFor={firstName.id}>
            First Name
          </label>
          <input
            id={firstName.id}
            type="text"
            name={firstName.name}
            autoComplete="given-name"
            required
            placeholder="First Name"
            defaultValue={firstName.defaultValue}
            autoFocus={!!firstName.error}
            aria-describedby={firstName.errorId}
            aria-invalid={!!firstName.error}
          />
          <p id={firstName.errorId}>{firstName.error}</p>
          <label className="sr-only" htmlFor={lastName.id}>
            Last Name
          </label>
          <input
            id={lastName.id}
            type="text"
            name={lastName.name}
            autoComplete="family-name"
            required
            placeholder="Last Name"
            defaultValue={lastName.defaultValue}
            autoFocus={!!lastName.error}
            aria-describedby={lastName.errorId}
            aria-invalid={!!lastName.error}
          />
          <p id={lastName.errorId}>{lastName.error}</p>
          <label className="sr-only" htmlFor={emailAddress.id}>
            Email Address
          </label>
          <input
            id={emailAddress.id}
            type="email"
            name={emailAddress.name}
            autoComplete="email"
            required
            placeholder="Email Address"
            defaultValue={emailAddress.defaultValue}
            autoFocus={!!emailAddress.error}
            aria-describedby={emailAddress.errorId}
            aria-invalid={!!emailAddress.error}
          />
          <p id={emailAddress.errorId}>{emailAddress.error}</p>
          <label className="sr-only" htmlFor={password.id}>
            Password
          </label>
          <input
            id={password.id}
            type="password"
            name={password.name}
            autoComplete="new-password"
            required
            placeholder="Password"
            autoFocus={!!password.error}
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
        </Form>
      </div>
    </main>
  );
}
