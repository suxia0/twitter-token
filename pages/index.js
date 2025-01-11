import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Home.module.css';

function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token) {
            router.push('/dashboard');
          }
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
    return (
      <div className={styles.container}>
        <div className={styles.loading}>加载中...</div>
      </div>
    );
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

export default HomePage;
