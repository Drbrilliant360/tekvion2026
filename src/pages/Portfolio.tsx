import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bannerPortfolio from "@/assets/banner-portfolio.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceCloud from "@/assets/service-cloud.jpg";
import serviceData from "@/assets/service-data.jpg";
import serviceSecurity from "@/assets/service-security.jpg";

const Portfolio = () => {
  const { t } = useTranslation();

  const projects = [
    { title: t("portfolioPage.project1Title"), category: t("portfolioPage.project1Category"), description: t("portfolioPage.project1Desc"), image: serviceAi },
    { title: t("portfolioPage.project2Title"), category: t("portfolioPage.project2Category"), description: t("portfolioPage.project2Desc"), image: serviceCloud },
    { title: t("portfolioPage.project3Title"), category: t("portfolioPage.project3Category"), description: t("portfolioPage.project3Desc"), image: serviceData },
    { title: t("portfolioPage.project4Title"), category: t("portfolioPage.project4Category"), description: t("portfolioPage.project4Desc"), image: serviceSecurity },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={bannerPortfolio} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,80%,15%)]/90 to-[hsl(203,94%,30%)]/80" />
        </div>
        <div className="container px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4">{t("portfolioPage.title")}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base text-white/80 max-w-2xl mx-auto">{t("portfolioPage.subtitle")}</motion.p>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-5xl mx-auto">
            {projects.map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-lg overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-40 sm:h-52 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4 sm:p-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold font-display text-foreground mt-2 mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 text-center">
          <p className="text-xl text-muted-foreground mb-8">{t("portfolioPage.cta")}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary-dark transition-colors">
            {t("portfolioPage.ctaButton")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
