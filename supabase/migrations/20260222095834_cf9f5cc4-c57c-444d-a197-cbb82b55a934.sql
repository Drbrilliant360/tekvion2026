-- Add Arabic columns to hero_slides
ALTER TABLE public.hero_slides 
ADD COLUMN title_ar TEXT,
ADD COLUMN description_ar TEXT;

-- Update existing records with translations
UPDATE public.hero_slides 
SET 
  title_ar = 'الابتكار بالذكاء الاصطناعي والسحابة',
  description_ar = 'نقدم حلول الذكاء الاصطناعي والسحابة والأتمتة لتسريع نتائج الأعمال وتحقيق قيمة قابلة للقياس.'
WHERE title = 'Innovating with AI & Cloud';

UPDATE public.hero_slides 
SET 
  title_ar = 'منصات سحابية أصلية',
  description_ar = 'بناء وتشغيل منصات سحابية مرنة تتوسع مع عملك وتقلل من وقت الوصول إلى السوق.'
WHERE title = 'Cloud-Native Platforms';

UPDATE public.hero_slides 
SET 
  title_ar = 'البيانات والتحليلات على نطاق واسع',
  description_ar = 'تحويل البيانات إلى رؤى قابلة للتنفيذ باستخدام التحليلات والتعلم الآلي ومنصات البيانات الموثوقة.'
WHERE title = 'Data & Analytics at Scale';

UPDATE public.hero_slides 
SET 
  title_ar = 'حلول التحول الرقمي',
  description_ar = 'نصمم وننفذ التحول الرقمي الشامل — الاستراتيجية والسحابة والبيانات والأتمتة لدفع نتائج الأعمال القابلة للقياس.'
WHERE title = 'Digital Transformation Solutions';