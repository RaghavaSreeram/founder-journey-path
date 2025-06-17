
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Target, Clock, TrendingUp, Lightbulb, AlertCircle, CheckCircle } from "lucide-react";
import Dashboard from "@/components/Dashboard";

interface FounderProfile {
  name: string;
  currentSituation: string;
  experience: string;
  skills: string[];
  ideaStatus: string;
  targetMarket: string;
  primaryGoals: string[];
  riskTolerance: string;
  timeCommitment: string;
  timeline: string;
  budget: string;
  teamStatus: string;
  preferredLearningStyle?: string;
  industry?: string;
  businessModel?: string;
}

interface PersonalizedDashboardProps {
  profile: FounderProfile;
  onBack: () => void;
}

const PersonalizedDashboard = ({ profile, onBack }: PersonalizedDashboardProps) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  // AI-powered stage recommendation based on profile
  const getRecommendedStage = (): string => {
    if (profile.ideaStatus === "no-idea" || profile.ideaStatus === "exploring") {
      return "ideation";
    } else if (profile.ideaStatus === "focused" || (profile.ideaStatus === "validated" && profile.experience === "beginner")) {
      return "validation";
    } else if (profile.ideaStatus === "building" || profile.ideaStatus === "validated") {
      return "pmf";
    } else {
      return "growth";
    }
  };

  const recommendedStage = getRecommendedStage();

  // Generate personalized recommendations
  const getPersonalizedRecommendations = () => {
    const recommendations = [];

    // Based on experience level
    if (profile.experience === "beginner") {
      recommendations.push({
        type: "learning",
        title: "Start with Fundamentals",
        description: "We recommend beginning with our entrepreneurship basics course",
        priority: "high"
      });
    }

    // Based on time commitment
    if (profile.timeCommitment === "part-time") {
      recommendations.push({
        type: "strategy",
        title: "Optimize for Part-time Building",
        description: "Focus on no-code solutions and lean validation methods",
        priority: "medium"
      });
    }

    // Based on goals
    if (profile.primaryGoals?.includes("Find co-founders or team members")) {
      recommendations.push({
        type: "networking",
        title: "Co-founder Matching",
        description: "Connect with potential co-founders who complement your skills",
        priority: "high"
      });
    }

    // Based on budget
    if (profile.budget === "minimal") {
      recommendations.push({
        type: "resources",
        title: "Bootstrap-Friendly Tools",
        description: "Curated list of free and low-cost tools for your journey",
        priority: "medium"
      });
    }

    return recommendations;
  };

  const personalizedRecommendations = getPersonalizedRecommendations();

  // Generate next actions based on profile
  const getNextActions = () => {
    const actions = [];

    if (profile.ideaStatus === "no-idea") {
      actions.push("Complete the idea generation workshop");
      actions.push("Explore market trend analysis");
    } else if (profile.ideaStatus === "focused") {
      actions.push("Validate your idea with potential customers");
      actions.push("Create a lean canvas for your concept");
    }

    if (profile.teamStatus === "seeking") {
      actions.push("Define ideal co-founder profile");
      actions.push("Join our co-founder matching platform");
    }

    return actions;
  };

  const nextActions = getNextActions();

  if (selectedStage) {
    return <Dashboard stage={selectedStage} onBack={() => setSelectedStage(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Onboarding
          </Button>
        </div>

        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Welcome, {profile.name}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your profile, we've created a personalized roadmap to help you succeed as a {profile.currentSituation.replace("-", " ")}.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended Stage */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span>Your Recommended Starting Point</span>
                    </CardTitle>
                    <CardDescription>Based on your current situation and goals</CardDescription>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">AI Recommended</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 capitalize">
                    {recommendedStage === "ideation" && "Ideation Stage"}
                    {recommendedStage === "validation" && "Validation & MVP Stage"}
                    {recommendedStage === "pmf" && "Product-Market Fit Stage"}
                    {recommendedStage === "growth" && "Scale & Growth Stage"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {recommendedStage === "ideation" && "Perfect for exploring and developing your business ideas"}
                    {recommendedStage === "validation" && "Ready to test and validate your concept"}
                    {recommendedStage === "pmf" && "Time to find your market fit and optimize your product"}
                    {recommendedStage === "growth" && "Scale your business and maximize growth"}
                  </p>
                  <Button 
                    onClick={() => setSelectedStage(recommendedStage)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Start Your Journey
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Recommendations */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  <span>Personalized Recommendations</span>
                </CardTitle>
                <CardDescription>Tailored advice based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalizedRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        rec.priority === "high" ? "bg-red-500" : "bg-yellow-500"
                      }`} />
                      <div>
                        <h4 className="font-semibold">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {rec.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Your Next Actions</span>
                </CardTitle>
                <CardDescription>Immediate steps to move forward</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nextActions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <span>Your Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <p className="capitalize">{profile.currentSituation.replace("-", " ")}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Experience:</span>
                  <p className="capitalize">{profile.experience}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Idea Status:</span>
                  <p className="capitalize">{profile.ideaStatus.replace("-", " ")}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Time Commitment:</span>
                  <p className="capitalize">{profile.timeCommitment.replace("-", " ")}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Top Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profile Complete</span>
                    <Badge className="bg-green-100 text-green-700">100%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Journey Started</span>
                    <Badge className="bg-yellow-100 text-yellow-700">Ready</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">First Milestone</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{profile.timeline}</div>
                  <div className="text-sm text-gray-600">Target Launch Timeline</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
