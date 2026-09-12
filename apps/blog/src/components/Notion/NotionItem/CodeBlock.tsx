"use client";
import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import type { CodeBlock as NotionCodeBlock } from "notion-types";
import { getTextContent } from "notion-utils";

export default function CodeBlock({ block }: { block: NotionCodeBlock }) {
  const code = getTextContent(block.properties?.title || []);
  const rawLanguage =
    getTextContent(block.properties?.language || []) || "Plain text";
  const aliases: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    "java/c/c++/c#": "clike",
    shell: "bash",
    "shell script": "bash",
    "plain text": "text",
    html: "markup",
  };
  const language =
    aliases[rawLanguage.toLowerCase()] || rawLanguage.toLowerCase();
  const [wrapped, setWrapped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const grammar = Prism.languages[language];
  const html = grammar ? Prism.highlight(code, grammar, language) : null;
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setFailed(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }
  return (
    <figure className={`builder-code ${wrapped ? "is-wrapped" : ""}`}>
      <figcaption>
        <span className="code-language">
          <i aria-hidden="true" />
          {rawLanguage}
        </span>
        <div>
          <button
            type="button"
            aria-pressed={wrapped}
            onClick={() => setWrapped(!wrapped)}
          >
            {wrapped ? "원래 줄" : "줄바꿈"}
          </button>
          <button type="button" onClick={copy} aria-label="코드 복사">
            {copied ? "복사됨 ✓" : "복사 ⧉"}
          </button>
        </div>
      </figcaption>
      <div
        className="code-scroll"
        tabIndex={0}
        aria-label={`${rawLanguage} 코드`}
      >
        <pre className="code-gutter" aria-hidden="true">
          {code
            .split("\n")
            .map((_, i) => i + 1)
            .join("\n")}
        </pre>
        <pre className="code-source">
          {html ? (
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
      <span className="sr-only" role="status">
        {copied ? "코드를 복사했습니다." : ""}
      </span>
      {failed && (
        <p className="code-copy-error" role="status">
          복사 권한을 확인하거나 코드를 선택해 복사해 주세요.
        </p>
      )}
    </figure>
  );
}
