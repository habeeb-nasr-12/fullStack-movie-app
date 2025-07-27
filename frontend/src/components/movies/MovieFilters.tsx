import { ChangeEvent, useCallback, useMemo } from "react";
import { Input, Select, Row, Col, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { GetMoviesQuery } from "@/types";

const { Option } = Select;

interface MovieFiltersProps {
  filters: GetMoviesQuery;
  searchText: string;
  isPending: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (key: string, value: any) => void;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({
  filters,
  searchText,
  isPending,
  onSearchChange,
  onFilterChange,
}) => {
  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const typeOptions = useMemo(() => [
    { value: "Movie", label: "Movie" },
    { value: "TV Show", label: "TV Show" },
  ], []);

  const statusOptions = useMemo(() => [
    { value: "Watched", label: "Watched" },
    { value: "Currently Watching", label: "Currently Watching" },
    { value: "Want to Watch", label: "Want to Watch" },
  ], []);

  const ratingOptions = useMemo(() => [
    { value: "9-10", label: "9-10 (Excellent)" },
    { value: "7-8", label: "7-8 (Good)" },
    { value: "5-6", label: "5-6 (Average)" },
    { value: "3-4", label: "3-4 (Poor)" },
    { value: "1-2", label: "1-2 (Very Poor)" },
    { value: "0", label: "No Rating" },
  ], []);

  const sortOptions = useMemo(() => [
    { value: "created_at", label: "Date Added" },
    { value: "title", label: "Title" },
    { value: "year", label: "Year" },
    { value: "rating", label: "Rating" },
  ], []);

  const orderOptions = useMemo(() => [
    { value: "DESC", label: "Descending" },
    { value: "ASC", label: "Ascending" },
  ], []);

  return (
    <Row gutter={[16, 16]} className="mb-4" role="search" aria-label="Movie filters">
      <Col xs={24} md={8}>
        <div className="relative">
          <Input
            placeholder="Search movies/TV shows..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearchChange}
            allowClear
            aria-label="Search movies and TV shows"
            role="searchbox"
          />
          {isPending && (
            <div 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              role="status"
              aria-live="polite"
              aria-label="Searching"
            >
              <Spin size="small" />
            </div>
          )}
        </div>
      </Col>
      <Col xs={12} md={4}>
        <Select
          placeholder="Type"
          value={filters.type}
          onChange={(value) => onFilterChange("type", value)}
          allowClear
          style={{ width: "100%" }}
          aria-label="Filter by type"
        >
          {typeOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={12} md={4}>
        <Select
          placeholder="Status"
          value={filters.status}
          onChange={(value) => onFilterChange("status", value)}
          allowClear
          style={{ width: "100%" }}
          aria-label="Filter by status"
        >
          {statusOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={12} md={4}>
        <Select
          placeholder="Rating"
          value={filters.rating}
          onChange={(value) => onFilterChange("rating", value)}
          allowClear
          style={{ width: "100%" }}
          aria-label="Filter by rating"
        >
          {ratingOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={6} md={2}>
        <Select
          placeholder="Sort by"
          value={filters.sort_by}
          onChange={(value) => onFilterChange("sort_by", value)}
          style={{ width: "100%" }}
          aria-label="Sort by"
        >
          {sortOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={6} md={2}>
        <Select
          placeholder="Order"
          value={filters.sort_order}
          onChange={(value) => onFilterChange("sort_order", value)}
          style={{ width: "100%" }}
          aria-label="Sort order"
        >
          {orderOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

export default MovieFilters; 