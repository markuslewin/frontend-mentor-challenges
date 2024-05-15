import { useState, useEffect } from "react";
import { AnnouncementHandle } from "../components/route-announcer";

export const handle = {
  announcement() {
    return "API endpoint";
  },
} satisfies AnnouncementHandle;

export function ApiEndpoint() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/.netlify/functions/message")
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