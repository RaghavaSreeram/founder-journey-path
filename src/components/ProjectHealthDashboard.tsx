
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { StartupProject } from "@/types/project";
import { StageDetectionEngine } from "@/utils/stageDetection";

interface ProjectHealthDashboardProps {
  project: StartupProject;
}

const ProjectHealthDashboard = ({ project }: ProjectHealthDashboardProps) => {
  const healthAnalysis = StageDetectionEngine.analyzeProjectHealth(project);
  
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <TrendingUp className="h-5 w-5 text-yellow-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getHealthIcon(healthAnalysis.healthScore)}
          Project Health Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Overall Health</span>
          <span className={`text-2xl font-bold ${getHealthColor(healthAnalysis.healthScore)}`}>
            {healthAnalysis.healthScore}/100
          </span>
        </div>
        
        <Progress value={healthAnalysis.healthScore} className="w-full" />
        
        {healthAnalysis.insights.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Key Insights
            </h4>
            <div className="space-y-1">
              {healthAnalysis.insights.map((insight, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-xs mt-1">•</span>
                  {insight}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {healthAnalysis.recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Recommendations
            </h4>
            <div className="space-y-1">
              {healthAnalysis.recommendations.map((rec, index) => (
                <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                  {rec}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            Last updated: {project.updatedAt.toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectHealthDashboard;
