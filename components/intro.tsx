import { INTRO } from "@/lib/config";
import { env } from "@/lib/env";

export function IntroLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a target="_blank" className="link" href={href}>
      {children}
    </a>
  );
}

export function Intro() {
  return (
    <section id="intro" className="mt-8 text-justify">
      {INTRO}
    </section>
  );
}
