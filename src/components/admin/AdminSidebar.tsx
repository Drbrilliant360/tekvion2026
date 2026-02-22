import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileEdit,
  Grid3X3,
  Quote,
  Settings,
  ExternalLink,
  Mail,
  Image,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Hero Slides", url: "/admin/content", icon: Image },
  { title: "Services", url: "/admin/content?tab=services", icon: Grid3X3 },
  { title: "Testimonials", url: "/admin/content?tab=testimonials", icon: Quote },
  { title: "About", url: "/admin/content?tab=about", icon: FileEdit },
  { title: "Messages", url: "/admin/content?tab=messages", icon: Mail },
];

const siteNav = [
  { title: "Settings", url: "/admin/content?tab=settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/admin") return location.pathname === "/admin";
    if (url.includes("?tab=")) {
      const tab = new URLSearchParams(url.split("?")[1]).get("tab");
      const currentTab = new URLSearchParams(location.search).get("tab");
      return location.pathname === "/admin/content" && currentTab === tab;
    }
    return location.pathname === url;
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <NavLink to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <span className="font-semibold text-foreground text-lg font-['Rajdhani']">
            Tekvion CMS
          </span>
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            Site
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {siteNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span>View site</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
