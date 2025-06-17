
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle, Clock, BookOpen, Users, TrendingUp, Target } from "lucide-react";
import IdeationStage from "@/components/stages/IdeationStage";
import ValidationStage from "@/components/stages/ValidationStage";
import PMFStage from "@/components/stages/PMFStage";
import GrowthStage from "@/components/stages/GrowthStage";

interface DashboardProps {
  stage: string;
  onBack: () => void;
}

const Dashboard = ({ stage, onBack }: DashboardProps) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const stageConfig = {
    ideation: {
      title: "Ideation Stage",
      description: "Generate, refine, and validate your business ideas",
      color: "from-purple-500 to-pink-500",
      progress: 15,
      component: IdeationStage
    },
    validation: {
      title: "Validation & MVP",
      description: "Test your idea and build your first product",
      color: "from-blue-500 to-cyan-500",
      progress: 35,
      component: ValidationStage
    },
    pmf: {
      title: "Product-Market Fit",
      description: "Find the right market and perfect your product",
      color: "from-green-500 to-emerald-500",
      progress: 65,
      component: PMFStage
    },
    growth: {
      title: "Scale & Growth",
      description: "Scale your business and maximize revenue",
      color: "from-orange-500 to-red-500",
      progress: 85,
      component: GrowthStage
    }
  };

  const currentStage = stageConfig[stage as keyof typeof stageConfig];
  const StageComponent = currentStage.component;

  const handleTaskComplete = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentStage.title}</h1>
              <p className="text-gray-600 text-lg">{currentStage.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Target className="mr-2 h-4 w-4" />
                Current Stage
              </Badge>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Overall Progress</CardTitle>
                <span className="text-2xl font-bold text-purple-600">{currentStage.progress}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={currentStage.progress} className="h-3 mb-4" />
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">{completedTasks.size} Completed</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold">3 In Progress</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">Next Milestone</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stage-specific Content */}
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="roadmap" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Roadmap</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap">
            <StageComponent 
              completedTasks={completedTasks}
              onTaskComplete={handleTaskComplete}
            />
          </TabsContent>

          <TabsContent value="resources">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Stage-Specific Resources</CardTitle>
                <CardDescription>Curated guides, templates, and tools for your current stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <h3 className="font-semibold mb-2">Resource {i}</h3>
                      <p className="text-sm text-gray-600 mb-3">Brief description of this helpful resource.</p>
                      <Badge variant="outline">Guide</Badge>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Connect with Fellow Entrepreneurs</CardTitle>
                <CardDescription>Join discussions and get support from peers at similar stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Weekly Founder Meetup</h3>
                    <p className="text-purple-700 text-sm">Join our virtual meetup every Wednesday at 7 PM PST</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Stage-Specific Forum</h3>
                    <p className="text-blue-700 text-sm">Discuss challenges and share wins with founders at your stage</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Mentor Matching</h3>
                    <p className="text-green-700 text-sm">Get paired with experienced entrepreneurs who can guide you</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Your Progress Insights</CardTitle>
                <CardDescription>Data-driven insights about your entrepreneurial journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Completion Rate</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>This Week</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Time to Complete Stage</h3>
                    <div className="text-2xl font-bold text-purple-600">~6 weeks</div>
                    <p className="text-sm text-gray-600">Based on your current pace</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
