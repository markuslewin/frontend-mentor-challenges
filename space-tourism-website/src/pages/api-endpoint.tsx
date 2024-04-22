import { useState, useEffect } from "react";

export function ApiEndpoint() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/message")
      .then((response) => response.text())
      .then((text) => {
        if (ignore) return;

        setMessage(text);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <h1 className="text-heading-l">API endpoint</h1>
      <p className="mt-8">The following is a message from the server:</p>
      <pre className="mt-4">{message === null ? "Loading..." : message}</pre>
    </>
  );
}
