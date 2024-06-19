import React from "react";

import "./header.scss";

type Props = {
  children: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return <header>{children}</header>;
};
