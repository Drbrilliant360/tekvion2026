import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import aboutCode from "@/assets/about-code.png";
import bannerAbout from "@/assets/banner-about.jpg";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={bannerAbout} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,80%,15%)]/90 to-[hsl(203,94%,30%)]/80" />
        </div>
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
        <div className="container px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4">
            {t("aboutPage.title")}
          </motion.h1>
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base text-white/80 max-w-3xl mx-auto">
            {t("aboutPage.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-background">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-5 sm:p-10 rounded-lg bg-card border border-border shadow-sm">
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">{t("aboutPage.executiveSummary")}</h2>
              <p className="text-primary font-semibold text-sm mb-6 uppercase tracking-wide">{t("aboutPage.companyName")}</p>
              <p className="text-muted-foreground leading-relaxed text-sm">{t("aboutPage.executiveText")}</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img src={aboutCode} alt="Technology and code" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-5 sm:p-8 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-xl font-bold font-display text-foreground mb-4">{t("aboutPage.vision")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t("aboutPage.visionText")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-5 sm:p-8 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-xl font-bold font-display text-foreground mb-4">{t("aboutPage.mission")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t("aboutPage.missionText")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
