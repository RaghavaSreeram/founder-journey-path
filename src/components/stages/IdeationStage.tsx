import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Lightbulb, Search, Users, TrendingUp, BookOpen, ArrowRight, Clock } from "lucide-react";

interface IdeationStageProps {
  completedTasks: Set<string>;
  onTaskComplete: (taskId: string) => void;
}

const IdeationStage = ({ completedTasks, onTaskComplete }: IdeationStageProps) => {
  const tasks = [
    {
      id: "problem-identification",
      title: "Identify Problems You're Passionate About",
      description: "List 10 problems you've personally experienced or observed",
      priority: "high",
      estimatedTime: "2 hours",
      resources: ["Problem Canvas Template", "Industry Research Guide"]
    },
    {
      id: "market-research",
      title: "Conduct Initial Market Research",
      description: "Research market size, trends, and existing solutions",
      priority: "high", 
      estimatedTime: "4 hours",
      resources: ["Market Research Toolkit", "Competitor Analysis Template"]
    },
    {
      id: "idea-validation",
      title: "Validate Your Top 3 Ideas",
      description: "Survey potential customers and validate problem-solution fit",
      priority: "medium",
      estimatedTime: "6 hours",
      resources: ["Survey Templates", "Interview Scripts"]
    },
    {
      id: "business-model",
      title: "Draft Initial Business Model",
      description: "Create a lean canvas for your chosen idea",
      priority: "medium",
      estimatedTime: "3 hours",
      resources: ["Lean Canvas Template", "Business Model Examples"]
    },
    {
      id: "competitive-analysis",
      title: "Analyze Competitive Landscape",
      description: "Map direct and indirect competitors",
      priority: "low",
      estimatedTime: "4 hours",
      resources: ["Competitor Matrix", "Positioning Framework"]
    },
    {
      id: "value-proposition",
      title: "Define Your Value Proposition",
      description: "Craft a clear, compelling value proposition",
      priority: "high",
      estimatedTime: "2 hours",
      resources: ["Value Prop Canvas", "Messaging Framework"]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const keyMilestones = [
    "Problem identified and validated",
    "Market opportunity sized",
    "Initial business model drafted",
    "Value proposition defined"
  ];

  return (
    <div className="space-y-8">
      {/* Key Milestones */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span>Key Milestones for Ideation Stage</span>
          </CardTitle>
          <CardDescription>Essential goals to complete before moving to validation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {keyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">{milestone}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            <span>Your Ideation Roadmap</span>
          </CardTitle>
          <CardDescription>Complete these tasks to develop and validate your business idea</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = completedTasks.has(task.id);
              return (
                <div key={task.id} className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-purple-300'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <button 
                        onClick={() => onTaskComplete(task.id)}
                        className="mt-1 transition-colors"
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400 hover:text-purple-600" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg mb-2 ${isCompleted ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                          {task.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{task.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority} priority
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.estimatedTime}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {task.resources.map((resource, index) => (
                            <Button key={index} variant="link" className="h-auto p-0 text-purple-600 hover:text-purple-700">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {resource}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {!isCompleted && (
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        Start Task
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-purple-600" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Jump-start your ideation process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Lightbulb className="h-8 w-8 text-purple-600" />
              <span className="font-semibold">Idea Generator</span>
              <span className="text-sm text-gray-600 text-center">Use our AI-powered tool to brainstorm ideas</span>
            </Button>
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="font-semibold">Find Co-founder</span>
              <span className="text-sm text-gray-600 text-center">Connect with potential co-founders</span>
            </Button>
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <span className="font-semibold">Market Trends</span>
              <span className="text-sm text-gray-600 text-center">Explore trending markets and opportunities</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdeationStage;
