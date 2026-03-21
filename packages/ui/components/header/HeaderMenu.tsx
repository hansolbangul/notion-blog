"use client";

import ShareButton from "../commons/ShareButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CONFIG from "@blog/notions/site.config";

export default function HeaderMenu() {
  const baseItemClass =
    "group flex items-center justify-center gap-2 border border-line bg-paper-strong px-4 py-2 text-[13px] font-medium text-ink-soft shadow-panel hover:-translate-y-[1px] hover:border-accent hover:text-ink";

  return (
    <>
      <li>
        <ShareButton
          href={CONFIG.sns.github}
          icon={<FaGithub />}
          target="_blank"
          rel="noopener noreferrer"
          className={baseItemClass}
        >
          Github
        </ShareButton>
      </li>
      <li>
        <ShareButton
          href={CONFIG.sns.linkedin}
          icon={<FaLinkedin />}
          target="_blank"
          rel="noopener noreferrer"
          className={baseItemClass}
        >
          Linkedin
        </ShareButton>
      </li>
    </>
  );
}
