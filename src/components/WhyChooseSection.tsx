import { motion } from "framer-motion";
import { Users, Cpu, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import choseGeometric from "@/assets/chose-geometric.png";

const WhyChooseSection = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: Users,
      title: t("whyChoose.expertTeam"),
      stat: t("whyChoose.expertStat"),
      description: t("whyChoose.expertDesc"),
    },
    {
      icon: Cpu,
      title: t("whyChoose.modernTech"),
      stat: t("whyChoose.modernStat"),
      description: t("whyChoose.modernDesc"),
    },
    {
      icon: Trophy,
      title: t("whyChoose.clientSuccess"),
      stat: t("whyChoose.clientStat"),
      description: t("whyChoose.clientDesc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 section-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={choseGeometric} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display text-foreground mb-3 sm:mb-4">
            {t("whyChoose.title")} <span className="gradient-text">{t("whyChoose.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("whyChoose.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              className="text-center p-5 sm:p-8 rounded-lg bg-card border border-border tech-glow"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <reason.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold font-display text-foreground mb-2">{reason.title}</h3>
              <p className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">{reason.stat}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
