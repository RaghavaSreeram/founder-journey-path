import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Rocket, TrendingUp, Lightbulb, Target, DollarSign, BarChart3, Activity } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { StartupProject } from "@/types/project";
import ProjectHealthDashboard from "@/components/ProjectHealthDashboard";

const ProjectManager = () => {
  const { projects, currentProject, createProject, selectProject } = useProjects();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showHealthDashboard, setShowHealthDashboard] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    stage: 'ideation' as const,
    progress: 0,
    nextActions: [],
    tags: []
  });

  const stageIcons = {
    ideation: Lightbulb,
    validation: Target,
    mvp: Rocket,
    launch: TrendingUp,
    revenue: DollarSign,
    scale: BarChart3
  };

  const stageColors = {
    ideation: 'bg-purple-100 text-purple-800',
    validation: 'bg-blue-100 text-blue-800',
    mvp: 'bg-orange-100 text-orange-800',
    launch: 'bg-green-100 text-green-800',
    revenue: 'bg-yellow-100 text-yellow-800',
    scale: 'bg-red-100 text-red-800'
  };

  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      createProject(newProject);
      setNewProject({
        name: '',
        description: '',
        stage: 'ideation',
        progress: 0,
        nextActions: [],
        tags: []
      });
      setShowCreateDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Startup Projects</h2>
          <p className="text-gray-600">Manage and track your entrepreneurial ventures with AI-powered insights</p>
        </div>
        <div className="flex gap-2">
          {currentProject && (
            <Button 
              variant="outline" 
              onClick={() => setShowHealthDashboard(!showHealthDashboard)}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              {showHealthDashboard ? 'Hide' : 'Show'} Health
            </Button>
          )}
          <Button onClick={() => setShowCreateDialog(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {showHealthDashboard && currentProject && (
        <ProjectHealthDashboard project={currentProject} />
      )}

      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Rocket className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first startup project to get started</p>
            <Button onClick={() => setShowCreateDialog(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = stageIcons[project.stage];
            return (
              <Card 
                key={project.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  currentProject?.id === project.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => selectProject(project.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-purple-600" />
                    <Badge className={stageColors[project.stage]}>
                      {project.stage}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Start a new startup project and begin your entrepreneurial journey.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="My Amazing Startup"
                value={newProject.name}
                onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your startup idea..."
                value={newProject.description}
                onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Current Stage</Label>
              <Select 
                value={newProject.stage} 
                onValueChange={(value: any) => setNewProject(prev => ({ ...prev, stage: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ideation">Ideation</SelectItem>
                  <SelectItem value="validation">Validation</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="launch">Launch</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject} className="bg-purple-600 hover:bg-purple-700">
              Create Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;
