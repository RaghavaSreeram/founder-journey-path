
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, TrendingUp, Rocket, Users } from "lucide-react";
import JourneyAssessment from "@/components/JourneyAssessment";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentStage, setCurrentStage] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  const stages = [
    {
      id: "ideation",
      title: "Ideation Stage",
      description: "Generate, refine, and validate your business ideas",
      icon: Lightbulb,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      features: ["Idea generation tools", "Market research", "Problem validation"]
    },
    {
      id: "validation",
      title: "Validation & MVP",
      description: "Test your idea and build your first product",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      features: ["MVP development", "Customer interviews", "Market testing"]
    },
    {
      id: "pmf",
      title: "Product-Market Fit",
      description: "Find the right market and perfect your product",
      icon: Rocket,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      features: ["Product optimization", "User feedback", "Growth metrics"]
    },
    {
      id: "growth",
      title: "Scale & Growth",
      description: "Scale your business and maximize revenue",
      icon: Users,
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      features: ["Team building", "Funding strategies", "Market expansion"]
    }
  ];

  if (currentStage) {
    return <Dashboard stage={currentStage} onBack={() => setCurrentStage(null)} />;
  }

  if (showAssessment) {
    return (
      <JourneyAssessment 
        onStageSelected={setCurrentStage}
        onBack={() => setShowAssessment(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            Your Startup Success Platform
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            From Idea to IPO
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            The complete entrepreneurship guide that adapts to your journey. Whether you're a student with an idea 
            or a founder ready to scale, we'll help you navigate every step of building a successful startup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowAssessment(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Your Journey Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Explore Platform
            </Button>
          </div>
        </div>

        {/* Stages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Card 
                key={stage.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setCurrentStage(stage.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full ${stage.color} mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {stage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {stage.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {stage.features.map((feature, idx) => (
                      <div key={idx} className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-1">
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Everything You Need to Build a Startup
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">Get stage-specific advice tailored to your current situation and goals.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your startup journey with clear milestones and achievements.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Resources</h3>
              <p className="text-gray-600">Access curated guides, templates, and tools from successful entrepreneurs.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-12 text-white animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of entrepreneurs who are already on their path to success.</p>
          <Button 
            size="lg" 
            onClick={() => setShowAssessment(true)}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Begin Your Startup Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
