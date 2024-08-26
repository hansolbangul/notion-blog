"use client";

import styled from "styled-components";
import { HTMLAttributes } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";

const Button = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  gap: 4px;
`;

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export default function ShareButton({ children, ...props }: Props) {
  return (
    <Button {...props}>
      {children}
      <FaRegShareFromSquare />
    </Button>
  );
}
