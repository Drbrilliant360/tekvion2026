import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Loader2, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function AdminContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "hero";
  const [loading, setLoading] = useState(true);

  // Hero slides
  const [slides, setSlides] = useState<any[]>([]);
  // Services
  const [services, setServices] = useState<any[]>([]);
  // Testimonials
  const [testimonials, setTestimonials] = useState<any[]>([]);
  // Settings
  const [settings, setSettings] = useState<any>(null);
  // About
  const [about, setAbout] = useState<any>(null);
  // Contact messages
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const [slidesRes, servicesRes, testimonialsRes, settingsRes, aboutRes, messagesRes] = await Promise.all([
      supabase.from("hero_slides").select("*").order("sort_order"),
      supabase.from("services").select("*").order("sort_order"),
      supabase.from("testimonials").select("*").order("created_at"),
      supabase.from("site_settings").select("*").limit(1).single(),
      supabase.from("about_content").select("*").limit(1).single(),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    setSlides(slidesRes.data || []);
    setServices(servicesRes.data || []);
    setTestimonials(testimonialsRes.data || []);
    setSettings(settingsRes.data);
    setAbout(aboutRes.data);
    setMessages(messagesRes.data || []);
    setLoading(false);
  };

  // Hero CRUD
  const saveSlide = async (slide: any) => {
    const { error } = await supabase.from("hero_slides").update({ title: slide.title, description: slide.description, sort_order: slide.sort_order, is_active: slide.is_active }).eq("id", slide.id);
    if (error) toast.error(error.message); else toast.success("Slide saved");
  };
  const addSlide = async () => {
    const { error } = await supabase.from("hero_slides").insert({ title: "New Slide", description: "Description", sort_order: slides.length });
    if (error) toast.error(error.message); else { toast.success("Slide added"); loadAll(); }
  };
  const deleteSlide = async (id: string) => {
    const { error } = await supabase.from("hero_slides").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Slide deleted"); loadAll(); }
  };

  // Services CRUD
  const saveService = async (svc: any) => {
    const { error } = await supabase.from("services").update({ title: svc.title, description: svc.description, image_url: svc.image_url, sort_order: svc.sort_order }).eq("id", svc.id);
    if (error) toast.error(error.message); else toast.success("Service saved");
  };
  const addService = async () => {
    const { error } = await supabase.from("services").insert({ title: "New Service", description: "Description", sort_order: services.length });
    if (error) toast.error(error.message); else { toast.success("Service added"); loadAll(); }
  };
  const deleteService = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Service deleted"); loadAll(); }
  };

  // Testimonials CRUD
  const saveTestimonial = async (t: any) => {
    const { error } = await supabase.from("testimonials").update({ name: t.name, text: t.text, is_active: t.is_active }).eq("id", t.id);
    if (error) toast.error(error.message); else toast.success("Testimonial saved");
  };
  const addTestimonial = async () => {
    const { error } = await supabase.from("testimonials").insert({ name: "Name", text: "Testimonial text" });
    if (error) toast.error(error.message); else { toast.success("Testimonial added"); loadAll(); }
  };
  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Testimonial deleted"); loadAll(); }
  };

  // Settings
  const saveSettings = async () => {
    if (!settings) return;
    const { error } = await supabase.from("site_settings").update({
      company_name: settings.company_name, phone: settings.phone, email: settings.email, address: settings.address, copyright: settings.copyright,
    }).eq("id", settings.id);
    if (error) toast.error(error.message); else toast.success("Settings saved");
  };

  // About
  const saveAbout = async () => {
    if (!about) return;
    const { error } = await supabase.from("about_content").update({
      executive_summary: about.executive_summary, vision: about.vision, mission: about.mission,
    }).eq("id", about.id);
    if (error) toast.error(error.message); else toast.success("About content saved");
  };

  // Messages
  const toggleRead = async (msg: any) => {
    await supabase.from("contact_messages").update({ is_read: !msg.is_read }).eq("id", msg.id);
    loadAll();
  };
  const deleteMessage = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    toast.success("Message deleted");
    loadAll();
  };

  const updateSlideLocal = (id: string, field: string, value: any) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };
  const updateServiceLocal = (id: string, field: string, value: any) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };
  const updateTestimonialLocal = (id: string, field: string, value: any) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <Tabs value={currentTab} onValueChange={(val) => setSearchParams({ tab: val })}>
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="hero">Hero Slides</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Hero Slides */}
        <TabsContent value="hero" className="space-y-4">
          {slides.map((slide) => (
            <Card key={slide.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Order: {slide.sort_order}</span>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteSlide(slide.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={slide.title} onChange={(e) => updateSlideLocal(slide.id, "title", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={slide.description} onChange={(e) => updateSlideLocal(slide.id, "description", e.target.value)} rows={2} />
                </div>
                <Button size="sm" onClick={() => saveSlide(slide)}>Save</Button>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={addSlide}><Plus className="mr-2 h-4 w-4" /> Add slide</Button>
        </TabsContent>

        {/* Services */}
        <TabsContent value="services" className="space-y-4">
          {services.map((svc) => (
            <Card key={svc.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Order: {svc.sort_order}</span>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteService(svc.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={svc.title} onChange={(e) => updateServiceLocal(svc.id, "title", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={svc.description} onChange={(e) => updateServiceLocal(svc.id, "description", e.target.value)} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input value={svc.image_url || ""} onChange={(e) => updateServiceLocal(svc.id, "image_url", e.target.value)} placeholder="https://..." />
                </div>
                <Button size="sm" onClick={() => saveService(svc)}>Save</Button>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={addService}><Plus className="mr-2 h-4 w-4" /> Add service</Button>
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials" className="space-y-4">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{t.name}</span>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteTestimonial(t.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={t.name} onChange={(e) => updateTestimonialLocal(t.id, "name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Text</Label>
                  <Textarea value={t.text} onChange={(e) => updateTestimonialLocal(t.id, "text", e.target.value)} rows={3} />
                </div>
                <Button size="sm" onClick={() => saveTestimonial(t)}>Save</Button>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" onClick={addTestimonial}><Plus className="mr-2 h-4 w-4" /> Add testimonial</Button>
        </TabsContent>

        {/* About */}
        <TabsContent value="about" className="space-y-4">
          {about && (
            <Card>
              <CardHeader><CardTitle className="font-['Rajdhani'] text-xl">About Content</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Executive Summary</Label>
                  <Textarea value={about.executive_summary} onChange={(e) => setAbout({ ...about, executive_summary: e.target.value })} rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Vision</Label>
                  <Textarea value={about.vision} onChange={(e) => setAbout({ ...about, vision: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Mission</Label>
                  <Textarea value={about.mission} onChange={(e) => setAbout({ ...about, mission: e.target.value })} rows={3} />
                </div>
                <Button onClick={saveAbout}>Save about content</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Messages */}
        <TabsContent value="messages" className="space-y-4">
          {messages.length === 0 ? (
            <Card><CardContent className="p-6 text-center text-muted-foreground">No contact messages yet.</CardContent></Card>
          ) : messages.map((msg) => (
            <Card key={msg.id} className={msg.is_read ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{msg.name}</span>
                      <span className="text-xs text-muted-foreground">• {msg.email}</span>
                      {msg.phone && <span className="text-xs text-muted-foreground">• {msg.phone}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                    <span className="text-xs text-muted-foreground mt-2 block">{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => toggleRead(msg)} title={msg.is_read ? "Mark unread" : "Mark read"}>
                      {msg.is_read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMessage(msg.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          {settings && (
            <Card>
              <CardHeader><CardTitle className="font-['Rajdhani'] text-xl">Company Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input value={settings.company_name} onChange={(e) => setSettings({ ...settings, company_name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Copyright</Label>
                  <Input value={settings.copyright} onChange={(e) => setSettings({ ...settings, copyright: e.target.value })} />
                </div>
                <Button onClick={saveSettings}>Save settings</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
