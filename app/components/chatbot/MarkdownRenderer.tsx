import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import "./markdown.css";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  answer: string;
}

const MarkdownRenderer = ({ answer }: MarkdownRendererProps) => {
  return (
    <div id="markdown_div" className="w-full max-w-full min-w-0 overflow-hidden">
      <ReactMarkdown
        components={{
          p({ node, children, ...props }: any) {
            const childArray = React.Children.toArray(children);

            // Check if children are all inline-safe (text or <code>)
            const containsOnlyTextOrInlineCode = childArray.every(
              (child: any) =>
                typeof child === "string" ||
                (typeof child === "object" && child?.type === "code"),
            );

            if (containsOnlyTextOrInlineCode) {
              return <p {...props}>{children}</p>;
            }

            // Skip wrapping block elements in <p>
            return <>{children}</>;
          },
          table({ node, children, ...props }: any) {
            return (
              <div className="w-full max-w-full overflow-x-auto my-2 rounded-lg border border-gray-200">
                <table {...props}>{children}</table>
              </div>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {answer}
      </ReactMarkdown>
    </div>
  );
};

export default memo(MarkdownRenderer);
