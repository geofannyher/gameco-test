import { Button } from "../ui/button";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

const PAGE_SIZE = 15;
const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalCount,
}) => {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const isLastPage = (page + 1) * PAGE_SIZE >= totalCount;

  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        variant="default"
        size="default"
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
      >
        Previous
      </Button>
      <span>
        Page {page + 1} of {totalPages}
      </span>
      <Button
        variant="default"
        size="default"
        onClick={() =>
          setPage((prev) =>
            (prev + 1) * PAGE_SIZE < totalCount ? prev + 1 : prev
          )
        }
        disabled={isLastPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
