import { micromark } from "micromark";
import { useMemo } from "react";

export default function Preview({
  className,
  content,
}: {
  className?: string;
  content: string;
}) {
  const markdown = useMemo(() => {
    return micromark(content);
  }, [content]);

  return (
    <div
      className={`${className} preview w-full max-w-[45rem] mx-auto`}
      dangerouslySetInnerHTML={{
        __html: markdown,
      }}
    />
  );
}
