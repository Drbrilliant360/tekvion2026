import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Database, Building2, Cog, Lightbulb, Shield,
  Cloud, Leaf, Scale, Monitor, ListChecks,
} from "lucide-react";

const solutionKeys = [
  { key: "dataManagement", icon: Database },
  { key: "enterprise", icon: Building2 },
  { key: "automationIntegration", icon: Cog },
  { key: "ai", icon: Lightbulb },
  { key: "cybersecurity", icon: Shield },
  { key: "cloudSovereignty", icon: Cloud },
  { key: "green", icon: Leaf },
  { key: "governance", icon: Scale },
  { key: "managed", icon: Monitor },
  { key: "itsm", icon: ListChecks },
];

const SolutionsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-24 section-dark">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display mb-3 sm:mb-4">
            {t("solutions.title")} <span className="gradient-text">{t("solutions.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {solutionKeys.map((solution, i) => (
            <motion.div
              key={solution.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group flex flex-col items-center text-center p-4 sm:p-6 rounded-lg bg-card border border-border hover:border-primary/50 tech-glow transition-all cursor-default"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <solution.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold font-display leading-tight">{t(`solutions.${solution.key}`)}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
