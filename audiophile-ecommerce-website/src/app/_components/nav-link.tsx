"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentPropsWithoutRef } from "react";

type NavLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      aria-current={pathname === props.href ? "page" : undefined}
      {...props}
    />
  );
}
