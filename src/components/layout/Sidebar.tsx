
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  PlusCircle, 
  Users, 
  PlayCircle, 
  Settings,
} from 'lucide-react';

type SidebarItemProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

const SidebarItem = ({ href, icon: Icon, label, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
        active ? "bg-primary/10 text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="border-r bg-card min-h-screen w-64 p-4">
      <div className="flex flex-col h-full">
        <div className="mb-8 mt-2">
          <h1 className="text-xl font-bold text-primary flex items-center">
            <BarChart3 className="mr-2 h-6 w-6" />
            Campaign Manager
          </h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <SidebarItem 
            href="/" 
            icon={BarChart3} 
            label="Dashboard" 
            active={pathname === '/'} 
          />
          <SidebarItem 
            href="/campaigns/create" 
            icon={PlusCircle} 
            label="Create Campaign" 
            active={pathname === '/campaigns/create'} 
          />
          <SidebarItem 
            href="/targets" 
            icon={Users} 
            label="Target Management" 
            active={pathname === '/targets'} 
          />
          <SidebarItem 
            href="/journeys" 
            icon={PlayCircle} 
            label="Journey Execution" 
            active={pathname === '/journeys'} 
          />
        </nav>
        
        <div className="mt-auto pt-4">
          <SidebarItem 
            href="/settings" 
            icon={Settings} 
            label="Settings" 
            active={pathname === '/settings'} 
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
