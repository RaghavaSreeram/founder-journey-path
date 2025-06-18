
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageCircle } from "lucide-react";
import ProjectManager from "@/components/ProjectManager";
import AIFounderChat from "@/components/AIFounderChat";
import { useProjects } from "@/hooks/useProjects";

const Index = () => {
  const [showAIChat, setShowAIChat] = useState(false);
  const { currentProject, projects } = useProjects();

  if (showAIChat) {
    return <AIFounderChat onBack={() => setShowAIChat(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            Your AI-Powered Startup Success Platform
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Founder's Buddy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your intelligent co-pilot for building successful startups. Manage multiple projects, 
            get AI-powered guidance, and execute tasks seamlessly - all in one platform.
          </p>
          
          {currentProject && (
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Currently working on:</p>
              <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
                {currentProject.name}
              </Badge>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowAIChat(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              disabled={!currentProject}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {currentProject ? "Chat with AI Buddy" : "Select a Project First"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Project Management Section */}
        <ProjectManager />

        {/* Feature Overview */}
        {projects.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI-Powered Startup Ecosystem
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Intelligent Conversations</h3>
                <p className="text-gray-600">AI that understands your startup stage and provides contextual guidance.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Dynamic Roadmaps</h3>
                <p className="text-gray-600">Personalized action plans that adapt to your progress and goals.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Badge className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Multi-Project Management</h3>
                <p className="text-gray-600">Organize and track multiple startup ventures from one dashboard.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
