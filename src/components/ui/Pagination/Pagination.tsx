import { useEffect, useState } from "react";
import "./Pagination.scss";
import { DataFetchType } from "@/types/dataFetch";

type PaginationProps = {
  data: DataFetchType[];
  itemPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<any>>;
};
const Pagination = ({ data, itemPerPage, page, setPage }: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    let numberPages = Math.ceil(data.length / itemPerPage);
    setPage(1);
    if (numberPages >= 1 && numberPages <= 10)
      setPages(Array.from({ length: numberPages }, (_, i) => (i = i + 1)));
    else if (numberPages > 10) {
      setPages(Array.from({ length: 10 }, (_, i) => (i = i + 1)));
    } else {
      setPages([]);
    }
  }, [data, itemPerPage]);

  const handlePagePrev = () => {
    if (pages[0] != 1 && page - 1 < pages[pages.length / 2]) {
      setPages(Array.from(pages, (e) => e - 1));
    }
    setPage(page - 1);
  };

  const handlePageChoose = (p: number) => {
    setPage(p);

    if (
      p > pages[pages.length / 2] &&
      pages[pages.length - 1] < Math.ceil(data.length / itemPerPage)
    ) {
      if (
        pages[pages.length - 1] + pages.indexOf(p) - pages.length / 2 <=
        Math.ceil(data.length / itemPerPage)
      )
        setPages(
          Array.from(pages, (e) => e + pages.indexOf(p) - pages.length / 2)
        );
      else
        setPages(
          Array.from(
            pages,
            (e) =>
              e + Math.ceil(data.length / itemPerPage) - pages[pages.length - 1]
          )
        );
    } else if (p < pages[pages.length / 2] && pages[0] > 1) {
      if (pages[0] - (pages.length / 2 - pages.indexOf(p)) >= 1)
        setPages(
          Array.from(pages, (e) => e - (pages.length / 2 - pages.indexOf(p)))
        );
      else setPages(Array.from(pages, (e) => e - (pages[0] - 1)));
    }
  };
  const handlePageNext = () => {
    if (
      pages[pages.length - 1] != Math.ceil(data.length / itemPerPage) &&
      page + 1 > pages[pages.length / 2]
    ) {
      setPages(Array.from(pages, (e) => e + 1));
    }
    setPage(page + 1);
  };
  return (
    <div className="pagination">
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

      <button
        onClick={handlePageNext}
        className={
          page < Math.ceil(data.length / itemPerPage)
            ? "pagination__button"
            : "pagination__button pagination__button--disabled"
        }
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
