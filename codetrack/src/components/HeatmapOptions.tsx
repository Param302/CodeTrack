import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface EmbedSectionProps {
  scale: number;
  gap: number;
  roundness: number;
  theme: "light" | "dark" | "dim";
  themePreset: string;
  showProfile: 0 | 1;
  showTotalContributions: 0 | 1;
  showTooltip: 0 | 1;
  showWeekdays: 0 | 1;
  showMonths: 0 | 1;
}

export default function HeatmapOptions({
  scale,
  gap,
  roundness,
  theme,
  themePreset,
  showProfile = 1,
  showTotalContributions,
  showTooltip,
  showWeekdays,
  showMonths,
}: EmbedSectionProps) {
  const [options, setOptions] = useState({
    scale,
    gap,
    roundness,
    theme,
    themePreset,
    showProfile: Boolean(showProfile),
    showTotalContributions: Boolean(showTotalContributions),
    showTooltip: Boolean(showTooltip),
    showWeekdays: Boolean(showWeekdays),
    showMonths: Boolean(showMonths),
  });

  const heatmapToggleOptions: { label: string; key: string }[] = [
    { label: "Profile", key: "showProfile" },
    { label: "Total Contributions", key: "showTotalContributions" },
    { label: "Tooltip", key: "showTooltip" },
    { label: "Weekdays", key: "showWeekdays" },
    { label: "Months", key: "showMonths" },
  ];

  const roundnessValues = [
    { label: "Edgy", value: 0 },
    { label: "Soft", value: 2 },
    { label: "Rounded", value: 5 },
    { label: "Smooth", value: 8 },
    { label: "Ellipse", value: 10 },
  ];

  const updateOption = (key: string, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
  };

  return (
    <section className="grid grid-cols-2 auto-row-auto gap-4 rounded-lg bg-gray-900 p-8">
			<h3 className="text-xl font-semibold col-span-2">Configurations</h3>
      <div className="col-span-2">
        <label className="text-sm font-medium">Scale</label>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Adjust the scale to change the size of the heatmap. It ranges from <b>0.5x</b> to <b>10x</b>.
          </p>
          <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full">
            Only previewed on your website
          </span>
        </div>
        <div className="mt-4">
          <Slider
            value={[options.scale]}
            min={0.5}
            max={10}
            step={0.5}
            onValueChange={(value) => updateOption("scale", value[0])}
            className="mx-2"
          />
          <div className="flex justify-between text-xs mt-2 text-gray-600 dark:text-gray-400">
            <span>0.5x</span>
            <span>1x</span>
            <span>2x</span>
            <span>5x</span>
            <span>10x</span>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Gap</label>
        <Tabs defaultValue={String(options.gap)} className="w-full mt-2">
          <TabsList className="grid grid-cols-3">
            {[0, 5, 10].map((value) => (
              <TabsTrigger
                key={value}
                value={String(value)}
                onClick={() => updateOption("gap", value)}
              >
                {value}px
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
			<div>
        <label className="text-sm font-medium">Roundness</label>
        <Tabs defaultValue={String(options.roundness)} className="w-full mt-2">
          <TabsList className="grid grid-cols-5">
            {roundnessValues.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={String(value)}
                onClick={() => updateOption("roundness", value)}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div>
        <label className="text-sm font-medium">Theme</label>
        <Tabs defaultValue={options.theme} className="w-full mt-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="light" onClick={() => updateOption("theme", "light")}>
              Light
            </TabsTrigger>
            <TabsTrigger value="dim" onClick={() => updateOption("theme", "dim")}>
              Dim
            </TabsTrigger>
            <TabsTrigger value="dark" onClick={() => updateOption("theme", "dark")}>
              Dark
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <label className="text-sm font-medium">Theme Preset</label>
        <Select
          onValueChange={(value) => updateOption("themePreset", value)}
          defaultValue={options.themePreset}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a theme preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="github">GitHub</SelectItem>
            <SelectItem value="monokai">Monokai</SelectItem>
            <SelectItem value="dracula">Dracula</SelectItem>
          </SelectContent>
        </Select>
      </div>

			<div className="col-span-2">
        <label className="text-sm font-medium">Options</label>
        <ToggleGroup
          type="multiple"
          className="grid grid-cols-5 gap-2 mt-2"
          defaultValue={heatmapToggleOptions
            .filter(({ key }) => options[key])
            .map(({ key }) => key)}
          onValueChange={(values) => {
            const toggledOptions = heatmapToggleOptions.reduce((acc, { key }) => {
              acc[key] = values.includes(key);
              return acc;
            }, {} as Record<string, boolean>);
            setOptions({ ...options, ...toggledOptions });
          }}
        >
          {heatmapToggleOptions.map(({ label, key }) => (
            <ToggleGroupItem key={key} value={key} className="active:hover:bg-transparent">
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </section>
  );
}
