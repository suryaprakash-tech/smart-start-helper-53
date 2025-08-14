import { useState } from "react";
import { Header } from "@/components/Header";
import { NavigationCard } from "@/components/NavigationCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Camera, Phone, Settings, LifeBuoy } from "lucide-react";
import { TutorialsPage } from "./TutorialsPage";
import { ChatbotPage } from "./ChatbotPage";
import ARScannerPage from "./ARScannerPage";
import SettingsPage from "./SettingsPage";

type Page = 'home' | 'tutorials' | 'chatbot' | 'scanner' | 'settings';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigationItems = [
    {
      title: "Learn Technology",
      description: "Step-by-step tutorials for smartphones and computers",
      icon: BookOpen,
      page: 'tutorials' as const,
      gradient: false
    },
    {
      title: "AI Assistant",
      description: "Get instant help with your technology questions",
      icon: MessageCircle,
      page: 'chatbot' as const,
      gradient: true
    },
    {
      title: "Face & Object Scanner",
      description: "AI-powered facial expression and object detection",
      icon: Camera,
      page: 'scanner' as const,
      gradient: false
    }
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'tutorials':
        return <TutorialsPage onBack={() => setCurrentPage('home')} />;
      case 'chatbot':
        return <ChatbotPage onBack={() => setCurrentPage('home')} />;
      case 'scanner':
        return <ARScannerPage onBack={() => setCurrentPage('home')} />;
      case 'settings':
        return <SettingsPage onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <div className="min-h-screen bg-background pb-20">
            <Header title="AI-Powered TechGuide" />
            
            <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl-accessible font-bold text-foreground">
                  Smart TechGuide
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  AI facial recognition, smart chat assistant, and tech tutorials in a mobile-friendly app
                </p>
              </div>

              <div className="grid gap-6">
                {navigationItems.map((item, index) => (
                  <NavigationCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    gradient={item.gradient}
                    onClick={() => setCurrentPage(item.page)}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl-accessible font-semibold text-foreground text-center">
                  Quick Actions
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1 touch-target justify-start"
                    onClick={() => setCurrentPage('chatbot')}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    AI Support Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1 touch-target justify-start"
                    onClick={() => setCurrentPage('scanner')}
                  >
                    <Camera className="w-5 h-5 mr-3" />
                    Start Face Scan
                  </Button>
                </div>
              </div>
            </main>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderCurrentPage()}
      <BottomNavigation 
        currentPage={currentPage} 
        onPageChange={(page) => setCurrentPage(page as Page)} 
      />
    </div>
  );
};

export default Index;