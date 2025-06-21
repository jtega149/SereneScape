import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, Headphones, Wind, Sparkles, PlayCircle } from "lucide-react";
import Image from "next/image";

const quickAccessItems = [
  { title: "Stress Relief Meditation", href: "/meditations/stress-relief", icon: PlayCircle, category: "Meditation" , image: "https://placehold.co/600x400.png", imageHint: "calm nature" },
  { title: "Focus Breathing", href: "/breathing/focus", icon: PlayCircle, category: "Breathing", image: "https://placehold.co/600x400.png", imageHint: "abstract waves" },
  { title: "Rain Sounds", href: "/soundscapes/rain", icon: PlayCircle, category: "Soundscape", image: "https://placehold.co/600x400.png", imageHint: "rain window" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-headline font-semibold text-foreground mb-2">Welcome to SereneScape</h1>
        <p className="text-xl text-muted-foreground font-body">
          Start your journey to mindfulness. Explore meditations, soundscapes, and more.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-medium text-foreground mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessItems.map((item) => (
            <Card key={item.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={600} 
                  height={400} 
                  className="w-full h-48 object-cover"
                  data-ai-hint={item.imageHint} 
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl font-headline mb-1">{item.title}</CardTitle>
                <CardDescription className="text-sm mb-4">{item.category}</CardDescription>
                <Button asChild variant="outline" className="w-full font-body">
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    Start Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
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
