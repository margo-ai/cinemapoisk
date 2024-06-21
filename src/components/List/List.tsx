import React, { Dispatch, SetStateAction } from "react";
import { Pagination } from "@mui/material";

import { useAppSelector } from "../../helpers/hooks";

import "./list.scss";

type Props = {
  children: React.ReactNode;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const List = ({ children, currentPage, setCurrentPage }: Props) => {
  const pagesCount = useAppSelector((state) => state.movies.pagesCount);

  return (
    <div>
      <ul className="list">{children}</ul>
      <Pagination
        style={{ display: "flex", justifyContent: "center" }}
        count={pagesCount}
        page={currentPage}
        onChange={(_, number) => setCurrentPage(number)}
      />
    </div>
  );
};
