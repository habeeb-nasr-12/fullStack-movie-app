import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'default',
  tip = 'Loading...',
  spinning = true,
  children,
  className = ''
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 32 : size === 'small' ? 16 : 24 }} spin />;

  if (children) {
    return (
      <Spin spinning={spinning} tip={tip} indicator={antIcon} size={size}>
        {children}
      </Spin>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <Spin indicator={antIcon} size={size} />
      {tip && <span className="ml-3 text-gray-600">{tip}</span>}
    </div>
  );
};

export default Loading; 