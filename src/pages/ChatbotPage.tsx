import { useState } from "react";
import { Header } from "@/components/Header";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatbotPageProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatbotPage = ({ onBack }: ChatbotPageProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your tech helper. I'm here to answer any questions about using your phone or technology. What would you like to learn today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("call") || lowerQuestion.includes("phone")) {
      return "To make a call, tap the green phone icon on your home screen. Then tap the keypad to enter the number, or look for the contact's name in your contacts list. Tap the green call button when ready!";
    }
    
    if (lowerQuestion.includes("wifi") || lowerQuestion.includes("internet")) {
      return "To connect to WiFi, go to Settings > WiFi. Look for your network name and tap it. Enter your password carefully - the letters are case-sensitive. Once connected, you'll see a WiFi symbol at the top of your screen.";
    }
    
    if (lowerQuestion.includes("text") || lowerQuestion.includes("message")) {
      return "To send a text message, tap the Messages app (usually looks like a speech bubble). Tap the '+' or 'New Message' button, enter the person's name or phone number, type your message, and tap Send. It's that simple!";
    }
    
    return "That's a great question! I'd be happy to help you with that. Can you tell me more specifically what you're trying to do? For example, are you having trouble with calls, messages, internet, or something else?";
  };

  const quickQuestions = [
    "How do I make a phone call?",
    "How do I connect to WiFi?",
    "How do I send a text message?",
    "How do I take a photo?",
    "How do I adjust the volume?"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Ask Tech Helper" onBack={onBack} showBack />
      
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] p-4 rounded-2xl
                  ${message.isUser 
                    ? 'bg-primary text-primary-foreground ml-4' 
                    : 'bg-card border border-border mr-4'
                  }
                `}
              >
                {!message.isUser && (
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle size={20} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Tech Helper</span>
                  </div>
                )}
                <p className="text-base leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-t border-border bg-card/50">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Quick questions you can ask:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-2 rounded-lg text-sm transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex space-x-3">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 min-h-[60px] text-base resize-none focus-accessible"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="touch-target bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};