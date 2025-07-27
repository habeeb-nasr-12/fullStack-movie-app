import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import Layout from '@/components/layout/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Link to="/">
              <Button type="primary" icon={<HomeOutlined />} size="large">
                Back to Dashboard
              </Button>
            </Link>
          }
        />
      </div>
    </Layout>
  );
};

export default NotFound; 