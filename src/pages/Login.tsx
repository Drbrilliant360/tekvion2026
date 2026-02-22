import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { toast.error(error); } else { toast.success("Signed in successfully"); navigate("/admin"); }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 bg-[hsl(210,40%,96%)] dark:bg-background">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-[480px] bg-card rounded-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-border overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-primary-dark" />
          <h1 className="text-2xl font-bold font-display text-foreground mb-1">{t("loginPage.welcomeBack")}</h1>
          <p className="text-muted-foreground text-sm mb-8">{t("loginPage.signInTo")}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("loginPage.email")}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-4" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("loginPage.password")}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-4" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-primary cursor-pointer" />
                {t("loginPage.rememberMe")}
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">{t("loginPage.forgotPassword")}</Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground bg-primary rounded-full hover:bg-primary-dark transition-colors disabled:opacity-60">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{t("loginPage.signIn")} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("loginPage.noAccount")}{" "}
              <Link to="/signup" className="font-semibold text-primary hover:text-accent transition-colors">{t("loginPage.signUp")}</Link>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Login;
