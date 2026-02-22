import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <SearchX className="w-8 h-8 text-primary" />
        </div>
        <p className="text-7xl font-bold font-display text-primary mb-2">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-3">
          {t("notFound.message")}
        </h1>
        <p className="text-muted-foreground mb-8">{t("notFound.subtitle")}</p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm"
        >
          {t("notFound.backHome")}
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
