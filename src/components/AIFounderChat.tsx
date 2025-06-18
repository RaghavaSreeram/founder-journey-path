
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Bot, User, Lightbulb, TrendingUp, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useProjects";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ProjectContext {
  stage: string;
  progress: number;
  nextActions: string[];
  tags: string[];
  description: string;
  conversationHistory: Message[];
}

interface AIFounderChatProps {
  onBack: () => void;
}

const AIFounderChat = ({ onBack }: AIFounderChatProps) => {
  const { currentProject, updateProject } = useProjects();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize conversation for current project
  useEffect(() => {
    if (currentProject) {
      const savedMessages = localStorage.getItem(`chat_${currentProject.id}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Create initial welcome message based on project
        const welcomeMessage: Message = {
          id: '1',
          type: 'ai',
          content: `Hi! I'm your AI startup buddy for "${currentProject.name}". I can see you're in the ${currentProject.stage} stage with ${currentProject.progress}% progress. Let's continue building your startup together! What would you like to work on today?`,
          timestamp: new Date(),
          suggestions: generateInitialSuggestions(currentProject)
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [currentProject]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (currentProject && messages.length > 0) {
      localStorage.setItem(`chat_${currentProject.id}`, JSON.stringify(messages));
    }
  }, [messages, currentProject]);

  const generateInitialSuggestions = (project: any): string[] => {
    const stageBasedSuggestions: Record<string, string[]> = {
      ideation: [
        "Help me refine my startup idea",
        "I want to research my target market",
        "How do I validate this concept?",
        "What problem am I really solving?"
      ],
      validation: [
        "Create customer interview questions",
        "Help me build a landing page",
        "How do I run market experiments?",
        "Find my ideal customer profile"
      ],
      mvp: [
        "Plan my MVP features",
        "Choose the right tech stack",
        "Create a development roadmap",
        "Set up user testing"
      ],
      launch: [
        "Plan my go-to-market strategy",
        "Create a launch checklist",
        "Set up analytics and metrics",
        "Build my launch campaign"
      ],
      revenue: [
        "Optimize my pricing model",
        "Scale my customer acquisition",
        "Improve unit economics",
        "Plan for Series A"
      ],
      scale: [
        "Build my team structure",
        "Expand to new markets",
        "Optimize operations",
        "Plan international expansion"
      ]
    };

    return stageBasedSuggestions[project.stage] || [
      "What should I focus on next?",
      "Help me prioritize my tasks",
      "Review my progress",
      "Update my action plan"
    ];
  };

  const analyzeProjectContext = (message: string, project: any): { updatedProject: any; contextInsights: string[] } => {
    const lowerMessage = message.toLowerCase();
    const insights: string[] = [];
    let updatedProject = { ...project };

    // Detect progress indicators
    if (lowerMessage.includes('completed') || lowerMessage.includes('finished') || lowerMessage.includes('done')) {
      if (project.progress < 90) {
        updatedProject.progress = Math.min(project.progress + 10, 100);
        insights.push('Progress updated based on completed tasks');
      }
    }

    // Detect stage progression signals
    const stageProgression: Record<string, string> = {
      ideation: 'validation',
      validation: 'mvp',
      mvp: 'launch',
      launch: 'revenue',
      revenue: 'scale'
    };

    if (lowerMessage.includes('validated') && project.stage === 'ideation') {
      updatedProject.stage = 'validation';
      insights.push('Stage progressed to validation');
    } else if (lowerMessage.includes('built') && lowerMessage.includes('mvp') && project.stage === 'validation') {
      updatedProject.stage = 'mvp';
      insights.push('Stage progressed to MVP development');
    } else if (lowerMessage.includes('launched') && project.stage === 'mvp') {
      updatedProject.stage = 'launch';
      insights.push('Stage progressed to launch');
    }

    // Extract new action items
    const actionKeywords = ['need to', 'should', 'must', 'plan to', 'going to'];
    const newActions: string[] = [];
    
    actionKeywords.forEach(keyword => {
      const regex = new RegExp(`${keyword}\\s+([^.!?]*[.!?])`, 'gi');
      const matches = message.match(regex);
      if (matches) {
        matches.forEach(match => {
          const action = match.replace(keyword, '').trim();
          if (action.length > 10) {
            newActions.push(action);
          }
        });
      }
    });

    if (newActions.length > 0) {
      updatedProject.nextActions = [...new Set([...project.nextActions, ...newActions])];
      insights.push(`Added ${newActions.length} new action items`);
    }

    return { updatedProject, contextInsights: insights };
  };

  const generateContextualResponse = (userMessage: string, project: any, conversationHistory: Message[]): { content: string; suggestions: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    const stage = project.stage;
    const progress = project.progress;

    // Analyze conversation context
    const recentMessages = conversationHistory.slice(-5);
    const hasDiscussedTopic = (topic: string) => 
      recentMessages.some(msg => msg.content.toLowerCase().includes(topic));

    // Stage-specific responses with project context
    if (stage === 'ideation') {
      if (lowerMessage.includes('idea') || lowerMessage.includes('concept')) {
        return {
          content: `Great! I can see your "${project.name}" project is in the ideation stage. ${project.description ? `Based on your description: "${project.description}", let's dive deeper.` : ''} The key at this stage is to focus on the problem you're solving rather than the solution. What specific pain point does your startup address? I can help you refine this concept and move towards validation.`,
          suggestions: [
            "Help me define the problem clearly",
            "Research similar solutions in the market",
            "Identify my target customer persona",
            "Create a value proposition statement"
          ]
        };
      }
    }

    if (stage === 'validation') {
      if (lowerMessage.includes('validate') || lowerMessage.includes('test')) {
        return {
          content: `Perfect timing! Your "${project.name}" project is ready for validation. At ${progress}% progress in this stage, ${progress < 50 ? "you're just getting started with validation - let's build a solid foundation" : "you're making good progress - let's accelerate your validation efforts"}. The goal is to prove there's real demand before building. What's your biggest assumption about your customers that we should test first?`,
          suggestions: [
            "Create customer interview scripts",
            "Build a landing page to test interest",
            "Run a smoke test campaign",
            "Design customer surveys"
          ]
        };
      }
    }

    if (stage === 'mvp') {
      return {
        content: `You're in the MVP stage for "${project.name}" - this is where ideas become reality! At ${progress}% completion, ${progress < 30 ? "let's start by defining your core features" : progress < 70 ? "you're building momentum - let's keep the development focused" : "you're almost ready to launch - let's prepare for user feedback"}. Remember, an MVP should solve the core problem with minimal features. What's the one thing your MVP absolutely must do well?`,
        suggestions: [
          "Define MVP feature priorities",
          "Choose development approach",
          "Set up user testing plan",
          "Create feedback collection system"
        ]
      };
    }

    if (stage === 'launch') {
      return {
        content: `Launch time for "${project.name}"! This is an exciting stage. At ${progress}% launch readiness, ${progress < 50 ? "let's build your go-to-market foundation" : "you're getting close - let's finalize your launch strategy"}. A successful launch isn't about perfection, it's about reaching the right people with the right message. Who is your primary target audience for launch?`,
        suggestions: [
          "Create launch marketing plan",
          "Set up analytics tracking",
          "Build launch day checklist",
          "Prepare customer support"
        ]
      };
    }

    if (stage === 'revenue') {
      return {
        content: `Revenue generation for "${project.name}" - now we're talking business! At ${progress}% revenue optimization, ${progress < 40 ? "let's establish your revenue foundations" : "let's scale what's working"}. This stage is about proving your business model and optimizing for growth. What's your current biggest revenue challenge?`,
        suggestions: [
          "Optimize pricing strategy",
          "Improve conversion rates",
          "Scale customer acquisition",
          "Analyze unit economics"
        ]
      };
    }

    if (stage === 'scale') {
      return {
        content: `Scaling "${project.name}" - you've made it to the growth stage! At ${progress}% scaling progress, you're building a real business. This stage is about systems, processes, and sustainable growth. What's your biggest scaling bottleneck right now?`,
        suggestions: [
          "Build operational systems",
          "Plan team expansion",
          "Explore new markets",
          "Optimize for efficiency"
        ]
      };
    }

    // Context-aware general responses
    if (hasDiscussedTopic('team') || lowerMessage.includes('team') || lowerMessage.includes('hire')) {
      return {
        content: `Building the right team for "${project.name}" is crucial at the ${stage} stage. ${stage === 'ideation' ? "At this early stage, focus on finding a co-founder who complements your skills." : stage === 'mvp' ? "You might need technical talent or early employees." : "Consider what roles will drive growth most effectively."} What specific skills or roles are you looking to fill?`,
        suggestions: [
          "Define ideal co-founder profile",
          "Create job descriptions",
          "Find recruiting channels",
          "Plan equity distribution"
        ]
      };
    }

    // Default contextual response
    return {
      content: `I'm here to help you with "${project.name}" at the ${stage} stage. ${project.nextActions.length > 0 ? `I notice you have ${project.nextActions.length} action items on your list. ` : ''}What specific challenge are you facing right now? I can provide tailored guidance based on your current progress and stage.`,
      suggestions: [
        "Review my next actions",
        "Update my project progress",
        "Get stage-specific advice",
        "Plan next week's priorities"
      ]
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentProject) return;

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
      // Analyze project context and update if needed
      const { updatedProject, contextInsights } = analyzeProjectContext(inputMessage, currentProject);
      
      // Update project if changes detected
      if (JSON.stringify(updatedProject) !== JSON.stringify(currentProject)) {
        updateProject(currentProject.id, updatedProject);
      }

      // Generate contextual AI response
      const { content, suggestions } = generateContextualResponse(inputMessage, updatedProject, messages);

      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      let finalContent = content;
      if (contextInsights.length > 0) {
        finalContent += `\n\n💡 *I've also updated your project: ${contextInsights.join(', ')}*`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: finalContent,
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

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <CardContent>
            <Bot className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Project Selected</h3>
            <p className="text-gray-600 mb-6">Please select a project first to start chatting with your AI buddy.</p>
            <Button onClick={onBack} className="bg-purple-600 hover:bg-purple-700">
              Go Back to Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Back to Projects
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {currentProject.name} - AI Chat
              </h1>
              <p className="text-gray-600">Your personalized startup guidance for this project</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-purple-100 text-purple-700">
                {currentProject.stage} stage
              </Badge>
              <Badge variant="outline">
                {currentProject.progress}% complete
              </Badge>
            </div>
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
                placeholder={`Ask me anything about ${currentProject.name}...`}
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
