import { Card } from "antd";
import Layout from "@/components/layout/Layout";
import { MoviesTable, Statistics } from "@/components/movies";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <Statistics />
        <Card className="shadow-sm" title="Your Favorite Movies & TV Shows">
          <MoviesTable />
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
