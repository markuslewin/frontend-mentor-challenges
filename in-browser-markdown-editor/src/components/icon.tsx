export default function Icon({
  name,
  className,
  ...props
}: {
  className?: string;
  name: "icon-delete" | "icon-document" | "icon-menu" | "icon-save" | "logo";
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`forced-color-adjust-auto ${className}`}
      {...props}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
