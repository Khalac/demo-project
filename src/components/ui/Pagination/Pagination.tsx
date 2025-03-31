import { useEffect, useState } from "react";
import "./Pagination.scss";
import { DataFetchType } from "@/types/dataFetch";
import { ButtonGoNext, ButtonGoPrev, ListPages } from "./_components";
type PaginationProps = {
  data: DataFetchType[];
  itemPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
const Pagination = ({ data, itemPerPage, page, setPage }: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);
  const [numberPages, setNumberPages] = useState<number>(
    Math.ceil(data.length / itemPerPage)
  );
  useEffect(() => {
    setNumberPages(Math.ceil(data.length / itemPerPage));
    setPage(1);
    if (numberPages >= 1 && numberPages <= 10)
      setPages(Array.from({ length: numberPages }, (_, i) => (i = i + 1)));
    else if (numberPages > 10) {
      setPages(Array.from({ length: 10 }, (_, i) => (i = i + 1)));
    } else {
      setPages([]);
    }
  }, [data, itemPerPage, numberPages]);

  return (
    <div className="pagination">
      <ButtonGoPrev
        page={page}
        pages={pages}
        setPage={setPage}
        setPages={setPages}
      />
      <ListPages
        page={page}
        pages={pages}
        setPage={setPage}
        setPages={setPages}
        numberPages={numberPages}
      />

      <ButtonGoNext
        page={page}
        pages={pages}
        setPage={setPage}
        setPages={setPages}
        numberPages={numberPages}
      />
    </div>
  );
};

export default Pagination;
