"use client";
import { useEffect } from "react";
import { CONFIG } from "../../../site.config";
import { useTheme } from "next-themes";

type Props = {
  issueTerm: string;
};

export default function Utterances({ issueTerm }: Props) {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const theme = currentTheme === "dark" ? "github-dark" : "github-light";
    // 'github-dark'
    const script = document.createElement("script");
    const anchor = document.getElementById("comments");
    if (!anchor) return;

    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", `true`);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("theme", theme);
    const config: { [key: string]: string } = CONFIG.utterances.config;
    Object.keys(config).forEach((key) => {
      script.setAttribute(key, config[key]);
    });
    anchor.appendChild(script);
    return () => {
      anchor.innerHTML = "";
    };
  });
  return (
    <>
      <div id="comments" className="md:-ml-16">
        <div className="utterances-frame" style={{ position: "relative" }}></div>
      </div>
    </>
  );
}
