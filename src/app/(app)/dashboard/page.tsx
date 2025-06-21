"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Brain, Headphones, Wind, Sparkles, PlayCircle, Scroll } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import './res.css';

const quickAccessItems = [
  { title: "Stress Relief Meditation", href: "/meditations/stress-relief", icon: PlayCircle, category: "Meditation" , image: "/images/stress-relief-meditation.png", imageHint: "calm nature" },
  { title: "Focus Breathing", href: "/breathing/focus", icon: PlayCircle, category: "Breathing", image: "/images/focus-breathing.png", imageHint: "abstract waves" },
  { title: "Rain Sounds", href: "/soundscapes/rain", icon: PlayCircle, category: "Soundscape", image: "/images/rain-cover.png", imageHint: "rain window" },
];

export default function DashboardPage() {

  const [moodInput, setMoodInput] = useState('')

  const handleMoodSubmit = async () => {
  try {

    setText("Is there anything else on your mind cutie?")
    
    // 1. Classify mood
    const classifyRes = await fetch('/api/classify-mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: moodInput }),
    });

    const classifyData = await classifyRes.json();

    if (classifyData.category) {
      const emojiMap = {
        positive: '😊',
        neutral: '😐',
        negative: '😞',
      };
      
    if (classifyData.category) {
      const category = classifyData.category as 'positive' | 'neutral' | 'negative';
      console.log(`🧠 User mood is classified as: ${category} ${emojiMap[category]}`);
    }
    } else {
      console.error('❌ Classification failed:', classifyData.error);
    }

    // 2. Generate mood recap
    const recapRes = await fetch('/api/generate-mood-recap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: moodInput }),
    });

    const recapData = await recapRes.json();

    if (recapData.message) {
      console.log(`📝 Recap message: ${recapData.message}`);
    } else {
      console.error('❌ Recap generation failed:', recapData.error);
    }

  } catch (err) {
    console.error('❌ Mood submit failed:', err);
  }
};
  const [submitText, setText] = useState('Type your mood')

  const bruh = () => {
    setText("Is there anything else on your mind cutie?")
  }

  return (
    <div className="space-y-8">
      <section className="bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-headline font-semibold text-foreground mb-2">Welcome to SereneScape</h1>
        <p className="text-xl text-muted-foreground font-body">
          Start your journey to mindfulness. Explore meditations, soundscapes, and more.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-medium text-foreground mb-6">Mood Check-In</h2>
        <div className="grid gap-6">
            <Card key='mood-card' className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-4">
                <CardTitle>How do you feel?</CardTitle>
              </CardHeader>
              <div className="response">
                GEMINI API RESPONSE HERE 
                GEMINI API RESPONSE HERE 
                GEMINI API RESPONSE HERE 
                GEMINI API RESPONSE HERE 
                GEMINI API RESPONSE HERE 
                GEMINI API RESPONSE HERE 
              </div>
              <CardContent className="p-6">
                <Input value={moodInput} onChange={e => setMoodInput(e.target.value)} placeholder="Type your mood..." className="border p-2 rounded w-full" />
                <Button className="mt-4" onClick={handleMoodSubmit}>Submit</Button>
              </CardContent>
            </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-medium text-foreground mb-6">Explore Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Meditations", href: "/meditations", icon: Brain, description: "Guided sessions for all levels." },
            { title: "Soundscapes", href: "/soundscapes", icon: Headphones, description: "Create your perfect ambiance." },
            { title: "Breathing", href: "/breathing", icon: Wind, description: "Simple exercises for calm." },
            { title: "Affirmations", href: "/affirmations", icon: Sparkles, description: "Personalized positive statements." },
            { title: "Standardized Psychological Tests", href: "/spt", icon: Scroll, description: "Standardized Psychological Exams." },
          ].map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/20 text-primary rounded-full p-3 w-fit mb-4">
                  <feature.icon className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 font-body">{feature.description}</p>
                <Button asChild variant="ghost" className="font-body text-accent hover:text-accent-foreground hover:bg-accent">
                  <Link href={feature.href}>Explore</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
