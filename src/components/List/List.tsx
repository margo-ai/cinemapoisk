import React, { Dispatch, SetStateAction } from "react";

import { Pagination } from "@mui/material";

import "./list.scss";
import { useAppSelector } from "../../helpers/hooks";
// import { setCurrentPage } from "src/reducers/moviesSlice";

type Props = {
  children: React.ReactNode;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const List = ({ children, currentPage, setCurrentPage }: Props) => {
  // const currentPage = useAppSelector((state) => state.movies.currentPage);
  const pagesCount = useAppSelector((state) => state.movies.pagesCount);
  console.log(currentPage);

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
