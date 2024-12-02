'use client';

import '@/app/globals.css';
import { useState, useEffect } from 'react';

type ContributionData = {
  [date: string]: number;
};

interface Props {
  contributions: ContributionData;
}

export default function ContributionHeatmap({ contributions }: Props) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [weekData, setWeekData] = useState<Array<Array<{date: string; count: number}>>>([]);

  useEffect(() => {
    console.log('Contributions received:', contributions);

    const generateWeekData = () => {
      const firstDay = new Date(selectedYear, 0, 1);
      const weeks: Array<Array<{date: string; count: number}>> = [];
      let currentWeek: Array<{date: string; count: number}> = [];

      const startPadding = firstDay.getDay();
      for (let i = 0; i < startPadding; i++) {
        currentWeek.push({ date: '', count: 0 });
      }

      for (let d = new Date(firstDay); d.getFullYear() === selectedYear; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        currentWeek.push({
          date: dateStr,
          count: contributions[dateStr] || 0
        });

        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      }

      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push({ date: '', count: 0 });
        }
        weeks.push(currentWeek);
      }

      setWeekData(weeks);
    };

    generateWeekData();
  }, [selectedYear, contributions]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800 dark:bg-gray-800';
    if (count <= 3) return 'bg-green-900 dark:bg-green-900';
    if (count <= 6) return 'bg-green-700 dark:bg-green-700';
    if (count <= 9) return 'bg-green-500 dark:bg-green-500';
    return 'bg-green-300 dark:bg-green-300';
  };

  const years = Array.from(
    new Set(Object.keys(contributions).map(date => new Date(date).getFullYear()))
  ).sort();

  if (weekData.length === 0) {
    return <div className="text-white">No data available for selected year</div>;
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-700 rounded-lg p-4 pb-1">
      <div className="flex-grow">
        <div className="w-full h-full">
          <div className="flex flex-wrap justify-around gap-[3px] h-full">
            {weekData.map((week, weekIndex) => (
              <div 
                key={weekIndex} 
                className="flex flex-col flex-grow gap-[3px] max-h-[60vh] h-fit"
              >
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`aspect-square w-full rounded-sm ${getColor(day.count)}`}
                    title={day.date ? `${day.date}: ${day.count} contributions` : ''}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {years.length > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            onClick={() => setSelectedYear(prev => Math.max(...years.filter(y => y < prev)))}
            disabled={selectedYear === Math.min(...years)}
            className="p-1 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white text-xs"
          >
            ←
          </button>
          <span className="font-mono text-white text-xs">{selectedYear}</span>
          <button
            onClick={() => setSelectedYear(prev => Math.min(...years.filter(y => y > prev)))}
            disabled={selectedYear === Math.max(...years)}
            className="p-1 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white text-xs"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
} 