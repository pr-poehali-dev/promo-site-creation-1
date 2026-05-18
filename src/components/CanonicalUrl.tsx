import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://sladkie-grezy.ru";

export default function CanonicalUrl() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");
    const fullUrl = `${SITE_URL}${path}`;

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = fullUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = fullUrl;
  }, [location.pathname]);

  return null;
}
