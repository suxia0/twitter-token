import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin"); // 使用 replace 替代 push，避免历史记录堆叠
  }, [router]);

  return null; // 返回空内容
}
