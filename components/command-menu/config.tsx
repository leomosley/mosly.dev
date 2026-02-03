import { Home, FileText } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaSitemap,
  FaRss,
} from "react-icons/fa6";
import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from "@/lib/constants";
import { NavigationItem, ExternalLinkItem } from "./types";

export const navigationPages: NavigationItem[] = [
  { name: "Home", path: "/", icon: <Home />, kbd: "H" },
  { name: "Blog", path: "/blog", icon: <FileText />, kbd: "B" },
];

export const getExternalLinks = (baseUrl: string): ExternalLinkItem[] => [
  { name: "GitHub", href: GITHUB_LINK, icon: <FaGithub /> },
  { name: "LinkedIn", href: LINKEDIN_LINK, icon: <FaLinkedin /> },
  { name: "Twitter/X", href: TWITTER_LINK, icon: <FaXTwitter /> },
  { name: "Sitemap", href: `${baseUrl}/sitemap.xml`, icon: <FaSitemap /> },
  { name: "RSS Feed", href: `${baseUrl}/feed.xml`, icon: <FaRss /> },
];
