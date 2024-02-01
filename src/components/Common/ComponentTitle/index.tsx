import Container from "@elements/Container";
import Text from "@elements/Text";
import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  rightBtn?: React.ReactNode;
}

const ComponentTitle = ({ children, title = "", rightBtn = "" }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Container.Flex className="w-full justify-between items-center mb-4">
        <Text.H2>{title}</Text.H2>
        {rightBtn}
      </Container.Flex>
      {children}
    </div>
  );
};

export default ComponentTitle;
