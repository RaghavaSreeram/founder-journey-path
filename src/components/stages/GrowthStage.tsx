
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, TrendingUp, Users, Rocket, ArrowRight, BookOpen, Clock } from "lucide-react";

interface GrowthStageProps {
  completedTasks: Set<string>;
  onTaskComplete: (taskId: string) => void;
}

const GrowthStage = ({ completedTasks, onTaskComplete }: GrowthStageProps) => {
  const tasks = [
    {
      id: "growth-channels",
      title: "Optimize Growth Channels",
      description: "Double down on your best performing acquisition channels",
      priority: "high",
      estimatedTime: "10 hours",
      resources: ["Channel Performance Analysis", "Growth Hacking Playbook"]
    },
    {
      id: "team-scaling",
      title: "Scale Your Team",
      description: "Hire key roles for sales, marketing, and product development",
      priority: "high",
      estimatedTime: "20 hours",
      resources: ["Hiring Playbook", "Remote Team Guide", "Compensation Frameworks"]
    },
    {
      id: "funding-strategy",
      title: "Develop Funding Strategy",
      description: "Prepare for Series A and beyond with investor materials",
      priority: "medium",
      estimatedTime: "15 hours",
      resources: ["Pitch Deck Template", "Financial Models", "Investor Database"]
    },
    {
      id: "operations-systems",
      title: "Build Scalable Operations",
      description: "Implement systems and processes that can handle 10x growth",
      priority: "high",
      estimatedTime: "12 hours",
      resources: ["Operations Manual", "Process Automation Tools"]
    },
    {
      id: "market-expansion",
      title: "Plan Market Expansion",
      description: "Explore new markets, segments, or geographic regions",
      priority: "medium",
      estimatedTime: "8 hours",
      resources: ["Market Entry Guide", "International Expansion Playbook"]
    },
    {
      id: "competitive-moat",
      title: "Build Competitive Moat",
      description: "Develop defensible advantages and barriers to entry",
      priority: "medium",
      estimatedTime: "6 hours",
      resources: ["Moat Strategy Guide", "IP Protection Framework"]
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
    "$1M+ ARR achieved",
    "Scalable team structure in place",
    "Multiple growth channels validated",
    "Clear path to Series A"
  ];

  const growthMetrics = [
    { label: "Monthly Recurring Revenue", value: "$125K", change: "+23%", color: "text-green-600" },
    { label: "Customer Acquisition Cost", value: "$180", change: "-15%", color: "text-green-600" },
    { label: "Lifetime Value", value: "$2,400", change: "+18%", color: "text-green-600" },
    { label: "Team Size", value: "12", change: "+3", color: "text-blue-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Key Milestones */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-orange-600" />
            <span>Growth Stage Milestones</span>
          </CardTitle>
          <CardDescription>Major achievements for scaling your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {keyMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-800">{milestone}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Metrics */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span>Growth Metrics Dashboard</span>
          </CardTitle>
          <CardDescription>Key performance indicators for your scaling business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-orange-800 mb-1">{metric.label}</div>
                <div className={`text-xs font-semibold ${metric.color}`}>{metric.change} this month</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-orange-600" />
            <span>Scaling Roadmap</span>
          </CardTitle>
          <CardDescription>Strategic initiatives to scale your business effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = completedTasks.has(task.id);
              return (
                <div key={task.id} className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-orange-300'
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
                          <Circle className="h-6 w-6 text-gray-400 hover:text-orange-600" />
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
                            <Button key={index} variant="link" className="h-auto p-0 text-orange-600 hover:text-orange-700">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {resource}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {!isCompleted && (
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white">
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

      {/* Growth Strategies */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-600" />
            <span>Proven Growth Strategies</span>
          </CardTitle>
          <CardDescription>Leverage these strategies to accelerate your growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Product-Led Growth</h3>
              <p className="text-sm text-purple-700 mb-3">Let your product drive acquisition and expansion</p>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• Freemium model optimization</li>
                <li>• Viral features implementation</li>
                <li>• Self-serve onboarding</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Content Marketing</h3>
              <p className="text-sm text-green-700 mb-3">Build authority and organic traffic</p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• SEO content strategy</li>
                <li>• Thought leadership</li>
                <li>• Educational resources</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Partnership Growth</h3>
              <p className="text-sm text-blue-700 mb-3">Leverage strategic partnerships</p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• Integration partnerships</li>
                <li>• Channel partnerships</li>
                <li>• Co-marketing initiatives</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Readiness */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span>Series A Readiness</span>
          </CardTitle>
          <CardDescription>Prepare your startup for institutional funding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-800">Funding Prerequisites</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">$1M+ ARR with consistent growth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Strong unit economics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Experienced management team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Clear path to $10M ARR</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-800">Investor Materials</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Series A Pitch Deck Template
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Financial Model Template
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Due Diligence Checklist
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Investor Database Access
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthStage;
