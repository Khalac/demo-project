import React from "react";
import "./ListPages.scss";

type ListPages = {
  page: number;
  pages: number[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPages: React.Dispatch<React.SetStateAction<number[]>>;
  numberPages: number;
};

const ListPages = ({
  page,
  pages,
  setPage,
  setPages,
  numberPages,
}: ListPages) => {
  const handlePageChoose = (p: number) => {
    setPage(p);

    if (p > pages[pages.length / 2] && pages[pages.length - 1] < numberPages) {
      if (
        pages[pages.length - 1] + pages.indexOf(p) - pages.length / 2 <=
        numberPages
      )
        setPages(
          Array.from(pages, (e) => e + pages.indexOf(p) - pages.length / 2)
        );
      else
        setPages(
          Array.from(pages, (e) => e + numberPages - pages[pages.length - 1])
        );
    } else if (p < pages[pages.length / 2] && pages[0] > 1) {
      if (pages[0] - (pages.length / 2 - pages.indexOf(p)) >= 1)
        setPages(
          Array.from(pages, (e) => e - (pages.length / 2 - pages.indexOf(p)))
        );
      else setPages(Array.from(pages, (e) => e - (pages[0] - 1)));
    }
  };
  return (
    <div className="pagination_pages">
      {pages.map((p, index) => {
        return (
          <button
            className={
              page === p
                ? "pagination__button pagination__button--active"
                : "pagination__button"
            }
            key={index}
            onClick={() => handlePageChoose(p)}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};

export default ListPages;
