
import { StartupProject } from '@/types/project';

interface StageSignals {
  keywords: string[];
  confidence: number;
  requiredActions?: string[];
  progressThreshold?: number;
}

interface DetectionResult {
  suggestedStage: StartupProject['stage'];
  confidence: number;
  reasoning: string[];
  shouldUpdate: boolean;
}

const STAGE_SIGNALS: Record<StartupProject['stage'], StageSignals> = {
  ideation: {
    keywords: ['idea', 'concept', 'brainstorm', 'thinking', 'problem', 'solution', 'research', 'explore'],
    confidence: 0.3,
    progressThreshold: 20
  },
  validation: {
    keywords: ['validate', 'test', 'survey', 'interview', 'customer', 'feedback', 'market research', 'assumption', 'hypothesis', 'prove'],
    confidence: 0.4,
    progressThreshold: 30
  },
  mvp: {
    keywords: ['build', 'develop', 'prototype', 'mvp', 'minimum viable', 'feature', 'technical', 'code', 'design', 'wireframe'],
    confidence: 0.5,
    progressThreshold: 40
  },
  launch: {
    keywords: ['launch', 'release', 'go-to-market', 'marketing', 'campaign', 'users', 'beta', 'public', 'announce'],
    confidence: 0.6,
    progressThreshold: 60
  },
  revenue: {
    keywords: ['revenue', 'sales', 'money', 'payment', 'pricing', 'customers', 'conversion', 'monetize', 'paid', 'subscription'],
    confidence: 0.7,
    progressThreshold: 70
  },
  scale: {
    keywords: ['scale', 'growth', 'expand', 'team', 'hire', 'international', 'series', 'funding', 'operational', 'enterprise'],
    confidence: 0.8,
    progressThreshold: 80
  }
};

const PROGRESSION_INDICATORS = {
  completed: ['completed', 'finished', 'done', 'achieved', 'accomplished', 'successful'],
  inProgress: ['working on', 'building', 'developing', 'creating', 'planning'],
  blocked: ['stuck', 'blocked', 'struggling', 'difficult', 'problem', 'issue'],
  ready: ['ready', 'prepared', 'set to', 'about to', 'planning to']
};

export class StageDetectionEngine {
  
  static analyzeConversation(
    messages: Array<{ content: string; type: 'user' | 'ai' }>,
    currentProject: StartupProject
  ): DetectionResult {
    const recentMessages = messages.slice(-10); // Analyze last 10 messages
    const userMessages = recentMessages.filter(m => m.type === 'user');
    const allText = userMessages.map(m => m.content.toLowerCase()).join(' ');
    
    const stageScores = this.calculateStageScores(allText, currentProject);
    const progressSignals = this.detectProgressSignals(allText);
    const completionSignals = this.detectCompletionSignals(allText, currentProject);
    
    return this.generateRecommendation(
      stageScores,
      progressSignals,
      completionSignals,
      currentProject
    );
  }
  
  private static calculateStageScores(text: string, project: StartupProject): Record<string, number> {
    const scores: Record<string, number> = {};
    
    Object.entries(STAGE_SIGNALS).forEach(([stage, signals]) => {
      let score = 0;
      
      signals.keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) {
          score += matches.length * signals.confidence;
        }
      });
      
      // Boost score if already in this stage (resistance to change)
      if (project.stage === stage) {
        score *= 1.2;
      }
      
      scores[stage] = score;
    });
    
    return scores;
  }
  
  private static detectProgressSignals(text: string): {
    completed: number;
    inProgress: number;
    blocked: number;
    ready: number;
  } {
    const signals = { completed: 0, inProgress: 0, blocked: 0, ready: 0 };
    
    Object.entries(PROGRESSION_INDICATORS).forEach(([type, keywords]) => {
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) {
          signals[type as keyof typeof signals] += matches.length;
        }
      });
    });
    
    return signals;
  }
  
  private static detectCompletionSignals(text: string, project: StartupProject): boolean {
    const stageCompletionPhrases = {
      ideation: ['validated the idea', 'ready to test', 'need to validate'],
      validation: ['customers confirmed', 'ready to build', 'start developing'],
      mvp: ['mvp is ready', 'ready to launch', 'users are testing'],
      launch: ['launched successfully', 'getting customers', 'revenue coming'],
      revenue: ['revenue growing', 'ready to scale', 'hire team'],
      scale: ['scaling operations', 'expanding team', 'new markets']
    };
    
    const phrases = stageCompletionPhrases[project.stage] || [];
    return phrases.some(phrase => text.includes(phrase));
  }
  
  private static generateRecommendation(
    stageScores: Record<string, number>,
    progressSignals: any,
    completionSignals: boolean,
    currentProject: StartupProject
  ): DetectionResult {
    const reasoning: string[] = [];
    
    // Find highest scoring stage
    const sortedStages = Object.entries(stageScores)
      .sort(([,a], [,b]) => b - a);
    
    const topStage = sortedStages[0];
    const suggestedStage = topStage[0] as StartupProject['stage'];
    const confidence = Math.min(topStage[1] / 10, 1); // Normalize to 0-1
    
    // Determine if we should update
    let shouldUpdate = false;
    
    // Strong signals for stage progression
    if (completionSignals && this.getStageOrder(suggestedStage) > this.getStageOrder(currentProject.stage)) {
      shouldUpdate = true;
      reasoning.push('Detected completion signals for current stage');
    }
    
    // High confidence in different stage
    if (confidence > 0.6 && suggestedStage !== currentProject.stage) {
      const stageOrderDiff = this.getStageOrder(suggestedStage) - this.getStageOrder(currentProject.stage);
      if (stageOrderDiff === 1) { // Only progress by one stage
        shouldUpdate = true;
        reasoning.push(`Strong indicators for ${suggestedStage} stage`);
      }
    }
    
    // Progress signals
    if (progressSignals.completed > 2) {
      reasoning.push('Multiple completion indicators detected');
    }
    
    if (progressSignals.ready > 1) {
      reasoning.push('Ready to advance indicators detected');
    }
    
    // Don't regress stages unless very clear
    if (this.getStageOrder(suggestedStage) < this.getStageOrder(currentProject.stage)) {
      shouldUpdate = false;
      reasoning.push('Stage regression prevented');
    }
    
    return {
      suggestedStage,
      confidence,
      reasoning,
      shouldUpdate
    };
  }
  
  private static getStageOrder(stage: StartupProject['stage']): number {
    const order = {
      ideation: 1,
      validation: 2,
      mvp: 3,
      launch: 4,
      revenue: 5,
      scale: 6
    };
    return order[stage];
  }
  
  static analyzeProjectHealth(project: StartupProject): {
    healthScore: number;
    insights: string[];
    recommendations: string[];
  } {
    const insights: string[] = [];
    const recommendations: string[] = [];
    let healthScore = 50; // Base score
    
    // Progress analysis
    if (project.progress > 80) {
      healthScore += 20;
      insights.push('High progress completion');
    } else if (project.progress < 30) {
      healthScore -= 15;
      insights.push('Low progress completion');
      recommendations.push('Consider breaking down tasks into smaller steps');
    }
    
    // Next actions analysis
    if (project.nextActions.length === 0) {
      healthScore -= 10;
      insights.push('No defined next actions');
      recommendations.push('Define clear next steps to maintain momentum');
    } else if (project.nextActions.length > 10) {
      healthScore -= 5;
      insights.push('Too many pending actions');
      recommendations.push('Prioritize and focus on top 3-5 actions');
    }
    
    // Stage vs progress analysis
    const expectedProgress = this.getStageOrder(project.stage) * 15;
    if (project.progress < expectedProgress - 20) {
      healthScore -= 10;
      insights.push('Progress behind expected stage level');
      recommendations.push('Focus on completing current stage requirements');
    }
    
    // Time analysis
    const daysSinceUpdate = Math.floor((Date.now() - project.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceUpdate > 7) {
      healthScore -= 15;
      insights.push(`No activity for ${daysSinceUpdate} days`);
      recommendations.push('Regular activity is key to startup success');
    }
    
    return {
      healthScore: Math.max(0, Math.min(100, healthScore)),
      insights,
      recommendations
    };
  }
}
