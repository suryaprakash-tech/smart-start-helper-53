import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, StopCircle, RefreshCw } from 'lucide-react';
import { pipeline } from '@huggingface/transformers';

interface DetectedExpression {
  emotion: string;
  confidence: number;
  timestamp: Date;
}

interface FaceExpressionDetectorProps {
  onExpressionDetected?: (expression: DetectedExpression) => void;
}

export const FaceExpressionDetector = ({ onExpressionDetected }: FaceExpressionDetectorProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<DetectedExpression | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const classifierRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize the emotion classifier
  useEffect(() => {
    const initializeClassifier = async () => {
      try {
        setIsLoading(true);
        // Initialize emotion classification pipeline
        classifierRef.current = await pipeline(
          'image-classification',
          'onnx-community/emotion-ferplus-8',
          { device: 'webgpu' }
        );
        setError(null);
      } catch (err) {
        console.error('Failed to initialize emotion classifier:', err);
        setError('Failed to load emotion detection model');
      } finally {
        setIsLoading(false);
      }
    };

    initializeClassifier();
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsActive(true);
        startDetection();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Please allow camera access to use face expression detection');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsActive(false);
    setCurrentExpression(null);
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return null;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const detectExpression = async () => {
    if (!classifierRef.current || !isActive) return;
    
    try {
      const imageData = captureFrame();
      if (!imageData) return;

      // Convert dataURL to canvas for classification
      const results = await classifierRef.current(imageData);
      
      if (results && results.length > 0) {
        const topResult = results[0];
        const expression: DetectedExpression = {
          emotion: mapEmotionLabel(topResult.label),
          confidence: Math.round(topResult.score * 100),
          timestamp: new Date()
        };
        
        setCurrentExpression(expression);
        onExpressionDetected?.(expression);
      }
    } catch (err) {
      console.error('Expression detection error:', err);
    }
  };

  const mapEmotionLabel = (label: string): string => {
    // Map model labels to user-friendly emotions
    const emotionMap: { [key: string]: string } = {
      'neutral': 'Neutral',
      'happiness': 'Happy',
      'sadness': 'Sad',
      'anger': 'Angry',
      'fear': 'Fearful',
      'disgust': 'Disgusted',
      'surprise': 'Surprised',
      'contempt': 'Contemptuous'
    };
    
    return emotionMap[label.toLowerCase()] || label;
  };

  const startDetection = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Detect expressions every 2 seconds to avoid overwhelming the model
    intervalRef.current = setInterval(detectExpression, 2000);
  };

  const getEmotionColor = (emotion: string) => {
    const colorMap: { [key: string]: string } = {
      'Happy': 'bg-green-100 text-green-800 border-green-200',
      'Sad': 'bg-blue-100 text-blue-800 border-blue-200',
      'Angry': 'bg-red-100 text-red-800 border-red-200',
      'Fearful': 'bg-purple-100 text-purple-800 border-purple-200',
      'Surprised': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Neutral': 'bg-gray-100 text-gray-800 border-gray-200',
      'Disgusted': 'bg-orange-100 text-orange-800 border-orange-200',
      'Contemptuous': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    
    return colorMap[emotion] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="text-center space-y-4">
        <h3 className="text-xl-accessible font-semibold text-foreground">
          Face Expression Detection
        </h3>
        
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
            {error}
          </div>
        )}
        
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="hidden"
          />
          
          {!isActive && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="text-center space-y-2">
                <Camera size={48} className="mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Camera preview will appear here</p>
              </div>
            </div>
          )}
        </div>

        {currentExpression && (
          <div className="space-y-2">
            <Badge 
              className={`text-lg px-4 py-2 ${getEmotionColor(currentExpression.emotion)}`}
              variant="outline"
            >
              {currentExpression.emotion} ({currentExpression.confidence}%)
            </Badge>
            <p className="text-sm text-muted-foreground">
              Detected at {currentExpression.timestamp.toLocaleTimeString()}
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          {!isActive ? (
            <Button
              onClick={startCamera}
              disabled={isLoading}
              className="touch-target"
              size="lg"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Camera className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Loading...' : 'Start Detection'}
            </Button>
          ) : (
            <Button
              onClick={stopCamera}
              variant="destructive"
              className="touch-target"
              size="lg"
            >
              <StopCircle className="w-5 h-5 mr-2" />
              Stop Detection
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};