import { CommandGroup, CommandSeparator } from "@/components/ui/command";
import { CommandMenuItem } from "./command-menu-item";
import { NavigationItem, ExternalLinkItem } from "./types";
import { SerializableBlog } from "@/lib/blog";
import { FileText, Sparkles } from "lucide-react";

export function AiCommandGroup({
  isInitialized,
  onStartChat,
}: {
  isInitialized: boolean;
  onStartChat: () => void;
}) {
  return (
    <>
      <CommandSeparator className="bg-border/30 my-3" />
      <CommandGroup
        heading="AI Assistant"
        className="animate-in fade-in slide-in-from-top-2 duration-300"
        style={{ animationDelay: "300ms" }}
      >
        <CommandMenuItem
          icon={
            <div className="relative">
              <Sparkles className="h-4 w-4 transition-colors" />
              {isInitialized && (
                <div className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              )}
            </div>
          }
          label={isInitialized ? "Start AI Chat" : "AI Loading..."}
          onSelect={onStartChat}
          disabled={!isInitialized}
          badge={
            isInitialized ? (
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="font-mono text-[9px] tracking-widest text-green-500/80 uppercase">
                  Ready
                </span>
              </div>
            ) : undefined
          }
        />
      </CommandGroup>
    </>
  );
}

interface NavigationCommandGroupProps {
  pages: NavigationItem[];
  onNavigate: (path: string) => void;
}

export function NavigationCommandGroup({
  pages,
  onNavigate,
}: NavigationCommandGroupProps) {
  return (
    <CommandGroup
      heading="Navigation"
      className="animate-in fade-in slide-in-from-top-2 duration-300"
    >
      {pages.map((page, index) => (
        <CommandMenuItem
          key={page.path}
          icon={page.icon}
          label={page.name}
          kbd={page.kbd}
          onSelect={() => onNavigate(page.path)}
          animationDelay={index * 50}
        />
      ))}
    </CommandGroup>
  );
}

interface BlogPostsCommandGroupProps {
  blogs: SerializableBlog[];
  onNavigate: (path: string) => void;
  maxPosts?: number;
}

export function BlogPostsCommandGroup({
  blogs,
  onNavigate,
  maxPosts = 5,
}: BlogPostsCommandGroupProps) {
  if (blogs.length === 0) return null;

  return (
    <>
      <CommandSeparator className="bg-border/30 my-3" />
      <CommandGroup
        heading="Recent Posts"
        className="animate-in fade-in slide-in-from-top-2 duration-300"
        style={{ animationDelay: "100ms" }}
      >
        {blogs.slice(0, maxPosts).map((blog, index) => (
          <CommandMenuItem
            key={blog.data.filename}
            icon={<FileText className="h-4 w-4" />}
            label={blog.data.title}
            onSelect={() =>
              onNavigate(`/blog/${blog.data.filename.slice(0, -3)}`)
            }
            animationDelay={100 + index * 50}
          />
        ))}
      </CommandGroup>
    </>
  );
}

interface ExternalLinksCommandGroupProps {
  links: ExternalLinkItem[];
  onOpenLink: (href: string) => void;
}

export function ExternalLinksCommandGroup({
  links,
  onOpenLink,
}: ExternalLinksCommandGroupProps) {
  return (
    <>
      <CommandSeparator className="bg-border/30 my-3" />
      <CommandGroup
        heading="External Links"
        className="animate-in fade-in slide-in-from-top-2 duration-300"
        style={{ animationDelay: "200ms" }}
      >
        {links.map((link, index) => (
          <CommandMenuItem
            key={link.href}
            icon={link.icon}
            label={link.name}
            onSelect={() => onOpenLink(link.href)}
            animationDelay={200 + index * 50}
            badge={
              <span className="text-muted-foreground/50 font-mono text-[9px] tracking-widest uppercase">
                ↗
              </span>
            }
          />
        ))}
      </CommandGroup>
    </>
  );
}
