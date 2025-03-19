import { useEffect, useState } from "react";
import "./Pagination.scss";
const Pagination = ({
  data,
  itemPerPage,
  page,
  setPage,
}: {
  data: any[];
  itemPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    let numberPages = Math.ceil(data.length / itemPerPage);

    if (numberPages >= 1 && numberPages <= 10)
      setPages(Array.from({ length: numberPages }, (_, i) => (i = i + 1)));
    else {
      setPages(Array.from({ length: 10 }, (_, i) => (i = i + 1)));
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
    <div style={{ display: "flex", gap: "10px" }} className="pagination">
      {page > 1 && <button onClick={handlePagePrev}>{"<"}</button>}
      <div style={{ display: "flex", gap: "20px" }}>
        {pages.map((p, index) => {
          return (
            <div
              key={index}
              style={
                page === p
                  ? { color: "red", cursor: "pointer" }
                  : { cursor: "pointer" }
              }
              onClick={() => handlePageChoose(p)}
            >
              {p}
            </div>
          );
        })}
      </div>
      {page < Math.floor(data.length / itemPerPage) + 1 && (
        <button onClick={handlePageNext}>{">"}</button>
      )}
    </div>
  );
};

export default Pagination;
