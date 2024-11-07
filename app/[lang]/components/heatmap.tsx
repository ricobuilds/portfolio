import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HeatmapProps {
  data?: Array<{ date: string, count: number }>
  title?: string;
  colorScheme?: Array<string>;
  dayLabels?: Array<string>;
  cellSize?: number;
  gap?: number;
  tooltipFormat?: (date: string, count: number) => string;
}

const generateRandomData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.unshift({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10)
    });
  }
  return data;
};

const getColor = (count: number) => {
  if (count === 0) return 'bg-slate-300';
  if (count < 3) return 'bg-amethyst-200';
  if (count < 6) return 'bg-amethyst-400';
  if (count < 9) return 'bg-amethyst-600';
  return 'bg-amethyst-800';
};

const colorScheme = ['bg-slate-300', 'bg-amethyst-200', 'bg-amethyst-400', 'bg-amethyst-600', 'bg-amethyst-800'];
const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const Heatmap = ({title, gap}: HeatmapProps) => {
  const data = generateRandomData();

  const getColor = (count: number) => {
    const index = Math.min(Math.floor(count / 3), colorScheme.length - 1);
    return colorScheme[index];
  };

  // Calculate the number of weeks
  const weeks = Math.ceil(data.length / 7);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="flex">
        <div className="flex flex-col mr-2 text-xs text-gray-400 justify-between h-[124px]">
          {dayLabels.map((label, index) => (
            <div key={index} className="flex items-center h-3">{label}</div>
          ))}
        </div>
        <div className={`flex gap-1`}>
          <TooltipProvider>
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className={`flex flex-col gap-1`}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const dataIndex = weekIndex * 7 + dayIndex;
                  const day = data[dataIndex];
                  return day ? (
                    <Tooltip key={day.date}>
                      <TooltipTrigger>
                        <div
                          className={`w-3 h-3 ${getColor(day.count)} rounded-sm`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{day.count} {day.count === 1 ? "blog post" : "blog posts"} on {day.date}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div key={`empty-${dataIndex}`} className="w-3 h-3" />
                  );
                })}
              </div>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;