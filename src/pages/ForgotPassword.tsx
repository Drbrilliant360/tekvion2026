import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, KeyRound, ArrowLeft, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 bg-[hsl(210,40%,96%)] dark:bg-background">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-[480px] bg-card rounded-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-border overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-primary-dark" />
          <div className="w-16 h-16 mx-auto mb-5 bg-primary/10 rounded-2xl flex items-center justify-center">
            <KeyRound className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground mb-1">{t("forgotPage.title")}</h1>
          <p className="text-muted-foreground text-sm mb-8">{t("forgotPage.subtitle")}</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("forgotPage.email")}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-4" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <button type="submit" className="w-full h-12 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground bg-primary rounded-full hover:bg-primary-dark transition-colors">
              {t("forgotPage.send")}
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t("forgotPage.backToSignIn")}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ForgotPassword;
