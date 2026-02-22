import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Quote, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { contactSchema, checkRateLimit } from "@/lib/validation";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").eq("is_active", true).order("created_at");
      return data || [];
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse({ name, email, phone, message });
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || t("toast.invalidInput"));
      return;
    }
    if (!checkRateLimit("contact-section")) {
      toast.error(t("toast.tooManySubmissions"));
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: result.data.name,
      phone: result.data.phone || "",
      email: result.data.email,
      message: result.data.message,
    });
    setSending(false);
    if (error) toast.error(t("toast.failedToSend")); else {
      toast.success(t("toast.messageSent"));
      setName(""); setPhone(""); setEmail(""); setMessage("");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 section-dark">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6 sm:mb-8">
              {t("contact.title")} <span className="gradient-text">{t("contact.titleHighlight")}</span>
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input type="text" placeholder={t("contact.name")} value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-sm bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm" />
              <input type="tel" placeholder={t("contact.phone")} value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-sm bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm" />
              <input type="email" placeholder={t("contact.email")} value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-sm bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm" />
              <textarea placeholder={t("contact.message")} rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-sm bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none text-sm" />
              <button type="submit" disabled={sending}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary-dark transition-colors disabled:opacity-60 text-sm sm:text-base w-full sm:w-auto justify-center">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {t("contact.send")}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6 sm:mb-8">
              {t("contact.testimonialsTitle")} <span className="gradient-text">{t("contact.testimonialsHighlight")}</span>
            </h2>
            {testimonials.length > 0 && (
              <>
                <div className="relative p-5 sm:p-8 rounded-lg bg-card border border-border min-h-0 sm:min-h-[280px]">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20 mb-3 sm:mb-4" />
                  <p className="opacity-70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-lg">{testimonials[currentTestimonial]?.text}</p>
                  <p className="font-bold font-display text-lg sm:text-xl text-primary">{testimonials[currentTestimonial]?.name}</p>
                </div>
                <div className="flex gap-3 mt-6">
                  {testimonials.map((_: any, i: number) => (
                    <button key={i} onClick={() => setCurrentTestimonial(i)}
                      className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                      aria-label={`Testimonial ${i + 1}`} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
