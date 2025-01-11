import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin"); // Redirect to admin page
  }, []);

  return null;
};

export default Home;
