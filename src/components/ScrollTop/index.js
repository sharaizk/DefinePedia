import { useEffect } from "react";
import { useRouter } from "next/router";
export default function ScrollTop() {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
  }, []);

  return "";
}
