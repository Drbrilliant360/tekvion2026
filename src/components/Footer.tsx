import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import tekvionLogo from "@/assets/tekvion-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.whatWeDo"), href: "/#what-we-do" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.compliance"), href: "/compliance" },
    { label: t("nav.valueProposition"), href: "/value-proposition" },
    { label: t("nav.contactUs"), href: "/contact" },
  ];

  return (
    <footer className="bg-[hsl(203,90%,35%)] pt-10 sm:pt-16 pb-6 sm:pb-8 text-white">
      <div className="container px-4">
        {/* Subscribe bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
          <Link to="/" className="shrink-0">
            <img src={tekvionLogo} alt="TekVion Technology" className="h-10 brightness-0 invert" />
          </Link>
          <div className="flex w-full md:flex-1 md:max-w-xl md:ml-auto rtl:md:ml-0 rtl:md:mr-auto">
            <input
              type="email"
              placeholder={t("footer.enterEmail")}
              className="flex-1 min-w-0 px-3 sm:px-4 py-3 bg-white/10 border border-white/20 placeholder:text-white/40 rounded-l-full text-sm focus:outline-none focus:border-white/50 text-white rtl:rounded-l-none rtl:rounded-r-full"
            />
            <button className="px-4 sm:px-6 py-3 bg-accent text-white font-semibold text-xs sm:text-sm rounded-r-full hover:brightness-110 transition-all whitespace-nowrap uppercase tracking-wide rtl:rounded-r-none rtl:rounded-l-full">
              {t("footer.subscribe")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
          <div>
            <h3 className="text-lg font-bold font-display mb-4 uppercase">{t("footer.usefulLinks")}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-4 uppercase">{t("footer.news")}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{t("footer.newsText")}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-4 uppercase">{t("footer.company")}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{t("footer.companyText")}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display mb-4 uppercase">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                {t("footer.address")}
              </li>
              <li>
                <a href="tel:+971522900966" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all">
                  <Phone className="w-4 h-4 shrink-0" />
                  {t("footer.call")} {t("footer.phone")}
                </a>
              </li>
              <li>
                <a href="mailto:Info@tekvion.ae" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all">
                  <Mail className="w-4 h-4 shrink-0" />
                  {t("footer.email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">{t("footer.copyright")}</p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-[hsl(203,90%,35%)] transition-all" aria-label="Social link">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
