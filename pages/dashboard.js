import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <h1>仪表板</h1>
      {/* 其他仪表板内容 */}
    </div>
  );
};

export default Dashboard;
