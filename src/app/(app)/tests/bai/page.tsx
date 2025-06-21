"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const NUM_QUESTIONS = 21;
const questions = [
    "Have you had any feeling of numbness or tingling?",
    "Have you been feeling hot?",
    "Have you been feeling wobbliness in the legs?",
    "Have you been unable to relax?",
    "Have you been in fear of the worst happening?",
    "Has your heart been pounding / racing?",
    "Have you been feeling unsteady?",
    "Have you been feeling terrifed or afraid?",
    "Have you been feeling nervous?",
    "Have you experienced feelings of choking lately?",
    "Do you experience frequent hand trembling?",
    "Do you feel shaky at times?",
    "Do you have a fear of losing control?",
    "Have you had difficulty in breathing?",
    "Do you have fears of dying?",
    "Are you scared?",
    "Have you been experiencing indigestion?",
    "Have you veen feeling lightheaded or like you might faint?",
    "Do you experience face flushing?",
    "Have you had the cold sweats?",
    "Do you experience unusual dizziness?"
];

export default function BaiPage() {
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<number[]>(Array(NUM_QUESTIONS).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [anxietyLevel, setAnxietyLevel] = useState('');

  const handleBeginTest = () => {
    setShowTest(true);
    setShowResult(false);
    setAnswers(Array(NUM_QUESTIONS).fill(-1)); // Reset answers
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value, 10);
    setAnswers(newAnswers);
  };


  const handleSubmitTest = async () => {
    const score = answers.reduce((sum, answer) => sum + (answer > -1 ? answer : 0), 0);
    setTotalScore(score);

    await fetch('/api/auth/updateScore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bai_score: totalScore }),
    });
    

    if (score >= 0 && score <= 21) {
      setAnxietyLevel('Low Anxiety');
    } else if (score >= 22 && score <= 35) {
      setAnxietyLevel('Moderate Anxiety');
    } else if (score >= 36) {
      setAnxietyLevel('Potentially Concerning Levels of Anxiety');
    }

    setShowTest(false);
    setShowResult(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Beck Anxiety Inventory (BAI)</h1>

      {!showTest && !showResult && (
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>About the BAI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>The Beck Anxiety Inventory (BAI) is a 21-question survey designed to measure the severity of anxiety symptoms.</p>
            <p>For each question, please select the option that best describes how much you have been bothered by the symptom over the past week, including today. The options are:</p>
            <ul>
              <li><strong>0:</strong> Not at all</li>
              <li><strong>1:</strong> Mildly, but it didn’t bother me much</li>
              <li><strong>2:</strong> Moderately – it wasn’t pleasant at times</li>
              <li><strong>3:</strong> Severely – it bothered me a lot</li>
            </ul>
            <div className="text-center">
              <Button onClick={handleBeginTest}>Begin Test</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showTest && (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="mb-4 font-semibold">{`${index + 1}. ${question}`}</p>
                <RadioGroup onValueChange={(value) => handleAnswerChange(index, value)} value={answers[index].toString()} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="0" id={`q${index}-0`} /><Label htmlFor={`q${index}-0`}>0 - Not at all</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="1" id={`q${index}-1`} /><Label htmlFor={`q${index}-1`}>1 - Mildly, but it didn’t bother me much</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="2" id={`q${index}-2`} /><Label htmlFor={`q${index}-2`}>2 - Moderately – it wasn’t pleasant at times</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="3" id={`q${index}-3`} /><Label htmlFor={`q${index}-3`}>3 - Severely – it bothered me a lot</Label></div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
          <div className="text-center mt-8">
            <Button onClick={handleSubmitTest} disabled={answers.some(answer => answer === -1)}>Submit Test</Button>
          </div>
        </div>
      )}

      {showResult && (
        <Card className="mx-auto max-w-2xl text-center">
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl font-semibold">Your total score is: {totalScore}</p>
            <p className="text-lg">Anxiety Level: <span className="font-bold">{anxietyLevel}</span></p>
            {/* You might add more detailed interpretation or next steps here */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}