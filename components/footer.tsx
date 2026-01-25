import { env } from "@/lib/env";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaSitemap,
  FaRss,
} from "react-icons/fa6";
import { Fragment } from "react/jsx-runtime";

export function Footer() {
  const url = env.VERCEL_URL
    ? "https://" + env.VERCEL_URL
    : "http://localhost:3000";

  const links = [
    { href: `${url}/sitemap.xml`, icon: <FaSitemap /> },
    { href: `${url}/feed.xml`, icon: <FaRss /> },
    { href: "https://github.com/leomosley", icon: <FaGithub /> },
    {
      href: "https://www.linkedin.com/in/leo-mosley-22b7b229b/",
      icon: <FaLinkedin />,
    },
    { href: "https://twitter.com/leomosly", icon: <FaXTwitter /> },
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
