
export interface StartupProject {
  id: string;
  name: string;
  description: string;
  stage: 'ideation' | 'validation' | 'mvp' | 'launch' | 'revenue' | 'scale';
  createdAt: Date;
  updatedAt: Date;
  progress: number; // 0-100
  nextActions: string[];
  tags: string[];
}

export interface ProjectContextType {
  projects: StartupProject[];
  currentProject: StartupProject | null;
  createProject: (project: Omit<StartupProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  selectProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<StartupProject>) => void;
  deleteProject: (projectId: string) => void;
}
