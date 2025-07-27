import { useMemo } from "react";
import { Layout as AntLayout, Typography, Button, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  VideoCameraOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import AddUpdateMovie from "../movies/AddUpdateMovie";
import { useAuth } from "@/hooks/auth";

const { Header, Content } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  const userMenuItems = useMemo(() => [
    {
      key: 'profile',
      label: (
        <div className="px-2 py-1">
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Sign out',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ], [user?.name, user?.email, logout]);



  return (
    <AntLayout className="min-h-screen bg-gray-50">
      <Header 
        className="bg-white shadow-sm border-b"
        role="banner"
        aria-label="Application header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center space-x-4 text-decoration-none"
                aria-label="Go to home page"
              >
                <div className="flex justify-center items-center w-10 h-10">
                  <VideoCameraOutlined className="text-2xl text-brand-500" />
                </div>
                <div className="mb-3">
                  <Title level={3} className="!text-gray-900 md:block hidden">
                    Movies & TV Shows
                  </Title>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <AddUpdateMovie movie={null} />
              
              {user && (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                  aria-label="User menu"
                >
                  <Button
                    type="text"
                    className="flex items-center space-x-2 h-10 px-3"
                    aria-label={`User menu for ${user.name}`}
                  >
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="bg-brand-500"
                      alt={`Avatar for ${user.name}`}
                    />
                    <span className="hidden sm:inline text-gray-700">
                      {user.name}
                    </span>
                  </Button>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </Header>

      <Content 
        className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8"
        role="main"
        aria-label="Main content"
      >
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout; 