import React from "react";

import "./container.scss";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  return <div className="container">{children}</div>;
};
