import { FaTools, FaRegShareSquare } from "react-icons/fa";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../../hooks/useOutsideClick";

interface Props {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function ListViewToggle({
  icon = <FaTools />,
  children,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useOutsideClick(ref, () => setIsMenuOpen(false));

  return (
    <>
      <button
        ref={ref}
        type={"button"}
        className="w-[56px] h-[56px] fixed bottom-4 right-4 rounded-full shadow shadow-gray-400 cursor-pointer flex items-center justify-center bg-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {icon}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 260 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[80px] right-4 w-[200px] bg-white shadow-lg overflow-hidden rounded-md"
          >
            <motion.ul className="flex flex-col h-full overflow-y-auto scrollbar-hide">
              {children}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

ListViewToggle.shareItem = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="p-4 w-full border-b border-gray-200 cursor-pointer flex items-center justify-between">
      {children} <FaRegShareSquare />
    </li>
  );
};
