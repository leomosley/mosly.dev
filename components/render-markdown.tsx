"use client";

import Markdown from "react-markdown";
import { ReactNode, createElement } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Info,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

export function CustomHeading({
  level,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}) {
  const tag = `h${level}`;
  const id =
    typeof children === "string"
      ? children.toLowerCase().replace(/\s+/g, "-")
      : "";

  const sizeClasses = {
    1: "text-4xl font-bold mb-6 mt-12 first:mt-0",
    2: "text-3xl font-bold mb-5 mt-10",
    3: "text-2xl font-semibold mb-4 mt-8",
    4: "text-xl font-semibold mb-3 mt-6",
    5: "text-lg font-medium mb-2 mt-5",
    6: "text-base font-medium mb-2 mt-4",
  };

  return createElement(
    tag,
    { id, className: `group relative ${sizeClasses[level]}` },
    createElement(
      "a",
      {
        href: `#${id}`,
        className:
          "anchor link absolute -left-6 top-0 hidden opacity-0 transition-opacity group-hover:opacity-100 lg:block text-accent",
        "aria-label": `Link to ${children}`,
      },
      "#",
    ),
    children,
  );
}

function CodeBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") ?? "text";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group border-border/50 from-muted/40 to-muted/20 relative my-6 overflow-hidden rounded-xl border bg-linear-to-br shadow-lg backdrop-blur-sm">
      {/* Header with language and copy button */}
      <div className="border-border/50 bg-muted/30 flex items-center justify-between border-b px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="bg-destructive/60 h-3 w-3 rounded-full" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          {language && (
            <span className="text-muted-foreground ml-2 font-mono text-xs tracking-wider uppercase">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
        <code className={`${className} font-mono`}>{children}</code>
      </pre>

      {/* Decorative gradient overlay */}
      <div className="via-accent/30 absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent to-transparent" />
    </div>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="border-border/50 bg-muted/50 text-accent before:from-accent/5 relative inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-sm before:absolute before:inset-0 before:rounded-md before:bg-linear-to-r before:to-transparent before:opacity-50">
      <span className="relative">{children}</span>
    </code>
  );
}

function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = props.href?.startsWith("http");

  return (
    <a
      className="group/link inline-flex items-center gap-1 underline underline-offset-4 decoration-secondary-foreground hover:decoration-accent transition-colors"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {props.children}
      {isExternal && (
        <ExternalLink className="text-muted-foreground group-hover/link:text-accent h-3 w-3 transition-colors" />
      )}
    </a>
  );
}

function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-accent/50 from-accent/5 relative my-6 border-l-4 bg-linear-to-r to-transparent py-4 pr-4 pl-6 italic">
      <div className="bg-accent/20 absolute top-0 left-0 h-full w-1 blur-sm" />
      <div className="relative">{children}</div>
      {/* Decorative quote mark */}
      <div className="text-accent/20 pointer-events-none absolute -top-2 -left-3 font-serif text-6xl leading-none select-none">
        "
      </div>
    </blockquote>
  );
}

function List({
  children,
  ordered,
}: {
  children: ReactNode;
  ordered?: boolean;
}) {
  const Component = ordered ? "ol" : "ul";

  return (
    <Component
      className={`my-5 space-y-2 ${ordered ? "list-inside list-decimal" : "space-y-2"}`}
    >
      {children}
    </Component>
  );
}

function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="before:bg-accent relative flex items-start gap-3 pl-6 before:absolute before:top-[0.6em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full">
      <span className="flex-1">{children}</span>
    </li>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  // Check if this is a callout (starts with special markers)
  const text = String(children);
  const calloutMatch = text.match(/^(Note|Warning|Tip|Info):\s*/i);

  if (calloutMatch) {
    const type = calloutMatch[1].toLowerCase();
    const content = text.replace(calloutMatch[0], "");

    const configs = {
      note: {
        icon: Info,
        color: "blue",
        borderColor: "border-blue-500/50",
        bgColor: "bg-blue-500/5",
        iconColor: "text-blue-500",
      },
      warning: {
        icon: AlertCircle,
        color: "yellow",
        borderColor: "border-yellow-500/50",
        bgColor: "bg-yellow-500/5",
        iconColor: "text-yellow-500",
      },
      tip: {
        icon: Lightbulb,
        color: "green",
        borderColor: "border-green-500/50",
        bgColor: "bg-green-500/5",
        iconColor: "text-green-500",
      },
      info: {
        icon: Info,
        color: "accent",
        borderColor: "border-accent/50",
        bgColor: "bg-accent/5",
        iconColor: "text-accent",
      },
    };

    const config = configs[type as keyof typeof configs] || configs.info;
    const Icon = config.icon;

    return (
      <div
        className={`my-6 flex gap-3 rounded-lg border ${config.borderColor} ${config.bgColor} p-4 backdrop-blur-sm`}
      >
        <Icon className={`h-5 w-5 ${config.iconColor} mt-0.5 shrink-0`} />
        <div className="flex-1 space-y-2">
          <div
            className={`font-semibold ${config.iconColor} text-xs tracking-wider uppercase`}
          >
            {type}
          </div>
          <div className="text-sm leading-relaxed">{content}</div>
        </div>
      </div>
    );
  }

  return <p className="my-4 leading-relaxed">{children}</p>;
}

function Hr() {
  return (
    <div className="relative my-12">
      <hr className="via-border h-px border-0 bg-linear-to-r from-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
        <div className="bg-accent/60 h-1.5 w-1.5 rounded-full" />
        <div className="bg-accent/40 h-1.5 w-1.5 rounded-full" />
        <div className="bg-accent/60 h-1.5 w-1.5 rounded-full" />
      </div>
    </div>
  );
}

function Table({ children }: { children: ReactNode }) {
  return (
    <div className="border-border/50 my-8 overflow-hidden rounded-lg border shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">{children}</table>
      </div>
    </div>
  );
}

function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-muted/50 border-border/50 border-b">{children}</thead>
  );
}

function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-border/30 divide-y">{children}</tbody>;
}

function TableRow({ children }: { children: ReactNode }) {
  return <tr className="hover:bg-muted/30 transition-colors">{children}</tr>;
}

function TableCell({
  children,
  isHeader,
}: {
  children: ReactNode;
  isHeader?: boolean;
}) {
  const Component = isHeader ? "th" : "td";
  return (
    <Component
      className={`px-4 py-3 text-left ${isHeader ? "text-sm font-semibold tracking-wider uppercase" : "text-sm"}`}
    >
      {children}
    </Component>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-foreground font-bold">{children}</strong>;
}

function Em({ children }: { children: ReactNode }) {
  return <em className="text-foreground/90 italic">{children}</em>;
}

export function RenderMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        h1: ({ children }: { children?: ReactNode }) => (
          <CustomHeading level={1}>{children}</CustomHeading>
        ),
        h2: ({ children }: { children?: ReactNode }) => (
          <CustomHeading level={2}>{children}</CustomHeading>
        ),
        h3: ({ children }: { children?: ReactNode }) => (
          <CustomHeading level={3}>{children}</CustomHeading>
        ),
        h4: ({ children }: { children?: ReactNode }) => (
          <CustomHeading level={4}>{children}</CustomHeading>
        ),
        h5: ({ children }: { children?: ReactNode }) => (
          <CustomHeading level={5}>{children}</CustomHeading>
        ),
        h6: ({ children }: { children?: ReactNode }) => (
          <CustomHeading level={6}>{children}</CustomHeading>
        ),
        code: ({
          className,
          children,
        }: {
          className?: string;
          children?: ReactNode;
        }) => {
          const isInline = !className;
          if (isInline) {
            return <InlineCode>{children}</InlineCode>;
          }
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        a: (props) => {
          return <Link {...props} />;
        },
        blockquote: ({ children }: { children?: ReactNode }) => (
          <Blockquote>{children}</Blockquote>
        ),
        ul: ({ children }: { children?: ReactNode }) => <List>{children}</List>,
        ol: ({ children }: { children?: ReactNode }) => (
          <List ordered>{children}</List>
        ),
        li: ({ children }: { children?: ReactNode }) => (
          <ListItem>{children}</ListItem>
        ),
        p: ({ children }: { children?: ReactNode }) => (
          <Paragraph>{children}</Paragraph>
        ),
        hr: () => <Hr />,
        table: ({ children }: { children?: ReactNode }) => (
          <Table>{children}</Table>
        ),
        thead: ({ children }: { children?: ReactNode }) => (
          <TableHead>{children}</TableHead>
        ),
        tbody: ({ children }: { children?: ReactNode }) => (
          <TableBody>{children}</TableBody>
        ),
        tr: ({ children }: { children?: ReactNode }) => (
          <TableRow>{children}</TableRow>
        ),
        th: ({ children }: { children?: ReactNode }) => (
          <TableCell isHeader>{children}</TableCell>
        ),
        td: ({ children }: { children?: ReactNode }) => (
          <TableCell>{children}</TableCell>
        ),
        strong: ({ children }: { children?: ReactNode }) => (
          <Strong>{children}</Strong>
        ),
        em: ({ children }: { children?: ReactNode }) => <Em>{children}</Em>,
      }}
    >
      {children}
    </Markdown>
  );
}
