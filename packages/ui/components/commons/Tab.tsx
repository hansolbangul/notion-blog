import React, { Children, Component, ComponentProps, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children: JSX.Element | JSX.Element[];
  value?: string;
  onClick?: (value: string) => void;
}

export default function Tab({ value, children, onClick }: Props) {
  const tabs = Children.map(children, (child) => {
    return child.props.name;
  }) as string[];

  const checkedIndex = value
    ? Children.map(children, (child) => {
        return child.props;
      }).findIndex((p) => p.name === value)
    : 0;

  const [selectedTab, setSelectedTab] = useState(tabs[checkedIndex]);

  const renderChildren = Children.map(children, (child) => {
    return child;
  }).find((v) => v.props.name === selectedTab);

  console.log("renderChildren", renderChildren);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    onClick?.(tab);
  };

  return (
    <>
      <div className="w-full flex">
        <ul className="border rounded-lg flex">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`py-2 px-4 cursor-pointer ${
                selectedTab === tab
                  ? "text-blue-500 bg-blue-100"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
              {selectedTab === tab && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                  transition={{ duration: 0.2 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: 20,
            opacity: 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-full mt-4"
        >
          {renderChildren}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

interface TabItemProps extends ComponentProps<"div"> {
  name: string;
  children: React.ReactNode;
}

Tab.Item = function ({ name, children, ...rest }: TabItemProps) {
  return (
    <div {...rest} id={name}>
      {children}
    </div>
  );
};
