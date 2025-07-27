import { useState, useDeferredValue, useTransition, useMemo, useCallback } from "react";
import { Table, Typography, Spin, Divider, Skeleton } from "antd";
import { useInfiniteMovies } from "@/hooks/movies";
import { GetMoviesQuery } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMovieTableColumns } from "@/lib/constants";
import MovieFilters from "./MovieFilters";

const { Text } = Typography;

const MoviesTable: React.FC = () => {
  const [filters, setFilters] = useState<GetMoviesQuery>({
    limit: 10,
    sort_by: "created_at",
    sort_order: "DESC",
  });
  const [searchText, setSearchText] = useState("");
  const [isPending, startTransition] = useTransition();

  const deferredSearchText = useDeferredValue(searchText);

  const deferredFilters = useMemo(() => ({
    ...filters,
    search: deferredSearchText || undefined,
  }), [filters, deferredSearchText]);

  const { data, isLoading, hasNextPage, fetchNextPage, error } =
    useInfiniteMovies(deferredFilters);

  const movies = useMemo(() => 
    data?.pages?.flatMap((page) => page.movies) || [], 
    [data?.pages]
  );

  const handleSearch = useCallback((value: string) => {
    startTransition(() => {
      setSearchText(value ? value.trim() : "");
    });
  }, []);

  const handleFilterChange = useCallback((key: string, value: any) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, [key]: value || undefined, page: 1 }));
    });
  }, []);

  const columns = useMemo(() => getMovieTableColumns(), []);

  const loadingContent = (
    <div className="space-y-4">
      <Skeleton active paragraph={{ rows: 3 }} />
      <Skeleton active paragraph={{ rows: 3 }} />
      <Skeleton active paragraph={{ rows: 3 }} />
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-8" role="alert" aria-live="polite">
        <Text type="danger">Failed to load movies. Please try again.</Text>
      </div>
    );
  }

  if (isLoading && !data) {
    return loadingContent;
  }

  return (
    <div className="space-y-4" role="region" aria-label="Movies and TV Shows Table">
      <MovieFilters
        filters={filters}
        searchText={searchText}
        isPending={isPending}
        onSearchChange={handleSearch}
        onFilterChange={handleFilterChange}
      />
      <div
        id="scrollableDiv"
        style={{
          height: 600,
          overflow: "auto",
          borderRadius: "6px",
        }}
        role="region"
        aria-label="Scrollable movies table"
      >
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex justify-center items-center py-4" role="status" aria-live="polite">
              <Spin size="small" />
              <Text type="secondary" className="ml-2">
                Loading more movies...
              </Text>
            </div>
          }
          endMessage={
            <Divider plain>
              <Text type="secondary">
                {movies.length > 0
                  ? "You've seen all movies! "
                  : "No movies found"}
              </Text>
            </Divider>
          }
          scrollableTarget="scrollableDiv"
          style={{ padding: "0 16px" }}
        >
          <Table
            columns={columns}
            dataSource={movies}
            rowKey="id"
            loading={isLoading}
            pagination={false}
            scroll={{ x: 1200 }}
            className="shadow-sm"
            size="middle"
            aria-label="Movies and TV Shows"
            rowClassName={(_, index) => 
              index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
            }
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MoviesTable; 