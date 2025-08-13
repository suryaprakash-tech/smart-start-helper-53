import { useState } from "react";
import { Header } from "@/components/Header";
import { NavigationCard } from "@/components/NavigationCard";
import { BookOpen, Video, Smartphone, Wifi, Mail, Camera } from "lucide-react";

interface TutorialsPageProps {
  onBack: () => void;
}

export const TutorialsPage = ({ onBack }: TutorialsPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const tutorialCategories = [
    {
      id: "basics",
      title: "Phone Basics",
      description: "Learn to use your phone safely and confidently",
      icon: Smartphone,
      tutorials: [
        "Making and receiving calls",
        "Sending text messages",
        "Adjusting volume and brightness",
        "Using the home screen"
      ]
    },
    {
      id: "internet",
      title: "Internet & WiFi",
      description: "Connect to the internet and browse safely",
      icon: Wifi,
      tutorials: [
        "Connecting to WiFi",
        "Using a web browser",
        "Searching for information",
        "Staying safe online"
      ]
    },
    {
      id: "email",
      title: "Email & Messages",
      description: "Stay in touch with family and friends",
      icon: Mail,
      tutorials: [
        "Setting up email",
        "Reading and sending emails",
        "Using WhatsApp",
        "Video calling basics"
      ]
    },
    {
      id: "camera",
      title: "Photos & Camera",
      description: "Take and share beautiful memories",
      icon: Camera,
      tutorials: [
        "Taking photos",
        "Viewing your photo gallery",
        "Sharing photos with family",
        "Organizing your pictures"
      ]
    }
  ];

  if (selectedCategory) {
    const category = tutorialCategories.find(cat => cat.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="min-h-screen bg-background">
        <Header 
          title={category.title} 
          onBack={() => setSelectedCategory(null)} 
          showBack 
        />
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {category.tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <BookOpen size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl-accessible font-semibold mb-2">
                      {tutorial}
                    </h3>
                    <p className="text-muted-foreground">
                      Step-by-step guide with large text and clear instructions
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors touch-target">
                        Read Tutorial
                      </button>
                      <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors touch-target">
                        <Video size={20} className="mr-2 inline" />
                        Watch Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Learning Tutorials" onBack={onBack} showBack />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <p className="text-xl-accessible text-muted-foreground text-center">
            Choose a topic to start learning
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorialCategories.map((category) => (
            <NavigationCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};