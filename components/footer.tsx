import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from "@/lib/constants";
import { env } from "@/lib/env";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaSitemap,
  FaRss,
} from "react-icons/fa6";

export function Footer() {
  const url = env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + env.NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";

  const links = [
    { href: `${url}/sitemap.xml`, icon: <FaSitemap /> },
    { href: `${url}/feed.xml`, icon: <FaRss /> },
    { href: GITHUB_LINK, icon: <FaGithub /> },
    {
      href: LINKEDIN_LINK,
      icon: <FaLinkedin />,
    },
    { href: TWITTER_LINK, icon: <FaXTwitter /> },
  ];

  return (
    <div className="pt-10">
      <footer id="footer" className="my-4 flex border-t-2 border-neutral-400">
        <div className="ml-auto mt-4 flex gap-4 text-neutral-400">
          {links.map((link, index) => (
            <a key={index} className="" target="_blank" href={link.href}>
              {link.icon}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
