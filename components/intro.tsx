import { ELANCO_LINK, UOP_LINK } from "@/lib/constants";

function IntroLink({
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
      <p>
        Hi there, I&apos;m <b>Leo</b>. I&apos;m a Software Engineering student{" "}
        {"@ "}
        <IntroLink href={UOP_LINK}>
          <b>UoP</b>
        </IntroLink>{" "}
        currently on placement {"@ "}
        <IntroLink href={ELANCO_LINK}>
          <b>Elanco</b>
        </IntroLink>
        . I&apos;m passionate about <b>coding</b> and <b>building things</b>. I
        enjoy <b>full-stack web development</b>, developing <b>CLI tools</b>,
        and everything else <b>code</b>.
      </p>
    </section>
  );
}
