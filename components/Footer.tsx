import React from 'react';
import { FaGithub, FaLinkedin, FaRss, FaSitemap, FaXTwitter} from 'react-icons/fa6';

export default function Footer() {
  const links = [
    { href: "https://www.leomosley.com/sitemap.xml", icon: <FaSitemap />},
    { href: "https://www.leomosley.com/feed.xml", icon: <FaRss />},
    { href: "https://github.com/leomosley", icon: <FaGithub />},
    { href: "https://www.linkedin.com/in/leo-mosley-606785222/", icon: <FaLinkedin />},
    { href: "https://twitter.com/leomosly", icon: <FaXTwitter />},

  ];
  return (
    <footer id="footer" className="flex border-t-2 mt-20 mb-4 border-neutral-400">
      <div className="flex gap-4 ml-auto mt-4 text-neutral-400">
        {links.map((link, index) => (
          <a 
            key={index} 
            className=""
            target="_blank"
            href={link.href}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}
