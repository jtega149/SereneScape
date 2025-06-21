"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Waves, Trees, CloudRain, Volume2, Sun, Moon, Coffee } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Soundscape {
  id: string;
  name: string;
  icon: LucideIcon;
}

const availableSoundscapes: Soundscape[] = [
  { id: "ocean", name: "Ocean Waves", icon: Waves },
  { id: "forest", name: "Forest Ambience", icon: Trees },
  { id: "rain", name: "Gentle Rain", icon: CloudRain },
  { id: "morning", name: "Morning Birds", icon: Sun },
  { id: "night", name: "Night Crickets", icon: Moon },
  { id: "cafe", name: "Cafe Buzz", icon: Coffee },
];

interface SoundscapeState {
  [key: string]: {
    isPlaying: boolean;
    volume: number;
  };
}

export default function SoundscapesPage() {
  const [masterVolume, setMasterVolume] = React.useState<number[]>([50]);
  const [soundscapeStates, setSoundscapeStates] = React.useState<SoundscapeState>(
    availableSoundscapes.reduce((acc, curr) => {
      acc[curr.id] = { isPlaying: false, volume: 50 };
      return acc;
    }, {} as SoundscapeState)
  );

  const handleTogglePlay = (id: string) => {
    setSoundscapeStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isPlaying: !prev[id].isPlaying },
    }));
  };

  const handleVolumeChange = (id: string, value: number[]) => {
    setSoundscapeStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], volume: value[0] },
    }));
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-semibold text-foreground">Ambient Soundscapes</h1>
        <p className="text-xl text-muted-foreground font-body">
          Create your perfect relaxation environment by mixing sounds.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Volume2 className="mr-3 h-6 w-6" /> Master Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={masterVolume}
            onValueChange={setMasterVolume}
            aria-label="Master volume"
          />
          <p className="text-sm text-muted-foreground mt-2 text-center font-body">
            Current Volume: {masterVolume[0]}%
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableSoundscapes.map((sound) => (
          <Card key={sound.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-headline flex items-center">
                <sound.icon className="mr-3 h-6 w-6 text-primary" /> {sound.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={`play-${sound.id}`} className="font-body text-base">
                  {soundscapeStates[sound.id]?.isPlaying ? "Playing" : "Paused"}
                </Label>
                <Switch
                  id={`play-${sound.id}`}
                  checked={soundscapeStates[sound.id]?.isPlaying}
                  onCheckedChange={() => handleTogglePlay(sound.id)}
                  aria-label={`Toggle ${sound.name} sound`}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`volume-${sound.id}`} className="font-body text-sm">Volume: {soundscapeStates[sound.id]?.volume}%</Label>
                <Slider
                  id={`volume-${sound.id}`}
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  value={[soundscapeStates[sound.id]?.volume || 50]}
                  onValueChange={(value) => handleVolumeChange(sound.id, value)}
                  disabled={!soundscapeStates[sound.id]?.isPlaying}
                  aria-label={`${sound.name} volume`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-center text-muted-foreground font-body pt-4">
        Note: Audio playback is illustrative in this demo.
      </p>
    </div>
  );
}
