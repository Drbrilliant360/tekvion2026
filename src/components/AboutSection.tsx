import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about-us" className="py-12 sm:py-24 section-dark">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display mb-3 sm:mb-4">
            {t("about.title")} <span className="gradient-text">{t("about.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-lg opacity-60 max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 rounded-lg bg-card border border-border tech-glow"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display mb-3 sm:mb-4">{t("about.vision")}</h3>
            <p className="opacity-60 leading-relaxed text-sm sm:text-base">{t("about.visionText")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 rounded-lg bg-card border border-border tech-glow"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 sm:mb-6">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display mb-3 sm:mb-4">{t("about.mission")}</h3>
            <p className="opacity-60 leading-relaxed text-sm sm:text-base">{t("about.missionText")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
