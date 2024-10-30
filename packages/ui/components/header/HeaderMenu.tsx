import ShareButton from "../commons/ShareButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import CONFIG from "@blog/notions/site.config";

export default function HeaderMenu() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  const toggleDevToolsMenu = () => {
    setIsDevToolsOpen(!isDevToolsOpen);
  };

  return (
    <>
      <li className="custom:ml-2 hover:bg-gray-200 p-2 rounded text-center">
        <ShareButton
          href={CONFIG.sns.github}
          icon={<FaGithub />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </ShareButton>
      </li>
      <li className="custom:ml-2 hover:bg-gray-200 p-2 rounded text-center">
        <ShareButton
          href={CONFIG.sns.linkedin}
          icon={<FaLinkedin />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </ShareButton>
      </li>
      {CONFIG.headerButton?.mainProject?.url && (
        <li className="custom:ml-2 hover:bg-gray-200 p-2 rounded">
          <a
            href={CONFIG.headerButton.mainProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-orange600 text-white py-2 px-3 rounded block text-center text-[13px]"
          >
            {CONFIG.headerButton.mainProject.name}
          </a>
        </li>
      )}
      {CONFIG.headerButton?.myInfo?.url && (
        <li className="custom:ml-2 text-gray-500 hover:bg-gray-100 p-2 rounded">
          <a
            href={CONFIG.headerButton.myInfo.url}
            className="cursor-pointer py-2 px-3 rounded bg-gray-200 block text-center text-[13px]"
          >
            {CONFIG.headerButton.myInfo.name}
          </a>
        </li>
      )}
    </>
  );
}
