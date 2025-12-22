import React, { useState } from 'react';
import { AgeGroup, ActivityType, Holiday } from './types';
import { AGE_GROUPS, ACTIVITY_TYPES, HOLIDAYS } from './constants';

interface ControlsPanelProps {
  onGenerate: (prompt: string, ageGroup: AgeGroup, activityType: ActivityType, holiday: Holiday) => void;
  isLoading: boolean;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('4-6');
  const [activityType, setActivityType] = useState<ActivityType>('Coloring Page');
  const [holiday, setHoliday] = useState<Holiday>('None');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    onGenerate(prompt, ageGroup, activityType, holiday);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-white space-y-8">
      <form onSubmit={handleSubmit} className="space-y-10">
        
        <div>
          <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-5">1. Select Age Group</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AGE_GROUPS.map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => setAgeGroup(age)}
                className={`py-3 px-1 rounded-2xl text-[10px] font-bold uppercase transition-all border-2 ${
                  ageGroup === age 
                  ? 'bg-[#B2F7EF] border-[#B2F7EF] text-teal-900 shadow-md scale-105' 
                  : 'bg-white border-gray-100 text-gray-600 hover:border-[#B2F7EF]/50'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">2. Activity Type</label>
            <select 
              value={activityType}
              onChange={(e) => setActivityType(e.target.value as ActivityType)}
              className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#B2F7EF]/20 focus:border-[#B2F7EF] outline-none text-gray-800 font-medium text-sm transition-all"
            >
              {ACTIVITY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
              3. Holiday Vibe (Optional)
            </label>
            <select 
              value={holiday}
              onChange={(e) => setHoliday(e.target.value as Holiday)}
              className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#B2F7EF]/20 focus:border-[#B2F7EF] outline-none text-gray-800 font-medium text-sm transition-all"
            >
              {HOLIDAYS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              4. Theme Idea (Optional)
            </label>
          </div>

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Leave blank for a surprise, or type something like 'A magical garden'..."
              className="w-full h-32 px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#B2F7EF]/20 focus:border-[#B2F7EF] outline-none text-base resize-none transition-all text-gray-800"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-[#B2F7EF] hover:bg-[#9DE8DF] text-teal-900 font-heading font-bold text-base rounded-[2rem] shadow-lg shadow-[#B2F7EF]/40 disabled:opacity-50 uppercase tracking-[0.25em] transform active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
        >
          <span>{isLoading ? 'Creating Magic...' : 'Generate Page ✨'}</span>
        </button>
      </form>
    </div>
  );
};

export default ControlsPanel;
