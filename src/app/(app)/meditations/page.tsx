import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Tag, Search, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const meditations = [
  { id: "1", title: "Morning Gratitude", duration: "10 min", theme: "Gratitude", image: "https://placehold.co/600x400.png", imageHint: "sunrise serene" },
  { id: "2", title: "Stress Reduction", duration: "15 min", theme: "Stress Relief", image: "https://placehold.co/600x400.png", imageHint: "calm lake" },
  { id: "3", title: "Deep Sleep Relaxation", duration: "20 min", theme: "Sleep", image: "https://placehold.co/600x400.png", imageHint: "night sky" },
  { id: "4", title: "Mindful Focus", duration: "5 min", theme: "Focus", image: "https://placehold.co/600x400.png", imageHint: "zen garden" },
  { id: "5", title: "Body Scan", duration: "25 min", theme: "Awareness", image: "https://placehold.co/600x400.png", imageHint: "person meditating" },
  { id: "6", title: "Loving Kindness", duration: "12 min", theme: "Compassion", image: "https://placehold.co/600x400.png", imageHint: "heart nature" },
];

export default function MeditationsPage() {
  // In a real app, search and filter would be dynamic
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-semibold text-foreground">Meditation Library</h1>
        <p className="text-xl text-muted-foreground font-body">
          Find a guided meditation that suits your needs.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search meditations..." className="pl-10 font-body" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px] font-body">
            <ListFilter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Themes</SelectItem>
            <SelectItem value="gratitude">Gratitude</SelectItem>
            <SelectItem value="stress-relief">Stress Relief</SelectItem>
            <SelectItem value="sleep">Sleep</SelectItem>
            <SelectItem value="focus">Focus</SelectItem>
            <SelectItem value="awareness">Awareness</SelectItem>
            <SelectItem value="compassion">Compassion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meditations.map((meditation) => (
          <Card key={meditation.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image 
                src={meditation.image} 
                alt={meditation.title} 
                width={600} 
                height={400} 
                className="w-full h-48 object-cover"
                data-ai-hint={meditation.imageHint}
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="text-2xl font-headline mb-2">{meditation.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Clock className="mr-2 h-4 w-4" />
                <span>{meditation.duration}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Tag className="mr-2 h-4 w-4" />
                <span>{meditation.theme}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full font-body">
                <PlayCircle className="mr-2 h-5 w-5" />
                Play Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
