import ShareButton from "../commons/ShareButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HeaderMenu() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  const toggleDevToolsMenu = () => {
    setIsDevToolsOpen(!isDevToolsOpen);
  };

  return (
    <>
      <li className="custom:ml-2 hover:bg-gray-200 p-2 rounded text-center">
        <ShareButton
          href={"https://github.com/hansolbangul"}
          icon={<FaGithub />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </ShareButton>
      </li>
      <li className="custom:ml-2 hover:bg-gray-200 p-2 rounded text-center">
        <ShareButton
          href={
            "https://www.linkedin.com/in/%ED%95%9C%EC%86%94-%EC%A7%80-832b18254/"
          }
          icon={<FaLinkedin />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </ShareButton>
      </li>
      <li className="custom:ml-2 hover:bg-gray-200 p-2 rounded">
        <a
          href="https://blog.uddangtangtang.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer bg-orange600 text-white py-2 px-3 rounded block text-center text-[13px]"
        >
          우당탕탕 도서관 가기
        </a>
      </li>
      <li className="custom:ml-2 text-gray-500 hover:bg-gray-100 p-2 rounded">
        <a
          onClick={() => {
            alert("아직 공사중입니다.");
          }}
          className="cursor-pointer py-2 px-3 rounded bg-gray-200 block text-center text-[13px]"
        >
          제가 궁금하신가요?
        </a>
      </li>
    </>
  );
}
