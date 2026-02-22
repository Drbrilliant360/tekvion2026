import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Grid3X3, Quote, Mail, FileEdit, Settings, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ slides: 0, services: 0, testimonials: 0, messages: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [s, sv, t, m] = await Promise.all([
        supabase.from("hero_slides").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id, is_read"),
      ]);
      const msgs = m.data || [];
      setStats({
        slides: s.count || 0,
        services: sv.count || 0,
        testimonials: t.count || 0,
        messages: msgs.length,
        unread: msgs.filter((x: any) => !x.is_read).length,
      });
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  const cards = [
    { label: "Hero Slides", value: stats.slides, icon: FileText, color: "bg-primary/10 text-primary" },
    { label: "Services", value: stats.services, icon: Grid3X3, color: "bg-accent/10 text-accent" },
    { label: "Testimonials", value: stats.testimonials, icon: Quote, color: "bg-green-500/10 text-green-600" },
    { label: `Messages (${stats.unread} unread)`, value: stats.messages, icon: Mail, color: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-['Rajdhani'] text-xl">Quick actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/admin/content")}><FileEdit className="mr-2 h-4 w-4" /> Edit hero slides</Button>
            <Button variant="secondary" onClick={() => navigate("/admin/content?tab=services")}><Grid3X3 className="mr-2 h-4 w-4" /> Manage services</Button>
            <Button variant="secondary" onClick={() => navigate("/admin/content?tab=testimonials")}><Quote className="mr-2 h-4 w-4" /> Manage testimonials</Button>
            <Button variant="secondary" onClick={() => navigate("/admin/content?tab=messages")}><Mail className="mr-2 h-4 w-4" /> View messages</Button>
            <Button variant="secondary" onClick={() => navigate("/admin/content?tab=settings")}><Settings className="mr-2 h-4 w-4" /> Site settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
