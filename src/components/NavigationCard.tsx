import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface NavigationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient?: boolean;
}

export const NavigationCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick,
  gradient = false 
}: NavigationCardProps) => {
  return (
    <Card 
      className={`
        touch-target p-6 cursor-pointer transition-all duration-300 
        hover:scale-105 hover:shadow-lg focus-accessible
        ${gradient ? 'bg-gradient-to-br from-primary-light to-accent' : 'bg-card'}
        border-2 border-border hover:border-primary/30
      `}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`
          p-4 rounded-full 
          ${gradient ? 'bg-white/20' : 'bg-primary/10'}
        `}>
          <Icon 
            size={40} 
            className={gradient ? 'text-white' : 'text-primary'} 
          />
        </div>
        <div>
          <h3 className={`
            text-xl-accessible font-semibold mb-2
            ${gradient ? 'text-white' : 'text-foreground'}
          `}>
            {title}
          </h3>
          <p className={`
            text-base leading-relaxed
            ${gradient ? 'text-white/90' : 'text-muted-foreground'}
          `}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};