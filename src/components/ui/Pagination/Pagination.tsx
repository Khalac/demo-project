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
      setPages(Array.from({ length: numberPages }, (e, i) => (i = i + 1)));
    else {
      setPages(Array.from({ length: 10 }, (e, i) => (i = i + 1)));
    }
  }, [data, itemPerPage]);

  const handlePagePrev = () => {
    if (pages[0] != 1 && page - 1 < pages[pages.length / 2]) {
      setPages(Array.from(pages, (e) => e - 1));
    }
    setPage(page - 1);
  };

  const handlePageChoose = (p: number) => {
    let pIndex = pages.indexOf(p);
    if (
      pIndex > pages.length / 2 &&
      pages[pages.length - 1] != Math.ceil(data.length / itemPerPage) &&
      pages[pages.length - 1] + pIndex - pages[pages.length / 2] <=
        Math.ceil(data.length / itemPerPage)
    ) {
      setPages(
        Array.from(
          pages,
          (e) => e + Math.ceil(data.length / itemPerPage) - pages.length + 1
        )
      );
      setPage(p);
    } else {
      setPages(Array.from(pages, (e, i) => e - itemPerPage + i + 1));
      setPage(p);
    }
    if (
      pages[0] != 1 &&
      pIndex <= pages.length / 2 &&
      pages[0] - pIndex + pages[pages.length / 2] >= 1
    ) {
      setPages(Array.from(pages, (e) => e - pages[pages.length / 2] + pIndex));
      setPage(p);
    } else {
      setPages(Array.from(pages, (e, i) => i + 1));
      setPage(p);
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
