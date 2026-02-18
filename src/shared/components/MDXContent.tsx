import type { ReactNode } from "react";

type MDXContentProps = {
  content: string;
  className?: string;
};

export function MDXContent({ content, className }: MDXContentProps) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (keyBase: number) => {
    if (!listBuffer.length) return;
    nodes.push(
      <ul key={`list-${keyBase}`}>
        {listBuffer.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(index);
      return;
    }

    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2));
      return;
    }

    flushList(index);

    if (trimmed.startsWith("### ")) {
      nodes.push(<h3 key={`h3-${index}`}>{trimmed.slice(4)}</h3>);
      return;
    }
    if (trimmed.startsWith("## ")) {
      nodes.push(<h2 key={`h2-${index}`}>{trimmed.slice(3)}</h2>);
      return;
    }
    if (trimmed.startsWith("# ")) {
      nodes.push(<h1 key={`h1-${index}`}>{trimmed.slice(2)}</h1>);
      return;
    }

    nodes.push(<p key={`p-${index}`}>{trimmed}</p>);
  });

  flushList(lines.length);

  return <article className={["mdx-content", className].filter(Boolean).join(" ")}>{nodes}</article>;
}
