import { env } from "process";
import { Icon } from "./icon";
import Link from "next/link";

export function Header() {
  return (
    <header id="header" className="mb-4 flex">
      <Link href="/" prefetch={false}>
        <Icon />
      </Link>
      <p className="ml-auto text-neutral-400">
        {env.NEXT_PUBLIC_GITHUB_USERNAME}
      </p>
    </header>
  );
}
