import { motion } from "framer-motion";
import { Shield, Globe, BookOpen, Handshake, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bannerCompliance from "@/assets/banner-compliance.jpg";

const Compliance = () => {
  const { t } = useTranslation();

  const complianceItems = [
    { icon: Shield, titleKey: "item1Title", descKey: "item1Desc" },
    { icon: Globe, titleKey: "item2Title", descKey: "item2Desc" },
    { icon: BookOpen, titleKey: "item3Title", descKey: "item3Desc" },
    { icon: Handshake, titleKey: "item4Title", descKey: "item4Desc" },
    { icon: CheckCircle, titleKey: "item5Title", descKey: "item5Desc" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={bannerCompliance} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,80%,15%)]/90 to-[hsl(203,94%,30%)]/80" />
        </div>
        <div className="container px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4">{t("compliancePage.title")}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base text-white/80 max-w-3xl mx-auto">{t("compliancePage.subtitle")}</motion.p>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-background">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {complianceItems.map((item, i) => (
              <motion.div key={item.titleKey} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col sm:flex-row gap-3 sm:gap-6 p-5 sm:p-8 rounded-lg bg-card border border-border shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-foreground mb-1 sm:mb-2">{t(`compliancePage.${item.titleKey}`)}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{t(`compliancePage.${item.descKey}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;
