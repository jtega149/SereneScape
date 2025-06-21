"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BreathingTechnique {
  id: string;
  name: string;
  pattern: { instruction: string; duration: number }[]; // duration in seconds
  description: string;
}

const techniques: BreathingTechnique[] = [
  {
    id: "box",
    name: "Box Breathing",
    pattern: [
      { instruction: "Inhale", duration: 4 },
      { instruction: "Hold", duration: 4 },
      { instruction: "Exhale", duration: 4 },
      { instruction: "Hold", duration: 4 },
    ],
    description: "Balances the nervous system, reduces stress, and improves focus. Involves equal parts inhalation, hold, exhalation, and hold.",
  },
  {
    id: "478",
    name: "4-7-8 Breathing",
    pattern: [
      { instruction: "Inhale", duration: 4 },
      { instruction: "Hold", duration: 7 },
      { instruction: "Exhale", duration: 8 },
    ],
    description: "Promotes relaxation and can help with sleep. Inhale for 4, hold for 7, exhale for 8.",
  },
  {
    id: "deep",
    name: "Deep Abdominal Breathing",
    pattern: [
      { instruction: "Inhale Deeply", duration: 5 },
      { instruction: "Exhale Slowly", duration: 7 },
    ],
    description: "Encourages full oxygen exchange, can slow heartbeat and lower blood pressure. Focus on belly rising and falling.",
  },
];

export default function BreathingPage() {
  const [selectedTechnique, setSelectedTechnique] = React.useState<BreathingTechnique>(techniques[0]);
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(selectedTechnique.pattern[0].duration);

  React.useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          // Move to next step
          setCurrentStep((prevStep) => {
            const nextStep = (prevStep + 1) % selectedTechnique.pattern.length;
            setTimeLeft(selectedTechnique.pattern[nextStep].duration);
            return nextStep;
          });
          // This will be set in the next tick by setCurrentStep's effect
          return selectedTechnique.pattern[(currentStep + 1) % selectedTechnique.pattern.length].duration;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, selectedTechnique, currentStep]);

  const handleTechniqueChange = (id: string) => {
    const newTechnique = techniques.find(t => t.id === id) || techniques[0];
    setSelectedTechnique(newTechnique);
    resetExercise(newTechnique);
  };

  const togglePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const resetExercise = (technique = selectedTechnique) => {
    setIsRunning(false);
    setCurrentStep(0);
    setTimeLeft(technique.pattern[0].duration);
  };

  React.useEffect(() => {
    resetExercise(selectedTechnique);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTechnique]);


  const currentInstruction = selectedTechnique.pattern[currentStep].instruction;
  const totalDuration = selectedTechnique.pattern.reduce((sum, step) => sum + step.duration, 0);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-semibold text-foreground">Breathing Exercises</h1>
        <p className="text-xl text-muted-foreground font-body">
          Guide your breath, calm your mind.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Choose Your Technique</CardTitle>
          <Select onValueChange={handleTechniqueChange} defaultValue={selectedTechnique.id}>
            <SelectTrigger className="w-full font-body">
              <SelectValue placeholder="Select a breathing technique" />
            </SelectTrigger>
            <SelectContent>
              {techniques.map((tech) => (
                <SelectItem key={tech.id} value={tech.id} className="font-body">
                  {tech.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8">
          <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center relative overflow-hidden">
            <div 
              className="w-full h-full bg-primary/30 rounded-full breathing-circle-animation"
              style={{ animationPlayState: isRunning ? 'running' : 'paused' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-4xl font-bold text-primary-foreground font-headline">{timeLeft}</p>
              <p className="text-lg text-primary-foreground/80 font-body">{currentInstruction}</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={togglePlayPause} size="lg" className="font-body w-32">
              {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={() => resetExercise()} variant="outline" size="lg" className="font-body">
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Cycle: {currentStep + 1} / {selectedTechnique.pattern.length} | Total Cycle Duration: {totalDuration}s
          </p>
        </CardContent>
      </Card>
      
      <Alert className="max-w-2xl mx-auto">
        <Info className="h-5 w-5" />
        <AlertTitle className="font-headline text-lg">{selectedTechnique.name} - How it helps</AlertTitle>
        <AlertDescription className="font-body text-base">
          {selectedTechnique.description}
        </AlertDescription>
      </Alert>
    </div>
  );
}
