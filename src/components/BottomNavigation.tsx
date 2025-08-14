import { Home, MessageCircle, Camera, BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'tutorials', icon: BookOpen, label: 'Learn' },
  { id: 'scanner', icon: Camera, label: 'Scanner' },
  { id: 'chatbot', icon: MessageCircle, label: 'Chat' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export const BottomNavigation = ({ currentPage, onPageChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 touch-target",
                "focus-accessible min-w-16",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon size={24} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};