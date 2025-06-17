
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, User, Target, Briefcase, Lightbulb, DollarSign, Clock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FounderProfile {
  // Personal Background
  name: string;
  age: string;
  location: string;
  timezone: string;
  
  // Professional Background
  currentSituation: string;
  experience: string;
  industry: string;
  skills: string[];
  
  // Startup Context
  ideaStatus: string;
  businessModel: string;
  targetMarket: string;
  fundingGoals: string;
  timeCommitment: string;
  
  // Goals & Preferences
  primaryGoals: string[];
  riskTolerance: string;
  preferredLearningStyle: string;
  communicationPreference: string;
  
  // Resources & Constraints
  budget: string;
  timeline: string;
  teamStatus: string;
  technicalBackground: string;
}

interface EnhancedOnboardingProps {
  onProfileComplete: (profile: FounderProfile) => void;
  onBack: () => void;
}

const EnhancedOnboarding = ({ onProfileComplete, onBack }: EnhancedOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<FounderProfile>>({});
  const { toast } = useToast();

  const steps = [
    {
      id: "personal",
      title: "Tell us about yourself",
      icon: User,
      description: "Basic information to personalize your experience"
    },
    {
      id: "professional",
      title: "Your background",
      icon: Briefcase,
      description: "Professional experience and current situation"
    },
    {
      id: "startup",
      title: "Your startup journey",
      icon: Lightbulb,
      description: "Where you are in your entrepreneurial path"
    },
    {
      id: "goals",
      title: "Your goals & style",
      icon: Target,
      description: "What you want to achieve and how you learn best"
    },
    {
      id: "resources",
      title: "Resources & timeline",
      icon: DollarSign,
      description: "Available resources and constraints"
    }
  ];

  const updateProfile = (updates: Partial<FounderProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    // Validate current step
    const requiredFields = getRequiredFieldsForStep(currentStep);
    const missingFields = requiredFields.filter(field => !profile[field as keyof FounderProfile]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in the missing information to continue.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onProfileComplete(profile as FounderProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRequiredFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 0: return ['name', 'currentSituation'];
      case 1: return ['experience', 'skills'];
      case 2: return ['ideaStatus', 'targetMarket'];
      case 3: return ['primaryGoals', 'riskTolerance'];
      case 4: return ['timeCommitment', 'timeline'];
      default: return [];
    }
  };

  const renderPersonalStep = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-base font-medium">What's your name? *</Label>
        <Input
          id="name"
          value={profile.name || ""}
          onChange={(e) => updateProfile({ name: e.target.value })}
          placeholder="Enter your full name"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label className="text-base font-medium mb-3 block">What best describes your current situation? *</Label>
        <RadioGroup value={profile.currentSituation || ""} onValueChange={(value) => updateProfile({ currentSituation: value })}>
          {[
            { value: "student", label: "Student/Recent Graduate", desc: "Exploring entrepreneurship while studying" },
            { value: "professional", label: "Working Professional", desc: "Employed but considering entrepreneurship" },
            { value: "entrepreneur", label: "Aspiring Entrepreneur", desc: "Ready to start my first venture" },
            { value: "founder", label: "Current Founder", desc: "Already running a business" },
            { value: "investor", label: "Investor/Advisor", desc: "Looking to support other entrepreneurs" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location" className="text-base font-medium">Location</Label>
          <Input
            id="location"
            value={profile.location || ""}
            onChange={(e) => updateProfile({ location: e.target.value })}
            placeholder="City, Country"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="age" className="text-base font-medium">Age Range</Label>
          <RadioGroup value={profile.age || ""} onValueChange={(value) => updateProfile({ age: value })}>
            <div className="flex space-x-4 mt-2">
              {["18-25", "26-35", "36-45", "46+"].map((age) => (
                <div key={age} className="flex items-center space-x-2">
                  <RadioGroupItem value={age} id={age} />
                  <Label htmlFor={age} className="text-sm">{age}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  const renderProfessionalStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">What's your experience level with startups? *</Label>
        <RadioGroup value={profile.experience || ""} onValueChange={(value) => updateProfile({ experience: value })}>
          {[
            { value: "beginner", label: "Complete Beginner", desc: "New to entrepreneurship" },
            { value: "some", label: "Some Experience", desc: "Tried before or worked at startups" },
            { value: "experienced", label: "Experienced", desc: "Multiple ventures or senior startup roles" },
            { value: "serial", label: "Serial Entrepreneur", desc: "Multiple successful exits" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">What's your primary skill set? * (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Technology/Engineering", "Design/UX", "Marketing/Growth", "Sales/Business Development",
            "Operations/Management", "Finance/Accounting", "Legal/Compliance", "Product Management",
            "Data/Analytics", "Content/Communication", "Strategy/Consulting", "Other"
          ].map((skill) => (
            <div key={skill} className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
              <Checkbox
                id={skill}
                checked={profile.skills?.includes(skill) || false}
                onCheckedChange={(checked) => {
                  const currentSkills = profile.skills || [];
                  if (checked) {
                    updateProfile({ skills: [...currentSkills, skill] });
                  } else {
                    updateProfile({ skills: currentSkills.filter(s => s !== skill) });
                  }
                }}
              />
              <Label htmlFor={skill} className="text-sm cursor-pointer">{skill}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">What industry interests you most?</Label>
        <RadioGroup value={profile.industry || ""} onValueChange={(value) => updateProfile({ industry: value })}>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Technology/Software", "Healthcare/Biotech", "Fintech/Finance", "E-commerce/Retail",
              "Education/EdTech", "Media/Entertainment", "Food/Hospitality", "Transportation/Logistics",
              "Real Estate/PropTech", "Energy/CleanTech", "Social Impact", "Other"
            ].map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <RadioGroupItem value={industry} id={industry} />
                <Label htmlFor={industry} className="text-sm cursor-pointer">{industry}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStartupStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">What's your idea status? *</Label>
        <RadioGroup value={profile.ideaStatus || ""} onValueChange={(value) => updateProfile({ ideaStatus: value })}>
          {[
            { value: "no-idea", label: "No specific idea yet", desc: "Looking for opportunities and inspiration" },
            { value: "exploring", label: "Exploring multiple ideas", desc: "Have several concepts to evaluate" },
            { value: "focused", label: "Focused on one idea", desc: "Have a specific idea to develop" },
            { value: "validated", label: "Validated idea", desc: "Tested with potential customers" },
            { value: "building", label: "Currently building", desc: "In development or launched" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Who's your target market? *</Label>
        <RadioGroup value={profile.targetMarket || ""} onValueChange={(value) => updateProfile({ targetMarket: value })}>
          {[
            { value: "b2c", label: "Consumers (B2C)", desc: "Selling directly to individual customers" },
            { value: "b2b", label: "Businesses (B2B)", desc: "Selling to other companies" },
            { value: "b2b2c", label: "B2B2C", desc: "Selling to businesses who serve consumers" },
            { value: "marketplace", label: "Marketplace", desc: "Connecting buyers and sellers" },
            { value: "unsure", label: "Not sure yet", desc: "Still figuring out the market" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">What's your business model focus?</Label>
        <RadioGroup value={profile.businessModel || ""} onValueChange={(value) => updateProfile({ businessModel: value })}>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Subscription/SaaS", "One-time purchase", "Freemium", "Marketplace fees",
              "Advertising", "Commission-based", "Licensing", "Consulting/Services",
              "Hardware sales", "Not sure yet"
            ].map((model) => (
              <div key={model} className="flex items-center space-x-2">
                <RadioGroupItem value={model} id={model} />
                <Label htmlFor={model} className="text-sm cursor-pointer">{model}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderGoalsStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">What are your primary goals? * (Select all that apply)</Label>
        <div className="space-y-2">
          {[
            "Validate my business idea", "Build and launch an MVP", "Find co-founders or team members",
            "Secure funding/investment", "Generate first revenue", "Scale existing business",
            "Learn entrepreneurship skills", "Build a side business", "Create social impact",
            "Achieve financial independence", "Build a lasting company", "Exit/sell business"
          ].map((goal) => (
            <div key={goal} className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
              <Checkbox
                id={goal}
                checked={profile.primaryGoals?.includes(goal) || false}
                onCheckedChange={(checked) => {
                  const currentGoals = profile.primaryGoals || [];
                  if (checked) {
                    updateProfile({ primaryGoals: [...currentGoals, goal] });
                  } else {
                    updateProfile({ primaryGoals: currentGoals.filter(g => g !== goal) });
                  }
                }}
              />
              <Label htmlFor={goal} className="text-sm cursor-pointer">{goal}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">What's your risk tolerance? *</Label>
        <RadioGroup value={profile.riskTolerance || ""} onValueChange={(value) => updateProfile({ riskTolerance: value })}>
          {[
            { value: "conservative", label: "Conservative", desc: "Prefer low-risk, proven approaches" },
            { value: "moderate", label: "Moderate", desc: "Balanced approach to risk and reward" },
            { value: "aggressive", label: "Aggressive", desc: "Comfortable with high-risk, high-reward" },
            { value: "all-in", label: "All-in", desc: "Ready to bet everything on success" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">How do you prefer to learn?</Label>
        <RadioGroup value={profile.preferredLearningStyle || ""} onValueChange={(value) => updateProfile({ preferredLearningStyle: value })}>
          {[
            { value: "reading", label: "Reading & Documentation", desc: "Articles, guides, and written content" },
            { value: "videos", label: "Videos & Tutorials", desc: "Visual learning and demonstrations" },
            { value: "interactive", label: "Interactive & Hands-on", desc: "Learning by doing and experimenting" },
            { value: "mentorship", label: "Mentorship & 1-on-1", desc: "Personal guidance and feedback" },
            { value: "community", label: "Community & Peer Learning", desc: "Learning from other entrepreneurs" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderResourcesStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">How much time can you commit weekly? *</Label>
        <RadioGroup value={profile.timeCommitment || ""} onValueChange={(value) => updateProfile({ timeCommitment: value })}>
          {[
            { value: "part-time", label: "Part-time (5-20 hours)", desc: "Evenings and weekends" },
            { value: "significant", label: "Significant (20-40 hours)", desc: "Major time commitment" },
            { value: "full-time", label: "Full-time (40+ hours)", desc: "Primary focus and dedication" },
            { value: "flexible", label: "Flexible", desc: "Varies based on stage and needs" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">What's your timeline to launch? *</Label>
        <RadioGroup value={profile.timeline || ""} onValueChange={(value) => updateProfile({ timeline: value })}>
          {[
            { value: "3-months", label: "3 months or less", desc: "Moving fast with existing idea" },
            { value: "6-months", label: "3-6 months", desc: "Building while learning" },
            { value: "1-year", label: "6-12 months", desc: "Taking time to get it right" },
            { value: "flexible", label: "More than a year", desc: "Long-term planning approach" },
            { value: "unknown", label: "Not sure yet", desc: "Depends on idea and validation" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">What's your budget for getting started?</Label>
        <RadioGroup value={profile.budget || ""} onValueChange={(value) => updateProfile({ budget: value })}>
          {[
            { value: "minimal", label: "Minimal ($0-1K)", desc: "Bootstrap with personal resources" },
            { value: "moderate", label: "Moderate ($1K-10K)", desc: "Some investment in tools and services" },
            { value: "substantial", label: "Substantial ($10K-50K)", desc: "Significant upfront investment" },
            { value: "well-funded", label: "Well-funded ($50K+)", desc: "Access to substantial capital" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Are you building solo or with a team?</Label>
        <RadioGroup value={profile.teamStatus || ""} onValueChange={(value) => updateProfile({ teamStatus: value })}>
          {[
            { value: "solo", label: "Solo founder", desc: "Building independently" },
            { value: "seeking", label: "Seeking co-founders", desc: "Looking for the right partners" },
            { value: "small-team", label: "Small team (2-3 people)", desc: "Already have core team members" },
            { value: "larger-team", label: "Larger team (4+ people)", desc: "Established team structure" }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderPersonalStep();
      case 1: return renderProfessionalStep();
      case 2: return renderStartupStep();
      case 3: return renderGoalsStep();
      case 4: return renderResourcesStep();
      default: return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

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
            Back to Home
          </Button>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Onboarding Progress</span>
              <span>{currentStep + 1} of {steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center space-y-2 ${
                    index <= currentStep ? 'text-purple-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    index < currentStep 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : index === currentStep 
                        ? 'border-purple-600 bg-purple-50 text-purple-600'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-center hidden sm:block">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {currentStepData.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {currentStepData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderCurrentStep()}

            <div className="flex justify-between pt-6">
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
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Complete Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
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

export default EnhancedOnboarding;
