import { useLocation } from "@tanstack/react-router";

export default function useCheckActiveNav() {
  const { pathname } = useLocation();

  const checkActiveNav = (nav: string) => {
    const pathArray = pathname.split("/").filter((item) => item !== "");

    if (nav === "/" && pathArray.length < 1) return true;

    return pathArray.includes(nav.replace(/^\//, ""));
  };

  return { checkActiveNav };
}
