import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: window.location.origin } });
    setLoading(false);
    if (error) { toast.error(error.message); } else { toast.success("Account created! You can now sign in."); navigate("/login"); }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 bg-[hsl(210,40%,96%)] dark:bg-background">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-[480px] bg-card rounded-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-border overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-primary-dark" />
          <h1 className="text-2xl font-bold font-display text-foreground mb-1">{t("signupPage.createAccount")}</h1>
          <p className="text-muted-foreground text-sm mb-8">{t("signupPage.joinTekvion")}</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("signupPage.fullName")}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-4" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required
                  className="w-full h-12 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("signupPage.email")}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-4" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                  className="w-full h-12 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("signupPage.password")}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-4" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full h-12 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("signupPage.confirmPassword")}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-4" />
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" required
                  className="w-full h-12 pl-11 pr-4 rtl:pr-11 rtl:pl-4 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground bg-primary rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50">
              {loading ? t("signupPage.signingUp") : t("signupPage.signUp")}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("signupPage.haveAccount")}{" "}
              <Link to="/login" className="font-semibold text-primary hover:text-accent transition-colors">{t("signupPage.signIn")}</Link>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Signup;
