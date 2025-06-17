
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, TrendingUp, Users, Rocket, ArrowRight, BookOpen, Clock } from "lucide-react";

interface ValidationStageProps {
  completedTasks: Set<string>;
  onTaskComplete: (taskId: string) => void;
}

const ValidationStage = ({ completedTasks, onTaskComplete }: ValidationStageProps) => {
  const tasks = [
    {
      id: "customer-interviews",
      title: "Conduct 20+ Customer Interviews",
      description: "Deep dive into customer problems and validate your solution",
      priority: "high",
      estimatedTime: "8 hours",
      resources: ["Interview Script Template", "Recording Tools Guide"]
    },
    {
      id: "mvp-design",
      title: "Design Your MVP",
      description: "Create wireframes and user flow for minimum viable product",
      priority: "high",
      estimatedTime: "12 hours",
      resources: ["MVP Planning Guide", "Design Tools", "User Flow Templates"]
    },
    {
      id: "landing-page",
      title: "Build Landing Page",
      description: "Create a simple landing page to test interest and collect emails",
      priority: "medium",
      estimatedTime: "6 hours",
      resources: ["Landing Page Templates", "A/B Testing Guide"]
    },
    {
      id: "prototype-testing",
      title: "Test Your Prototype",
      description: "Get feedback on your MVP from potential customers",
      priority: "high",
      estimatedTime: "10 hours",
      resources: ["Testing Framework", "Feedback Collection Tools"]
    },
    {
      id: "pricing-strategy",
      title: "Develop Pricing Strategy",
      description: "Test different pricing models and find optimal price point",
      priority: "medium",
      estimatedTime: "4 hours",
      resources: ["Pricing Models Guide", "Price Testing Framework"]
    },
    {
      id: "market-validation",
      title: "Validate Market Size",
      description: "Confirm total addressable market and initial target segment",
      priority: "medium",
      estimatedTime: "6 hours",
      resources: ["Market Sizing Tools", "TAM/SAM/SOM Framework"]
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
    "Customer problem validated",
    "MVP built and tested",
    "Initial users acquired",
    "Pricing model confirmed"
  ];

  return (
    <div className="space-y-8">
      {/* Key Milestones */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Validation Stage Milestones</span>
          </CardTitle>
          <CardDescription>Critical achievements for validating your business idea</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {keyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">{milestone}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-blue-600" />
            <span>Validation Tasks</span>
          </CardTitle>
          <CardDescription>Build and test your MVP to validate market demand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = completedTasks.has(task.id);
              return (
                <div key={task.id} className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300'
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
                          <Circle className="h-6 w-6 text-gray-400 hover:text-blue-600" />
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
                            <Button key={index} variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-700">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {resource}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {!isCompleted && (
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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

      {/* Validation Metrics */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Key Validation Metrics</span>
          </CardTitle>
          <CardDescription>Track these metrics to measure validation success</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-sm font-medium text-blue-800">Customer Interviews</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">80%</div>
              <div className="text-sm font-medium text-green-800">Problem Validation</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">5%</div>
              <div className="text-sm font-medium text-purple-800">Landing Page Conversion</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">100</div>
              <div className="text-sm font-medium text-orange-800">Early Signups</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Validation Tools</span>
          </CardTitle>
          <CardDescription>Access tools to accelerate your validation process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="font-semibold">Customer Interview Tool</span>
              <span className="text-sm text-gray-600 text-center">Guided interview process with templates</span>
            </Button>
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <Rocket className="h-8 w-8 text-purple-600" />
              <span className="font-semibold">MVP Builder</span>
              <span className="text-sm text-gray-600 text-center">No-code tools to build your prototype</span>
            </Button>
            <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <span className="font-semibold">Analytics Setup</span>
              <span className="text-sm text-gray-600 text-center">Track user behavior and feedback</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationStage;
