import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Target, Lightbulb } from "lucide-react";
import { StartupProject } from "@/types/project";

interface AssessmentData {
  // Stage-specific questions
  ideationProgress: {
    problemIdentified: boolean;
    marketResearched: boolean;
    competitorAnalysis: boolean;
    valueProposition: boolean;
    targetAudience: boolean;
  };
  validationProgress: {
    customerInterviews: number;
    surveyResponses: number;
    landingPageCreated: boolean;
    mvpPlanned: boolean;
    pricingStrategy: boolean;
    feedbackCollected: boolean;
  };
  mvpProgress: {
    featuresPlanned: boolean;
    developmentStarted: boolean;
    prototypeReady: boolean;
    userTesting: boolean;
    iterationsConducted: number;
    techStackChosen: boolean;
  };
  launchProgress: {
    marketingPlan: boolean;
    launchStrategy: boolean;
    betaUsers: number;
    publicLaunch: boolean;
    userFeedback: boolean;
    metricsTracking: boolean;
  };
  revenueProgress: {
    firstRevenue: boolean;
    pricingOptimized: boolean;
    payingCustomers: number;
    revenueStreams: number;
    conversionOptimized: boolean;
    customerRetention: boolean;
  };
  scaleProgress: {
    teamHired: boolean;
    operationsScaled: boolean;
    marketExpansion: boolean;
    fundingRaised: boolean;
    systemsAutomated: boolean;
    growthChannels: number;
  };
}

interface ProjectAssessmentProps {
  project: Omit<StartupProject, 'progress' | 'nextActions'>;
  onComplete: (progress: number, nextActions: string[], additionalData: any) => void;
  onSkip: () => void;
  onBack: () => void;
}

const ProjectAssessment = ({ project, onComplete, onSkip, onBack }: ProjectAssessmentProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({});
  const [additionalInfo, setAdditionalInfo] = useState({
    currentChallenges: '',
    immediateGoals: '',
    timeCommitment: '',
    resources: '',
    timeline: ''
  });

  const getStageQuestions = () => {
    switch (project.stage) {
      case 'ideation':
        return [
          {
            title: "Problem & Solution Clarity",
            questions: [
              {
                key: 'problemIdentified',
                question: "Have you clearly identified and defined the problem you're solving?",
                type: 'boolean'
              },
              {
                key: 'valueProposition',
                question: "Do you have a clear value proposition?",
                type: 'boolean'
              },
              {
                key: 'targetAudience',
                question: "Have you identified your target audience?",
                type: 'boolean'
              }
            ]
          },
          {
            title: "Market Research",
            questions: [
              {
                key: 'marketResearched',
                question: "Have you conducted market research?",
                type: 'boolean'
              },
              {
                key: 'competitorAnalysis',
                question: "Have you analyzed your competitors?",
                type: 'boolean'
              }
            ]
          }
        ];

      case 'validation':
        return [
          {
            title: "Customer Validation",
            questions: [
              {
                key: 'customerInterviews',
                question: "How many customer interviews have you conducted?",
                type: 'number',
                options: ['0', '1-5', '6-15', '16-30', '30+']
              },
              {
                key: 'surveyResponses',
                question: "How many survey responses have you collected?",
                type: 'number',
                options: ['0', '1-20', '21-50', '51-100', '100+']
              },
              {
                key: 'feedbackCollected',
                question: "Have you systematically collected and analyzed customer feedback?",
                type: 'boolean'
              }
            ]
          },
          {
            title: "MVP Planning",
            questions: [
              {
                key: 'landingPageCreated',
                question: "Have you created a landing page to test interest?",
                type: 'boolean'
              },
              {
                key: 'mvpPlanned',
                question: "Have you planned your MVP features?",
                type: 'boolean'
              },
              {
                key: 'pricingStrategy',
                question: "Have you developed a pricing strategy?",
                type: 'boolean'
              }
            ]
          }
        ];

      case 'mvp':
        return [
          {
            title: "Development Progress",
            questions: [
              {
                key: 'featuresPlanned',
                question: "Have you finalized your MVP feature list?",
                type: 'boolean'
              },
              {
                key: 'techStackChosen',
                question: "Have you chosen your technology stack?",
                type: 'boolean'
              },
              {
                key: 'developmentStarted',
                question: "Have you started development?",
                type: 'boolean'
              },
              {
                key: 'prototypeReady',
                question: "Do you have a working prototype?",
                type: 'boolean'
              }
            ]
          },
          {
            title: "Testing & Iteration",
            questions: [
              {
                key: 'userTesting',
                question: "Have you conducted user testing?",
                type: 'boolean'
              },
              {
                key: 'iterationsConducted',
                question: "How many major iterations have you completed?",
                type: 'number',
                options: ['0', '1-2', '3-5', '6-10', '10+']
              }
            ]
          }
        ];

      case 'launch':
        return [
          {
            title: "Launch Preparation",
            questions: [
              {
                key: 'marketingPlan',
                question: "Do you have a marketing plan ready?",
                type: 'boolean'
              },
              {
                key: 'launchStrategy',
                question: "Have you developed a launch strategy?",
                type: 'boolean'
              },
              {
                key: 'metricsTracking',
                question: "Have you set up analytics and metrics tracking?",
                type: 'boolean'
              }
            ]
          },
          {
            title: "User Acquisition",
            questions: [
              {
                key: 'betaUsers',
                question: "How many beta users do you have?",
                type: 'number',
                options: ['0', '1-10', '11-50', '51-100', '100+']
              },
              {
                key: 'publicLaunch',
                question: "Have you launched publicly?",
                type: 'boolean'
              },
              {
                key: 'userFeedback',
                question: "Are you actively collecting user feedback?",
                type: 'boolean'
              }
            ]
          }
        ];

      case 'revenue':
        return [
          {
            title: "Revenue Generation",
            questions: [
              {
                key: 'firstRevenue',
                question: "Have you generated your first revenue?",
                type: 'boolean'
              },
              {
                key: 'payingCustomers',
                question: "How many paying customers do you have?",
                type: 'number',
                options: ['0', '1-5', '6-20', '21-50', '50+']
              },
              {
                key: 'revenueStreams',
                question: "How many revenue streams do you have?",
                type: 'number',
                options: ['0', '1', '2', '3', '4+']
              }
            ]
          },
          {
            title: "Optimization",
            questions: [
              {
                key: 'pricingOptimized',
                question: "Have you optimized your pricing?",
                type: 'boolean'
              },
              {
                key: 'conversionOptimized',
                question: "Have you optimized your conversion funnel?",
                type: 'boolean'
              },
              {
                key: 'customerRetention',
                question: "Do you have customer retention strategies in place?",
                type: 'boolean'
              }
            ]
          }
        ];

      case 'scale':
        return [
          {
            title: "Team & Operations",
            questions: [
              {
                key: 'teamHired',
                question: "Have you hired additional team members?",
                type: 'boolean'
              },
              {
                key: 'operationsScaled',
                question: "Have you scaled your operations?",
                type: 'boolean'
              },
              {
                key: 'systemsAutomated',
                question: "Have you automated key business processes?",
                type: 'boolean'
              }
            ]
          },
          {
            title: "Growth & Expansion",
            questions: [
              {
                key: 'marketExpansion',
                question: "Are you expanding to new markets?",
                type: 'boolean'
              },
              {
                key: 'fundingRaised',
                question: "Have you raised funding for scaling?",
                type: 'boolean'
              },
              {
                key: 'growthChannels',
                question: "How many growth channels are you actively using?",
                type: 'number',
                options: ['1', '2-3', '4-5', '6-8', '8+']
              }
            ]
          }
        ];

      default:
        return [];
    }
  };

  const stageQuestions = getStageQuestions();
  const totalSteps = stageQuestions.length + 1; // +1 for additional info step

  const handleAnswerChange = (sectionKey: string, questionKey: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey as keyof AssessmentData],
        [questionKey]: value
      }
    }));
  };

  const calculateProgress = (): { progress: number; nextActions: string[] } => {
    const stageKey = `${project.stage}Progress` as keyof AssessmentData;
    const stageData = assessmentData[stageKey] as any;
    
    if (!stageData) return { progress: 0, nextActions: [] };

    let completedItems = 0;
    let totalItems = 0;
    const nextActions: string[] = [];

    // Calculate based on stage-specific criteria
    Object.entries(stageData).forEach(([key, value]) => {
      totalItems++;
      
      if (typeof value === 'boolean') {
        if (value) completedItems++;
        else {
          // Add specific next actions based on missing items
          nextActions.push(getActionForMissingItem(project.stage, key));
        }
      } else if (typeof value === 'number') {
        // For number values, give partial credit
        const maxScore = getMaxScoreForNumberField(key);
        const score = Math.min(value / maxScore, 1);
        completedItems += score;
        
        if (score < 0.5) {
          nextActions.push(getActionForMissingItem(project.stage, key));
        }
      }
    });

    const baseProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    
    // Adjust progress based on stage
    const stageMultipliers = {
      ideation: 0.2,
      validation: 0.4,
      mvp: 0.6,
      launch: 0.75,
      revenue: 0.85,
      scale: 0.95
    };
    
    const stageBaseProgress = stageMultipliers[project.stage] * 100;
    const finalProgress = Math.min(stageBaseProgress + (baseProgress * 0.3), 100);

    return {
      progress: Math.round(finalProgress),
      nextActions: nextActions.slice(0, 5) // Limit to top 5 actions
    };
  };

  const getMaxScoreForNumberField = (key: string): number => {
    const maxScores: Record<string, number> = {
      customerInterviews: 30,
      surveyResponses: 100,
      iterationsConducted: 10,
      betaUsers: 100,
      payingCustomers: 50,
      revenueStreams: 4,
      growthChannels: 8
    };
    return maxScores[key] || 5;
  };

  const getActionForMissingItem = (stage: string, key: string): string => {
    const actionMap: Record<string, Record<string, string>> = {
      ideation: {
        problemIdentified: "Clearly define the problem you're solving",
        marketResearched: "Conduct comprehensive market research",
        competitorAnalysis: "Analyze your main competitors",
        valueProposition: "Develop a clear value proposition",
        targetAudience: "Define your target audience"
      },
      validation: {
        customerInterviews: "Conduct more customer interviews",
        surveyResponses: "Collect more survey responses",
        landingPageCreated: "Create a landing page to test interest",
        mvpPlanned: "Plan your MVP features",
        pricingStrategy: "Develop a pricing strategy",
        feedbackCollected: "Set up systematic feedback collection"
      },
      mvp: {
        featuresPlanned: "Finalize your MVP feature list",
        developmentStarted: "Start development of your MVP",
        prototypeReady: "Complete your working prototype",
        userTesting: "Conduct user testing sessions",
        iterationsConducted: "Iterate based on user feedback",
        techStackChosen: "Choose your technology stack"
      },
      launch: {
        marketingPlan: "Create a comprehensive marketing plan",
        launchStrategy: "Develop your launch strategy",
        betaUsers: "Acquire more beta users",
        publicLaunch: "Plan your public launch",
        userFeedback: "Set up user feedback collection",
        metricsTracking: "Implement analytics and metrics tracking"
      },
      revenue: {
        firstRevenue: "Focus on generating first revenue",
        pricingOptimized: "Optimize your pricing strategy",
        payingCustomers: "Acquire more paying customers",
        revenueStreams: "Develop additional revenue streams",
        conversionOptimized: "Optimize your conversion funnel",
        customerRetention: "Implement customer retention strategies"
      },
      scale: {
        teamHired: "Hire key team members",
        operationsScaled: "Scale your operations",
        marketExpansion: "Plan market expansion",
        fundingRaised: "Prepare for funding rounds",
        systemsAutomated: "Automate key business processes",
        growthChannels: "Develop more growth channels"
      }
    };

    return actionMap[stage]?.[key] || `Complete ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const { progress, nextActions } = calculateProgress();
      onComplete(progress, nextActions, { assessmentData, additionalInfo });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = (question: any, sectionKey: string) => {
    const currentValue = (assessmentData[sectionKey as keyof AssessmentData] as any)?.[question.key];

    if (question.type === 'boolean') {
      return (
        <div className="space-y-3">
          <Label className="text-base font-medium">{question.question}</Label>
          <RadioGroup
            value={currentValue?.toString() || ''}
            onValueChange={(value) => handleAnswerChange(sectionKey, question.key, value === 'true')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${question.key}-yes`} />
              <Label htmlFor={`${question.key}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${question.key}-no`} />
              <Label htmlFor={`${question.key}-no`}>No</Label>
            </div>
          </RadioGroup>
        </div>
      );
    }

    if (question.type === 'number' && question.options) {
      return (
        <div className="space-y-3">
          <Label className="text-base font-medium">{question.question}</Label>
          <RadioGroup
            value={currentValue?.toString() || ''}
            onValueChange={(value) => {
              // Convert option to number for calculation
              const numValue = question.options.indexOf(value);
              handleAnswerChange(sectionKey, question.key, numValue);
            }}
          >
            {question.options.map((option: string, index: number) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`${question.key}-${index}`} />
                <Label htmlFor={`${question.key}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    }

    return null;
  };

  const renderCurrentStep = () => {
    if (currentStep < stageQuestions.length) {
      const section = stageQuestions[currentStep];
      const sectionKey = `${project.stage}Progress`;

      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h3>
            <p className="text-gray-600">Help us understand your current progress</p>
          </div>

          <div className="space-y-6">
            {section.questions.map((question: any, index: number) => (
              <Card key={index} className="p-4">
                <CardContent className="p-0">
                  {renderQuestion(question, sectionKey)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Additional information step
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Additional Information</h3>
          <p className="text-gray-600">Help us provide better guidance (optional)</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="challenges" className="text-base font-medium">What are your current biggest challenges?</Label>
            <Textarea
              id="challenges"
              value={additionalInfo.currentChallenges}
              onChange={(e) => setAdditionalInfo(prev => ({ ...prev, currentChallenges: e.target.value }))}
              placeholder="Describe your main challenges..."
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="goals" className="text-base font-medium">What are your immediate goals (next 30 days)?</Label>
            <Textarea
              id="goals"
              value={additionalInfo.immediateGoals}
              onChange={(e) => setAdditionalInfo(prev => ({ ...prev, immediateGoals: e.target.value }))}
              placeholder="What do you want to achieve in the next month?"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="timeCommitment" className="text-base font-medium">How much time can you dedicate weekly?</Label>
            <RadioGroup
              value={additionalInfo.timeCommitment}
              onValueChange={(value) => setAdditionalInfo(prev => ({ ...prev, timeCommitment: value }))}
              className="mt-2"
            >
              {['5-10 hours', '10-20 hours', '20-40 hours', '40+ hours (full-time)'].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    );
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project Creation
          </Button>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Assessment Progress</span>
              <span>{currentStep + 1} of {totalSteps}</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Project Assessment: {project.name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Let's understand where you are in your {project.stage} stage to give you accurate progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderCurrentStep()}

            <div className="flex justify-between pt-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  variant="outline"
                  onClick={onSkip}
                  className="px-6"
                >
                  Skip Assessment
                </Button>
              </div>
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
              >
                {currentStep === totalSteps - 1 ? (
                  <>
                    Complete Assessment
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectAssessment;