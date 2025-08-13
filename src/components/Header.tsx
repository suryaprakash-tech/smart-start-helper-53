import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header = ({ title, onBack, showBack = false }: HeaderProps) => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          {showBack && onBack && (
            <Button
              variant="ghost"
              size="lg"
              onClick={onBack}
              className="touch-target focus-accessible"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </Button>
          )}
          <h1 className="text-2xl-accessible font-bold text-foreground">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};