import React from "react";
import "./ButtonGoNext.scss";

type ButtonGoNextProps = {
  page: number;
  pages: number[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPages: React.Dispatch<React.SetStateAction<number[]>>;
  numberPages: number;
};

const ButtonGoNext = ({
  page,
  pages,
  setPage,
  setPages,
  numberPages,
}: ButtonGoNextProps) => {
  const handlePageNext = () => {
    if (
      pages[pages.length - 1] != numberPages &&
      page + 1 > pages[pages.length / 2]
    ) {
      setPages(Array.from(pages, (e) => e + 1));
    }
    setPage(page + 1);
  };
  return (
    <button
      onClick={handlePageNext}
      className={
        page < numberPages
          ? "pagination__button"
          : "pagination__button pagination__button--disabled"
      }
    >
      {">"}
    </button>
  );
};

export default ButtonGoNext;
