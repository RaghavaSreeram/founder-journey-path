
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JourneyAssessmentProps {
  onStageSelected: (stage: string) => void;
  onBack: () => void;
}

const JourneyAssessment = ({ onStageSelected, onBack }: JourneyAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const questions = [
    {
      id: 0,
      question: "What best describes your current situation?",
      options: [
        { value: "student", label: "Student/Recent Graduate", description: "Exploring entrepreneurship" },
        { value: "professional", label: "Working Professional", description: "Considering a career change" },
        { value: "entrepreneur", label: "Aspiring Entrepreneur", description: "Ready to start something new" },
        { value: "founder", label: "Current Founder", description: "Already running a business" }
      ]
    },
    {
      id: 1,
      question: "How would you describe your business idea status?",
      options: [
        { value: "no-idea", label: "No specific idea yet", description: "Looking for inspiration and opportunities" },
        { value: "rough-idea", label: "Have a rough concept", description: "Need to refine and validate the idea" },
        { value: "clear-idea", label: "Clear idea, not tested", description: "Ready to validate with potential customers" },
        { value: "tested-idea", label: "Tested and validated", description: "Have market feedback and data" }
      ]
    },
    {
      id: 2,
      question: "What's your current stage of development?",
      options: [
        { value: "planning", label: "Still planning", description: "Researching and strategizing" },
        { value: "building", label: "Building MVP/prototype", description: "Developing the first version" },
        { value: "launched", label: "Launched product", description: "Product is live but finding fit" },
        { value: "growing", label: "Growing revenue", description: "Scaling and optimizing operations" }
      ]
    },
    {
      id: 3,
      question: "What's your primary challenge right now?",
      options: [
        { value: "ideation", label: "Finding the right idea", description: "Need help with creativity and opportunity identification" },
        { value: "validation", label: "Validating market demand", description: "Unsure if people will pay for my solution" },
        { value: "execution", label: "Building and executing", description: "Know what to build but need guidance on how" },
        { value: "scaling", label: "Growing and scaling", description: "Need to optimize operations and expand" }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "Please select an option",
        description: "Choose the option that best describes your situation.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate stage based on answers
      const stage = calculateStage();
      onStageSelected(stage);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateStage = () => {
    const answerValues = Object.values(answers);
    
    // Logic to determine stage based on answers
    if (answerValues.includes("no-idea") || answerValues.includes("ideation") || answerValues.includes("planning")) {
      return "ideation";
    } else if (answerValues.includes("rough-idea") || answerValues.includes("validation") || answerValues.includes("building")) {
      return "validation";
    } else if (answerValues.includes("clear-idea") || answerValues.includes("launched") || answerValues.includes("execution")) {
      return "pmf";
    } else {
      return "growth";
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
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
              <span>Assessment Progress</span>
              <span>{currentQuestion + 1} of {questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {questions[currentQuestion].question}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Select the option that best describes your current situation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={answers[currentQuestion] || ""} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="font-semibold text-gray-800 mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    Get My Roadmap
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

export default JourneyAssessment;
