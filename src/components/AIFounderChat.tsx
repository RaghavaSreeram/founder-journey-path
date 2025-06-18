
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Bot, User, Lightbulb, TrendingUp, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface FounderContext {
  stage?: string;
  industry?: string;
  experience?: string;
  currentChallenges?: string[];
  goals?: string[];
}

interface AIFounderChatProps {
  onBack: () => void;
}

const AIFounderChat = ({ onBack }: AIFounderChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI startup buddy. I'm here to help you navigate your entrepreneurial journey. Tell me about your current situation - are you exploring ideas, building something, or scaling up? What's on your mind today?",
      timestamp: new Date(),
      suggestions: [
        "I have an idea but don't know where to start",
        "I'm struggling to validate my concept",
        "I need help with my business model",
        "I'm looking for co-founders"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [founderContext, setFounderContext] = useState<FounderContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeFounderContext = (message: string, previousContext: FounderContext): FounderContext => {
    const lowerMessage = message.toLowerCase();
    const newContext = { ...previousContext };

    // Detect stage
    if (lowerMessage.includes('idea') && (lowerMessage.includes('exploring') || lowerMessage.includes('brainstorm'))) {
      newContext.stage = 'ideation';
    } else if (lowerMessage.includes('validate') || lowerMessage.includes('test') || lowerMessage.includes('mvp')) {
      newContext.stage = 'validation';
    } else if (lowerMessage.includes('build') || lowerMessage.includes('develop') || lowerMessage.includes('launch')) {
      newContext.stage = 'building';
    } else if (lowerMessage.includes('scale') || lowerMessage.includes('grow') || lowerMessage.includes('funding')) {
      newContext.stage = 'scaling';
    }

    // Detect experience level
    if (lowerMessage.includes('first time') || lowerMessage.includes('beginner') || lowerMessage.includes('new to')) {
      newContext.experience = 'beginner';
    } else if (lowerMessage.includes('experienced') || lowerMessage.includes('serial entrepreneur')) {
      newContext.experience = 'experienced';
    }

    // Detect challenges
    const challenges = [];
    if (lowerMessage.includes('co-founder') || lowerMessage.includes('team')) challenges.push('team');
    if (lowerMessage.includes('funding') || lowerMessage.includes('money') || lowerMessage.includes('investment')) challenges.push('funding');
    if (lowerMessage.includes('customer') || lowerMessage.includes('market')) challenges.push('market');
    if (lowerMessage.includes('product') || lowerMessage.includes('feature')) challenges.push('product');
    
    if (challenges.length > 0) {
      newContext.currentChallenges = [...(newContext.currentChallenges || []), ...challenges];
    }

    return newContext;
  };

  const generateAIResponse = (userMessage: string, context: FounderContext): { content: string; suggestions: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Context-aware responses based on founder situation
    if (context.stage === 'ideation') {
      if (lowerMessage.includes('idea') && lowerMessage.includes('start')) {
        return {
          content: "Great! Let's start with your idea. The key is to focus on the problem you're solving rather than the solution itself. What problem have you noticed that really frustrates you or people around you? I can help you explore market opportunities, validate the problem, and even suggest some frameworks like the Lean Canvas to structure your thinking.",
          suggestions: [
            "Help me identify problems worth solving",
            "I want to explore market trends",
            "Show me how to validate my idea",
            "I need a business model framework"
          ]
        };
      }
    }

    if (context.stage === 'validation') {
      return {
        content: "Validation is crucial! You're smart to focus on this early. The best way to validate is to talk to potential customers before building anything. I can help you create interview scripts, design quick tests, build landing pages to gauge interest, or even set up simple surveys. What's your idea about, and who do you think would benefit from it?",
        suggestions: [
          "Help me create customer interview questions",
          "I want to build a landing page to test interest",
          "Show me how to run market experiments",
          "I need help finding my target customers"
        ]
      };
    }

    if (lowerMessage.includes('co-founder') || lowerMessage.includes('team')) {
      return {
        content: "Finding the right co-founder is like finding a business marriage partner! You want someone who complements your skills, shares your vision, but brings different expertise. What skills do you have, and what areas do you feel you need help with? I can help you define your ideal co-founder profile and suggest ways to find them.",
        suggestions: [
          "Help me define what skills I need in a co-founder",
          "Where can I find potential co-founders?",
          "How do I evaluate if someone is right?",
          "What should I discuss before partnering?"
        ]
      };
    }

    if (lowerMessage.includes('business model') || lowerMessage.includes('monetize')) {
      return {
        content: "Business models can seem complex, but let's break it down simply. How do you plan to create value for customers, and how will that translate to revenue for you? I can walk you through different models like subscription, marketplace, freemium, or one-time purchase, and help you choose what fits your idea best.",
        suggestions: [
          "Show me different business model options",
          "Help me price my product/service",
          "I want to understand revenue streams",
          "How do I create a sustainable model?"
        ]
      };
    }

    // Default response based on context
    if (context.stage) {
      return {
        content: `I can see you're in the ${context.stage} stage. That's exciting! Each stage has its own challenges and opportunities. What specific aspect are you struggling with or want to focus on right now? I'm here to provide practical advice, frameworks, and tools tailored to your situation.`,
        suggestions: [
          "What should I focus on next?",
          "What are common mistakes at this stage?",
          "Show me a roadmap for my stage",
          "I need specific tools and resources"
        ]
      };
    }

    // Generic helpful response
    return {
      content: "I'm here to help you with whatever entrepreneurial challenge you're facing. Whether it's idea development, market validation, building your product, finding co-founders, or scaling your business - just tell me what's on your mind and I'll provide practical guidance tailored to your situation.",
      suggestions: [
        "I'm exploring business ideas",
        "I need help with validation",
        "I'm looking for co-founders",
        "Help me with my go-to-market strategy"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Analyze context from the message
      const updatedContext = analyzeFounderContext(inputMessage, founderContext);
      setFounderContext(updatedContext);

      // Generate AI response
      const { content, suggestions } = generateAIResponse(inputMessage, updatedContext);

      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Your AI Startup Buddy
              </h1>
              <p className="text-gray-600">Get personalized guidance for your entrepreneurial journey</p>
            </div>
            {founderContext.stage && (
              <Badge className="bg-purple-100 text-purple-700">
                {founderContext.stage} stage
              </Badge>
            )}
          </div>
        </div>

        <Card className="shadow-lg border-0 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-auto py-1 px-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-white border shadow-sm rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex space-x-3">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your startup journey..."
                className="flex-1 min-h-[60px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIFounderChat;
