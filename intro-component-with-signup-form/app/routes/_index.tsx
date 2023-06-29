import { Form, useActionData } from "@remix-run/react";
import { type ActionArgs, json, redirect } from "@remix-run/node";
import { useId } from "react";
import { conform, useForm } from "@conform-to/react";
import { parseRegisterForm } from "~/helpers/validation";
import { ErrorIcon } from "~/components/Icon";

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
    onSubmit() {
      // todo: send to server
      location.reload();
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
          {[
            {
              label: "First Name",
              placeholder: "First Name",
              autoComplete: "given-name",
              type: "text",
              config: firstName,
            },
            {
              label: "Last Name",
              placeholder: "Last Name",
              autoComplete: "family-name",
              type: "text",
              config: lastName,
            },
            {
              label: "Email Address",
              placeholder: "Email Address",
              autoComplete: "email",
              type: "text",
              config: emailAddress,
            },
            {
              label: "Password",
              placeholder: "Password",
              autoComplete: "new-password",
              type: "password",
              config: password,
            },
          ].map((field, i) => {
            return (
              <div key={i}>
                <label className="sr-only" htmlFor={field.config.id}>
                  {field.label}
                </label>
                <div
                  className="field"
                  data-invalid={field.config.error ? true : undefined}
                >
                  <input
                    {...conform.input(field.config, {
                      type: field.type,
                      ariaAttributes: true,
                    })}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                  />
                  <ErrorIcon />
                </div>
                <p id={field.config.errorId}>{field.config.error}</p>
              </div>
            );
          })}
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
