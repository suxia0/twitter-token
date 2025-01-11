import { useEffect } from 'react';
import { useRouter } from 'next/router';

function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (!token) {
            router.push('/');
          }
        }
      } catch (error) {
        console.error('认证检查失败:', error);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      <h1>仪表板</h1>
      {/* 其他仪表板内容 */}
    </div>
  );
}

export default DashboardPage;
