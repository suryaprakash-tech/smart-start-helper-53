import { useState } from "react";
import { Header } from "@/components/Header";
import { Camera, Scan, Info, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ARScannerPageProps {
  onBack: () => void;
}

export const ARScannerPage = ({ onBack }: ARScannerPageProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedObject, setScannedObject] = useState<string | null>(null);

  const simulatedObjects = [
    {
      name: "TV Remote Control",
      description: "This is a television remote control. Use it to change channels, adjust volume, and control your TV. The power button is usually at the top, volume buttons on the side.",
      tips: [
        "Point it directly at your TV",
        "Press firmly on buttons",
        "Check if batteries need replacing if not working"
      ]
    },
    {
      name: "Smartphone",
      description: "This is a mobile phone or smartphone. You can make calls, send messages, take photos, and connect to the internet with this device.",
      tips: [
        "Press and hold the power button to turn on/off",
        "Swipe up from bottom to go home",
        "Touch icons gently - no need to press hard"
      ]
    },
    {
      name: "Microwave",
      description: "This is a microwave oven for heating food quickly. Always use microwave-safe containers and follow cooking instructions.",
      tips: [
        "Set the time using number buttons",
        "Press Start to begin heating",
        "Use microwave-safe containers only"
      ]
    }
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScannedObject(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const randomObject = simulatedObjects[Math.floor(Math.random() * simulatedObjects.length)];
      setScannedObject(randomObject.name);
      setIsScanning(false);
    }, 3000);
  };

  const getObjectInfo = () => {
    return simulatedObjects.find(obj => obj.name === scannedObject);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Object Scanner" onBack={onBack} showBack />
      
      <div className="container mx-auto px-4 py-6">
        {!isScanning && !scannedObject && (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-primary-light to-accent p-8 rounded-2xl text-white">
              <Camera size={64} className="mx-auto mb-4" />
              <h2 className="text-2xl-accessible font-bold mb-3">
                Smart Object Scanner
              </h2>
              <p className="text-lg leading-relaxed">
                Point your camera at any object to learn how to use it
              </p>
            </div>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Info size={24} className="text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl-accessible font-semibold mb-2">
                    How it works
                  </h3>
                  <ul className="text-base space-y-2 text-muted-foreground">
                    <li>• Tap "Start Scanner" below</li>
                    <li>• Point your camera at any device</li>
                    <li>• Get instant help and tips</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleStartScan}
              size="lg"
              className="w-full h-16 text-xl bg-primary hover:bg-primary/90"
            >
              <Scan size={24} className="mr-3" />
              Start Scanner
            </Button>
          </div>
        )}

        {isScanning && (
          <div className="text-center space-y-6">
            <div className="bg-card p-8 rounded-2xl border-2 border-dashed border-primary">
              <div className="animate-pulse">
                <Scan size={64} className="mx-auto text-primary mb-4" />
                <h2 className="text-2xl-accessible font-bold mb-3">
                  Scanning...
                </h2>
                <p className="text-lg text-muted-foreground">
                  Hold your camera steady and point at the object
                </p>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-base text-muted-foreground">
                Make sure the object is well-lit and clearly visible
              </p>
            </div>
          </div>
        )}

        {scannedObject && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
              <div className="text-center mb-6">
                <div className="bg-accent p-4 rounded-full w-fit mx-auto mb-4">
                  <Info size={32} className="text-white" />
                </div>
                <h2 className="text-2xl-accessible font-bold text-foreground">
                  Object Identified!
                </h2>
              </div>
              
              {(() => {
                const objectInfo = getObjectInfo();
                if (!objectInfo) return null;
                
                return (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl-accessible font-bold mb-3 text-center">
                        {objectInfo.name}
                      </h3>
                      <p className="text-base leading-relaxed text-center">
                        {objectInfo.description}
                      </p>
                    </div>

                    <Card className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Lightbulb size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">How to use it:</h4>
                          <ul className="space-y-1">
                            {objectInfo.tips.map((tip, index) => (
                              <li key={index} className="text-sm">
                                • {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    <div className="flex space-x-3">
                      <Button
                        onClick={handleStartScan}
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        Scan Another
                      </Button>
                      <Button
                        onClick={() => setScannedObject(null)}
                        size="lg"
                        className="flex-1"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};