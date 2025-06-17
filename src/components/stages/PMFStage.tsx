
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Target, TrendingUp, Users, ArrowRight, BookOpen, Clock } from "lucide-react";

interface PMFStageProps {
  completedTasks: Set<string>;
  onTaskComplete: (taskId: string) => void;
}

const PMFStage = ({ completedTasks, onTaskComplete }: PMFStageProps) => {
  const tasks = [
    {
      id: "user-feedback-loop",
      title: "Establish User Feedback Loop",
      description: "Create systematic process for collecting and implementing user feedback",
      priority: "high",
      estimatedTime: "6 hours",
      resources: ["Feedback Systems Guide", "User Survey Templates"]
    },
    {
      id: "product-iteration",
      title: "Rapid Product Iteration",
      description: "Implement weekly product updates based on user feedback",
      priority: "high",
      estimatedTime: "Ongoing",
      resources: ["Agile Development Guide", "Feature Prioritization Matrix"]
    },
    {
      id: "retention-metrics",
      title: "Track Retention Metrics",
      description: "Monitor user engagement, churn, and product stickiness",
      priority: "high",
      estimatedTime: "4 hours",
      resources: ["Analytics Setup Guide", "Retention Dashboard Template"]
    },
    {
      id: "pmf-survey",
      title: "Conduct PMF Survey",
      description: "Measure how disappointed users would be without your product",
      priority: "medium",
      estimatedTime: "3 hours",
      resources: ["PMF Survey Template", "Sean Ellis Test Guide"]
    },
    {
      id: "cohort-analysis",
      title: "Perform Cohort Analysis",
      description: "Analyze user behavior patterns across different user groups",
      priority: "medium",
      estimatedTime: "5 hours",
      resources: ["Cohort Analysis Tools", "Behavioral Analytics Guide"]
    },
    {
      id: "feature-optimization",
      title: "Optimize Core Features",
      description: "Double-down on features that drive the most user value",
      priority: "high",
      estimatedTime: "8 hours",
      resources: ["Feature Usage Analytics", "User Journey Mapping"]
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
    "40%+ users would be disappointed without product",
    "Strong user retention (30%+ month 1)",
    "Clear product-market signals",
    "Repeatable user acquisition"
  ];

  return (
    <div className="space-y-8">
      {/* Key Milestones */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span>Product-Market Fit Goals</span>
          </CardTitle>
          <CardDescription>Essential metrics and achievements for achieving PMF</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {keyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">{milestone}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PMF Metrics Dashboard */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>PMF Health Score</span>
          </CardTitle>
          <CardDescription>Monitor your progress toward product-market fit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">35%</div>
              <div className="text-sm font-medium text-green-800">PMF Score</div>
              <div className="text-xs text-green-600 mt-1">Target: 40%+</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">28%</div>
              <div className="text-sm font-medium text-blue-800">Month 1 Retention</div>
              <div className="text-xs text-blue-600 mt-1">Target: 30%+</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">2.3</div>
              <div className="text-sm font-medium text-purple-800">NPS Score</div>
              <div className="text-xs text-purple-600 mt-1">Industry Avg: 1.8</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">15%</div>
              <div className="text-sm font-medium text-orange-800">Weekly Growth</div>
              <div className="text-xs text-orange-600 mt-1">Trending up</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span>PMF Action Plan</span>
          </CardTitle>
          <CardDescription>Focus on these tasks to achieve product-market fit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = completedTasks.has(task.id);
              return (
                <div key={task.id} className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-green-300'
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
                          <Circle className="h-6 w-6 text-gray-400 hover:text-green-600" />
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
                            <Button key={index} variant="link" className="h-auto p-0 text-green-600 hover:text-green-700">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {resource}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {!isCompleted && (
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
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

      {/* PMF Signals */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>PMF Signal Checklist</span>
          </CardTitle>
          <CardDescription>Signs that you're achieving product-market fit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-800">Positive Signals</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Users actively using product daily</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Strong word-of-mouth growth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Difficult to keep up with demand</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Users willing to pay premium</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-800">Warning Signs</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-orange-400" />
                  <span className="text-sm">High customer acquisition cost</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-orange-400" />
                  <span className="text-sm">Low engagement after signup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-orange-400" />
                  <span className="text-sm">Difficulty explaining value prop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-orange-400" />
                  <span className="text-sm">Slow organic growth</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PMFStage;
