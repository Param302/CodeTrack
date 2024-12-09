'use client';

import { useState } from 'react';
import { themes } from '@/utils/themes';
import { Switch } from "@/components/ui/switch"

interface EmbedSectionProps {
	scale: number,
	gap: number,
	roundness: number,
	theme: 'light' | 'dark' | 'dim',
	themePreset: string,
	showProfile: 0 | 1,
	showTotalContributions: 0 | 1,
	showTooltip: 0 | 1,
	showWeekdays: 0 | 1,
	showMonths: 0 | 1,
}

export default function HeatmapOptions({ scale, gap, roundness, theme, themePreset, showProfile = 1, showTotalContributions, showTooltip, showWeekdays, showMonths }: EmbedSectionProps) {

	return (
		<article>
			<label className="inline-flex items-center cursor-pointer">
				<input type="checkbox" value={showProfile} className="sr-only peer" />
				<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Profile</span>
			</label>
			<label className="inline-flex items-center cursor-pointer">
				<input type="checkbox" value="" className="sr-only peer" />
				<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Contributions</span>
			</label>
			<label className="inline-flex items-center cursor-pointer">
				<input type="checkbox" value="" className="sr-only peer" />
				<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tooltip</span>
			</label>
			<label className="inline-flex items-center cursor-pointer">
				<input type="checkbox" value="" className="sr-only peer" />
				<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Week Days</span>
			</label>
			<label className="inline-flex items-center cursor-pointer">
				<input type="checkbox" value="" className="sr-only peer" />
				<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Months</span>
			</label>
			<div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
		</article>
		
	);

}