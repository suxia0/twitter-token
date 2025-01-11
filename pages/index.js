import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查用户是否已登录
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // 如果已登录，重定向到仪表板
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('认证检查失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          欢迎使用 Twitter 管理系统
        </h1>
        <div className={styles.loginContainer}>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
