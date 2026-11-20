import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import VeyondTech from "./veyondtech/veyondtech";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <VeyondTech />
    </BrowserRouter>
  );
}