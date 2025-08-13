import { useState } from "react";
import { NavigationCard } from "@/components/NavigationCard";
import { TutorialsPage } from "./TutorialsPage";
import { ChatbotPage } from "./ChatbotPage";
import { ARScannerPage } from "./ARScannerPage";
import { BookOpen, MessageCircle, Scan, Settings, Heart } from "lucide-react";

type Page = 'home' | 'tutorials' | 'chatbot' | 'scanner' | 'settings';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigationItems = [
    {
      id: 'tutorials' as Page,
      title: "Learning Tutorials",
      description: "Step-by-step guides to master your device",
      icon: BookOpen,
      gradient: true
    },
    {
      id: 'chatbot' as Page,
      title: "Ask Tech Helper",
      description: "Get instant answers to your tech questions",
      icon: MessageCircle,
      gradient: false
    },
    {
      id: 'scanner' as Page,
      title: "Object Scanner",
      description: "Point camera at objects to learn how to use them",
      icon: Scan,
      gradient: false
    },
    {
      id: 'settings' as Page,
      title: "Settings",
      description: "Adjust text size and accessibility options",
      icon: Settings,
      gradient: false
    }
  ];

  if (currentPage === 'tutorials') {
    return <TutorialsPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'chatbot') {
    return <ChatbotPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'scanner') {
    return <ARScannerPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-full">
                <Heart size={32} className="text-white" />
              </div>
              <h1 className="text-3xl-accessible font-bold text-foreground">
                TechGuide Senior
              </h1>
            </div>
            <p className="text-xl-accessible text-muted-foreground">
              Your friendly guide to technology
            </p>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl-accessible font-semibold mb-3">
            What would you like to learn today?
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose an option below to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {navigationItems.map((item) => (
            <NavigationCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onClick={() => setCurrentPage(item.id)}
              gradient={item.gradient}
            />
          ))}
        </div>

        {/* Quick Help Section */}
        <div className="mt-12 bg-card p-6 rounded-xl border border-border max-w-2xl mx-auto">
          <h3 className="text-xl-accessible font-semibold mb-4 text-center">
            Need immediate help?
          </h3>
          <div className="space-y-3">
            <button 
              onClick={() => setCurrentPage('chatbot')}
              className="w-full bg-primary/10 hover:bg-primary/20 text-primary p-4 rounded-lg transition-colors touch-target text-left"
            >
              <MessageCircle size={20} className="inline mr-3" />
              Ask: "How do I make a phone call?"
            </button>
            <button 
              onClick={() => setCurrentPage('scanner')}
              className="w-full bg-accent/10 hover:bg-accent/20 text-accent p-4 rounded-lg transition-colors touch-target text-left"
            >
              <Scan size={20} className="inline mr-3" />
              Scan any device to learn how to use it
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
