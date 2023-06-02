"use client";
import { useEffect } from "react";
import { CONFIG } from "../../../site.config";

type Props = {
  issueTerm: string;
};

export default function Utterances({ issueTerm }: Props) {

  useEffect(() => {
    // 'github-dark'
    const script = document.createElement("script");
    const anchor = document.getElementById("comments");
    if (!anchor) return;

    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", `true`);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("theme", 'white');
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
