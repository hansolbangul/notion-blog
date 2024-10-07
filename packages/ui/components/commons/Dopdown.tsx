import { useState, useRef, ReactNode, Children, cloneElement } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../../hooks/useOutsideClick"; // 외부 클릭 시 닫히는 훅 (사용자 정의)

interface DropdownProps<T> {
  name?: string;
  children: ReactNode;
  placeholder?: string;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

// TODO: 지금은 form 에서 onChange가 잡히지 않는다. 수정 필요.
export default function Dropdown<T>({
  name,
  children,
  defaultValue,
  placeholder = "Select an option",
  onChange,
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const items = Children.map(
    children,
    (child) => child,
  ) as React.ReactElement[];
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || items[0]?.props.children,
  );

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleSelect = (value: React.ReactNode) => {
    setSelectedValue(value);
    setIsOpen(false);

    if (onChange) {
      onChange(value as T);
    }

    if (inputRef.current) {
      inputRef.current.value = value?.toString() || "";

      const event = new Event("change", { bubbles: true });
      inputRef.current.dispatchEvent(event);
      inputRef.current.form?.dispatchEvent(event);
    }
  };

  return (
    <>
      <input ref={inputRef} type="text" name={name} className="hidden" />
      <div className="relative w-[200px]" ref={dropdownRef}>
        <button
          type="button"
          className="w-full bg-white text-gray-700 p-4 rounded-md shadow border border-gray-300 cursor-pointer flex items-center justify-between focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedValue || placeholder}</span>
          <FaChevronDown className="text-gray-400" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md z-10"
            >
              <ul className="max-h-60 overflow-y-auto">
                {items.map((child) =>
                  cloneElement(child, {
                    selectedValue,
                    handleSelect,
                  }),
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

Dropdown.Option = function ({
  children,
  selectedValue,
  handleSelect,
}: {
  children: React.ReactNode;
  selectedValue?: string;
  handleSelect?: (select: React.ReactNode) => void;
}) {
  return (
    <li
      className={`p-4 cursor-pointer hover:bg-gray-100 ${
        selectedValue === children ? "bg-gray-200" : ""
      }`}
      onClick={() => handleSelect?.(children)}
    >
      {children}
    </li>
  );
};
