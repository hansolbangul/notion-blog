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
    <Container.Col className="mb-4">
      <Container.Flex className="w-full justify-between items-center mb-4">
        <Text.H2>{title}</Text.H2>
        {rightBtn}
      </Container.Flex>
      {children}
    </Container.Col>
  );
};

export default ComponentTitle;
