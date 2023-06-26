import { Form, useActionData } from "@remix-run/react";
import { type ActionArgs, json, redirect } from "@remix-run/node";
import { useId } from "react";
import { conform, useForm } from "@conform-to/react";
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
    constraint: {
      "first-name": {
        required: true,
      },
      "last-name": {
        required: true,
      },
      "email-address": {
        required: true,
      },
      password: {
        required: true,
      },
    },
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
            {...conform.input(firstName, {
              type: "text",
              ariaAttributes: true,
            })}
            autoComplete="given-name"
            placeholder="First Name"
          />
          <p id={firstName.errorId}>{firstName.error}</p>
          <label className="sr-only" htmlFor={lastName.id}>
            Last Name
          </label>
          <input
            {...conform.input(lastName, { type: "text", ariaAttributes: true })}
            autoComplete="family-name"
            placeholder="Last Name"
          />
          <p id={lastName.errorId}>{lastName.error}</p>
          <label className="sr-only" htmlFor={emailAddress.id}>
            Email Address
          </label>
          <input
            {...conform.input(emailAddress, {
              type: "text",
              ariaAttributes: true,
            })}
            autoComplete="email"
            placeholder="Email Address"
          />
          <p id={emailAddress.errorId}>{emailAddress.error}</p>
          <label className="sr-only" htmlFor={password.id}>
            Password
          </label>
          <input
            {...conform.input(password, {
              type: "password",
              ariaAttributes: true,
            })}
            autoComplete="new-password"
            placeholder="Password"
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
