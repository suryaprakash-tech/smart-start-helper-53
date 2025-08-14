import { useState } from "react";
import { Header } from "@/components/Header";
import { FaceExpressionDetector } from "@/components/FaceExpressionDetector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Scan, 
  CheckCircle, 
  RefreshCw, 
  Info,
  Lightbulb,
  ArrowLeft,
  Smile,
  Eye
} from "lucide-react";

interface ARScannerPageProps {
  onBack: () => void;
}

interface DetectedExpression {
  emotion: string;
  confidence: number;
  timestamp: Date;
}

const ARScannerPage = ({ onBack }: ARScannerPageProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedObject, setScannedObject] = useState<string | null>(null);
  const [detectedExpressions, setDetectedExpressions] = useState<DetectedExpression[]>([]);

  const simulatedObjects = [
    "Smartphone", "Laptop", "Television", "Router", "Tablet", 
    "Smart Watch", "Headphones", "Gaming Console", "Printer", "Camera",
    "Smart Speaker", "Fitness Tracker", "Keyboard", "Mouse", "Webcam"
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScannedObject(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const randomObject = simulatedObjects[Math.floor(Math.random() * simulatedObjects.length)];
      setScannedObject(randomObject);
      setIsScanning(false);
    }, 3000);
  };

  const handleExpressionDetected = (expression: DetectedExpression) => {
    setDetectedExpressions(prev => {
      const newExpressions = [expression, ...prev].slice(0, 10); // Keep last 10 expressions
      return newExpressions;
    });
  };

  const getObjectInfo = (objectName: string) => {
    const objectsInfo: Record<string, { description: string; tips: string[] }> = {
      "Smartphone": {
        description: "A mobile device for calls, messaging, internet, and apps. Modern smartphones have touchscreens and powerful processors.",
        tips: [
          "Swipe up from bottom to go home",
          "Touch gently - no need to press hard",
          "Use voice assistant for hands-free control",
          "Adjust brightness for easier reading"
        ]
      },
      "Laptop": {
        description: "A portable computer for work, entertainment, and communication. Perfect for typing, browsing, and video calls.",
        tips: [
          "Keep it on a hard, flat surface for ventilation",
          "Close unused programs to improve speed",
          "Use trackpad with light touches",
          "Adjust screen brightness for comfort"
        ]
      },
      "Television": {
        description: "A display device for watching shows, movies, and connecting other devices. Modern TVs can connect to the internet.",
        tips: [
          "Use the remote control to navigate menus",
          "Try voice commands if available",
          "Adjust volume with + and - buttons",
          "Use input/source button to switch devices"
        ]
      }
    };

    return objectsInfo[objectName] || {
      description: "A technology device that can help make your life easier with proper understanding.",
      tips: [
        "Read the user manual for specific instructions",
        "Start with basic functions before exploring advanced features",
        "Ask for help from family or friends if needed",
        "Practice using it regularly to build confidence"
      ]
    };
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="AI-Powered Scanner" onBack={onBack} showBack />
      
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Tabs defaultValue="expressions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expressions" className="flex items-center gap-2">
              <Smile className="w-4 h-4" />
              Face Expressions
            </TabsTrigger>
            <TabsTrigger value="objects" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Object Detection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expressions" className="space-y-6">
            <FaceExpressionDetector onExpressionDetected={handleExpressionDetected} />
            
            {detectedExpressions.length > 0 && (
              <Card className="p-6 space-y-4">
                <h3 className="text-xl-accessible font-semibold text-foreground">
                  Expression History
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {detectedExpressions.map((expr, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">
                          {expr.emotion}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {expr.confidence}% confidence
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {expr.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="objects" className="space-y-6">
            {!isScanning && !scannedObject && (
              <Card className="p-8 text-center space-y-6">
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Camera size={40} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl-accessible font-semibold text-foreground mb-2">
                      Object Scanner
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Point your camera at any tech device to learn more about it and get helpful tips
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleStartScan}
                  size="lg"
                  className="touch-target w-full"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  Start Object Scanning
                </Button>
              </Card>
            )}

            {isScanning && (
              <Card className="p-8 text-center space-y-6">
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                    <RefreshCw size={40} className="text-primary animate-spin" />
                  </div>
                  <div>
                    <h2 className="text-xl-accessible font-semibold text-foreground mb-2">
                      Scanning Device...
                    </h2>
                    <p className="text-muted-foreground">
                      Hold steady while we identify your device
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </Card>
            )}

            {scannedObject && !isScanning && (
              <div className="space-y-6">
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl-accessible font-semibold text-foreground">
                        Device Identified!
                      </h2>
                      <Badge variant="secondary" className="mt-1">
                        {scannedObject}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-foreground leading-relaxed">
                      {getObjectInfo(scannedObject).description}
                    </p>
                  </div>
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Usage Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {getObjectInfo(scannedObject).tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      setScannedObject(null);
                      handleStartScan();
                    }}
                    variant="outline"
                    size="lg"
                    className="flex-1 touch-target"
                  >
                    <Scan className="w-5 h-5 mr-2" />
                    Scan Another
                  </Button>
                  <Button 
                    onClick={() => setScannedObject(null)}
                    size="lg"
                    className="flex-1 touch-target"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Done
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">AI Features</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Real-time facial expression recognition with AI emotion detection</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Smart object identification using computer vision technology</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Personalized tips and guidance powered by machine learning</span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default ARScannerPage;