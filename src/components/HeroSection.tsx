import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
import heroBg2 from "@/assets/hero-bg-2.png";
import heroBg3 from "@/assets/hero-bg-3.png";
import TypedText from "./TypedText";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const bgImages = [heroBanner, heroBg2, heroBg3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [dbSlides, setDbSlides] = useState<{ title: string; description: string; title_ar?: string; description_ar?: string }[]>([]);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const fallbackSlides: { title: string; description: string; title_ar?: string; description_ar?: string }[] = [
    { title: t("hero.defaultTitle"), description: t("hero.defaultDesc") },
  ];

  const slides = dbSlides.length > 0 ? dbSlides : fallbackSlides;

  useEffect(() => {
    supabase.from("hero_slides").select("title, description, title_ar, description_ar").eq("is_active", true).order("sort_order").then(({ data }) => {
      if (data && data.length > 0) setDbSlides(data);
    });
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Slowly rotate background images every 8 seconds
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 8000);
    return () => clearInterval(bgTimer);
  }, []);

  const typedStrings = t("hero.typed", { returnObjects: true }) as string[];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-hero">
      {/* Background images with slow crossfade */}
      {bgImages.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          animate={{ opacity: i === bgIndex ? 0.6 : 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,40%,7%)]/80 via-[hsl(222,40%,7%)]/40 to-transparent rtl:bg-gradient-to-l" />

      <div className="container relative z-10 px-4 sm:px-6 pt-24 md:pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-2 sm:mb-4">
              {isRtl && slides[current].title_ar ? slides[current].title_ar : slides[current].title}
            </h1>
            <div className="text-base sm:text-xl md:text-2xl text-primary font-display font-semibold mb-3 sm:mb-6 h-7 sm:h-8">
              <TypedText strings={typedStrings} typeSpeed={60} backSpeed={30} backDelay={2000} />
            </div>
            <p className="text-sm sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-10 max-w-2xl leading-relaxed">
              {isRtl && slides[current].description_ar ? slides[current].description_ar : slides[current].description}
            </p>
            <div className="flex flex-row gap-3 sm:gap-4">
              <a href="#about-us" className="inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-3 bg-white text-[hsl(220,30%,10%)] font-semibold rounded-full hover:bg-white/90 transition-colors text-xs sm:text-base">{t("hero.aboutCompany")}</a>
              <a href="#contact" className="inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-xs sm:text-base">{t("hero.contact")}</a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-10 sm:mt-16">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
