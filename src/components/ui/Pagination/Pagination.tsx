import { useEffect, useState } from "react";
import "./Pagination.scss";
const Pagination = ({
  data,
  ITEMPERPAGE,
  page,
  setPage,
}: {
  data: any[];
  ITEMPERPAGE: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    let numberPages = Math.ceil(data.length / ITEMPERPAGE);
    setPage(1);
    if (numberPages >= 1 && numberPages <= 10)
      setPages(Array.from({ length: numberPages }, (_, i) => (i = i + 1)));
    else if (numberPages > 10) {
      setPages(Array.from({ length: 10 }, (_, i) => (i = i + 1)));
    } else {
      setPages([]);
    }
  }, [data, ITEMPERPAGE]);

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
      pages[pages.length - 1] < Math.ceil(data.length / ITEMPERPAGE)
    ) {
      if (
        pages[pages.length - 1] + pages.indexOf(p) - pages.length / 2 <=
        Math.ceil(data.length / ITEMPERPAGE)
      )
        setPages(
          Array.from(pages, (e) => e + pages.indexOf(p) - pages.length / 2)
        );
      else
        setPages(
          Array.from(
            pages,
            (e) =>
              e + Math.ceil(data.length / ITEMPERPAGE) - pages[pages.length - 1]
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
      pages[pages.length - 1] != Math.ceil(data.length / ITEMPERPAGE) &&
      page + 1 > pages[pages.length / 2]
    ) {
      setPages(Array.from(pages, (e) => e + 1));
    }
    setPage(page + 1);
  };
  return (
    <div className="pagination">
      <button
        className={
          page > 1 ? "pagination_button" : "pagination_button--not_view"
        }
        onClick={handlePagePrev}
      >
        {"<"}
      </button>

      <div className="pagination_pages">
        {pages.map((p, index) => {
          return (
            <div
              className={
                page === p
                  ? "pagination_pages_page on_page"
                  : "pagination_pages_page"
              }
              key={index}
              onClick={() => handlePageChoose(p)}
            >
              {p}
            </div>
          );
        })}
      </div>

      <button
        onClick={handlePageNext}
        className={
          page < Math.ceil(data.length / ITEMPERPAGE)
            ? "pagination_button"
            : "pagination_button--not_view"
        }
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
