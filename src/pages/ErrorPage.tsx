import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: string | number;
  onRetry?: () => void;
}

const ErrorPage = ({ title, message, code, onRetry }: ErrorPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        {code && (
          <p className="text-6xl font-bold font-display text-primary mb-2">{code}</p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground mb-3">
          {title || t("errorPage.title")}
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {message || t("errorPage.message")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm"
            >
              {t("errorPage.retry")}
            </button>
          )}
          <a
            href="/"
            className="px-6 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-colors text-sm"
          >
            {t("errorPage.backHome")}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
