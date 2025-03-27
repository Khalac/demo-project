import React from "react";
import "./ButtonGoPrev.scss";
type ButtonGoPrevProps = {
  page: number;
  pages: number[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPages: React.Dispatch<React.SetStateAction<number[]>>;
};

const ButtonGoPrev = ({
  page,
  pages,
  setPage,
  setPages,
}: ButtonGoPrevProps) => {
  const handlePagePrev = () => {
    if (pages[0] != 1 && page - 1 < pages[pages.length / 2]) {
      setPages(Array.from(pages, (e) => e - 1));
    }
    setPage(page - 1);
  };
  return (
    <button
      className={`pagination__button ${
        page === 1
          ? "pagination__button pagination__button--disabled"
          : "pagination__button "
      }`}
      onClick={handlePagePrev}
    >
      {"<"}
    </button>
  );
};

export default ButtonGoPrev;
