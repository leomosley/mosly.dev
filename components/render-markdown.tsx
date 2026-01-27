import Markdown from "react-markdown";
import { ReactNode, createElement } from "react";

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
    1: "text-4xl font-bold mb-4 mt-8",
    2: "text-3xl font-bold mb-3 mt-6",
    3: "text-2xl font-semibold mb-3 mt-5",
    4: "text-xl font-semibold mb-2 mt-4",
    5: "text-lg font-medium mb-2 mt-3",
    6: "text-base font-medium mb-2 mt-3",
  };

  return createElement(
    tag,
    { id, className: `group relative ${sizeClasses[level]}` },
    createElement(
      "a",
      {
        href: `#${id}`,
        className:
          "anchor absolute -left-6 top-0 hidden opacity-0 transition-opacity group-hover:opacity-100 lg:block",
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
  const language = className?.replace("language-", "") ?? "";

  return (
    <div className="relative my-4 overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
      {language && (
        <div className="border-b border-gray-800 bg-gray-900 px-4 py-2 text-xs text-gray-400">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  const text = typeof children === "string" ? children.replace(/^`|`$/g, "") : children;
  return (
    <code className="rounded border border-gray-800 bg-gray-900 px-1.5 py-0.5 font-mono text-sm text-pink-400">
      {text}
    </code>
  );
}

export function RenderMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        h1: ({ children }) => (
          <CustomHeading level={1}>{children}</CustomHeading>
        ),
        h2: ({ children }) => (
          <CustomHeading level={2}>{children}</CustomHeading>
        ),
        h3: ({ children }) => (
          <CustomHeading level={3}>{children}</CustomHeading>
        ),
        h4: ({ children }) => (
          <CustomHeading level={4}>{children}</CustomHeading>
        ),
        h5: ({ children }) => (
          <CustomHeading level={5}>{children}</CustomHeading>
        ),
        h6: ({ children }) => (
          <CustomHeading level={6}>{children}</CustomHeading>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return <InlineCode>{children}</InlineCode>;
          }
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
      }}
    >
      {children}
    </Markdown>
  );
}
