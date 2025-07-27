import { useMemo } from "react";
import { Alert, Card, Col, Row, Statistic, Skeleton } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import { useMovieStats } from "@/hooks/movies";

const Statistics = () => {
  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useMovieStats();
  
  const stats = statsData?.data;

  const statisticsCards = useMemo(() => [
    {
      title: "Total Items",
      value: stats?.total || 0,
      color: "#1890ff",
      prefix: <BarChartOutlined />,
      key: "total",
    },
    {
      title: "Movies",
      value: stats?.by_type.movies || 0,
      color: "#52c41a",
      key: "movies",
    },
    {
      title: "TV Shows",
      value: stats?.by_type.tv_shows || 0,
      color: "#fa8c16",
      key: "tv-shows",
    },
    {
      title: "Watched",
      value: stats?.by_status.watched || 0,
      color: "#722ed1",
      key: "watched",
    },
  ], [stats]);

  const loadingContent = (
    <Row gutter={[16, 16]}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Card className="text-center shadow-sm">
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
        </Col>
      ))}
    </Row>
  );

  if (statsError) {
    return (
      <div role="alert" aria-live="polite">
        <Alert
          message="Failed to load statistics"
          description="Please check your connection and try again."
          type="error"
          showIcon
          closable
        />
      </div>
    );
  }

  if (statsLoading) {
    return loadingContent;
  }

  return (
    <div role="region" aria-label="Movie and TV Show Statistics">
      <Row gutter={[16, 16]}>
        {statisticsCards.map(({ title, value, color, prefix, key }) => (
          <Col xs={24} sm={12} md={6} key={key}>
            <Card 
              className="text-center shadow-sm hover:shadow-md transition-shadow"
              role="article"
              aria-label={`${title}: ${value}`}
            >
              <Statistic
                title={title}
                value={value}
                loading={statsLoading}
                prefix={prefix}
                valueStyle={{ color }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Statistics; 