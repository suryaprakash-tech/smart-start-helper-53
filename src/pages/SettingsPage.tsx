import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Volume2, 
  Palette, 
  Shield, 
  Info,
  Smartphone,
  Camera,
  Mic
} from "lucide-react";
import { useState } from "react";

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [darkMode, setDarkMode] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);

  const checkPermissions = async () => {
    try {
      // Check camera permission
      const cameraResult = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setCameraPermission(cameraResult.state === 'granted');
      
      // Check microphone permission
      const micResult = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setMicPermission(micResult.state === 'granted');
    } catch (error) {
      console.log('Permission check not supported');
    }
  };

  useState(() => {
    checkPermissions();
  });

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
    } catch (error) {
      console.error('Camera permission denied');
    }
  };

  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
    } catch (error) {
      console.error('Microphone permission denied');
    }
  };

  const settingSections = [
    {
      title: "App Preferences",
      icon: Smartphone,
      items: [
        {
          label: "Notifications",
          description: "Receive helpful reminders and tips",
          icon: Bell,
          control: (
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          )
        },
        {
          label: "Dark Mode",
          description: "Switch to dark theme",
          icon: Palette,
          control: (
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          )
        }
      ]
    },
    {
      title: "Audio Settings",
      icon: Volume2,
      items: [
        {
          label: "Volume Level",
          description: "Adjust app sound volume",
          icon: Volume2,
          control: (
            <div className="w-32">
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">{volume[0]}%</span>
            </div>
          )
        }
      ]
    },
    {
      title: "Permissions",
      icon: Shield,
      items: [
        {
          label: "Camera Access",
          description: "Required for face detection and AR scanner",
          icon: Camera,
          control: (
            <div className="flex items-center gap-2">
              <Badge variant={cameraPermission ? "default" : "destructive"}>
                {cameraPermission ? "Granted" : "Denied"}
              </Badge>
              {!cameraPermission && (
                <Button size="sm" onClick={requestCameraPermission}>
                  Grant
                </Button>
              )}
            </div>
          )
        },
        {
          label: "Microphone Access",
          description: "Required for voice commands and AI chat",
          icon: Mic,
          control: (
            <div className="flex items-center gap-2">
              <Badge variant={micPermission ? "default" : "destructive"}>
                {micPermission ? "Granted" : "Denied"}
              </Badge>
              {!micPermission && (
                <Button size="sm" onClick={requestMicPermission}>
                  Grant
                </Button>
              )}
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Settings" onBack={onBack} showBack />
      
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl-accessible font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your app experience
          </p>
        </div>

        <div className="space-y-6">
          {settingSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <Card key={section.title} className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <SectionIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl-accessible font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div 
                        key={item.label} 
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <ItemIcon className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium text-foreground">
                              {item.label}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4">
                          {item.control}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl-accessible font-semibold text-foreground">
              About
            </h2>
          </div>
          
          <div className="space-y-2 text-muted-foreground">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>AI Features:</strong> Face Expression Detection, Smart Chat</p>
            <p><strong>Platform:</strong> Progressive Web App (PWA)</p>
            <p className="text-sm pt-2">
              This app uses advanced AI models for facial expression recognition and intelligent conversation assistance.
            </p>
          </div>
        </Card>

        <div className="pt-4">
          <Button 
            onClick={onBack} 
            size="lg" 
            className="w-full touch-target"
          >
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;