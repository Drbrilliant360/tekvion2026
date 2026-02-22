import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import serviceAi from "@/assets/service-ai.jpg";
import serviceCloud from "@/assets/service-cloud.jpg";
import serviceData from "@/assets/service-data.jpg";
import serviceSecurity from "@/assets/service-security.jpg";
import serviceApi from "@/assets/service-api.jpg";
import serviceAutomation from "@/assets/service-automation.jpg";
import serviceMobile from "@/assets/service-mobile.webp";
import serviceIt from "@/assets/service-it.png";

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    { title: t("services.aiMl"), description: t("services.aiMlDesc"), image: serviceAi },
    { title: t("services.cloud"), description: t("services.cloudDesc"), image: serviceCloud },
    { title: t("services.data"), description: t("services.dataDesc"), image: serviceData },
    { title: t("services.security"), description: t("services.securityDesc"), image: serviceSecurity },
    { title: t("services.api"), description: t("services.apiDesc"), image: serviceApi },
    { title: t("services.mobile"), description: t("services.mobileDesc"), image: serviceMobile },
    { title: t("services.automation"), description: t("services.automationDesc"), image: serviceAutomation },
    { title: t("services.it"), description: t("services.itDesc"), image: serviceIt },
  ];

  return (
    <section id="what-we-do" className="py-16 sm:py-24 section-light relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-primary/5 animate-float" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-primary/3 animate-float" style={{ animationDelay: "3s" }} />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
         <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display text-foreground mb-3 sm:mb-4">
            {t("services.title")} <span className="gradient-text">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group bg-card rounded-lg overflow-hidden tech-glow border border-border hover:border-primary/30 transition-all"
            >
              <div className="h-36 sm:h-48 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold font-display text-foreground mb-2">{service.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
