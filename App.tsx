import React, { useState, useEffect } from 'react';
import { getWorkoutForDate } from './data';
import { DailyWorkoutPlan, WorkoutSection, Exercise, ExerciseSet } from './types';
import { 
  Calendar, CheckCircle, ChevronLeft, ChevronRight, Info, 
  Trophy, Dumbbell, Timer, LayoutDashboard, CalendarDays, 
  ChevronDown, ChevronUp, AlertCircle, Video, Settings,
  List, Clock, XCircle, ArrowLeft, Check, Square, CheckSquare,
  CalendarOff, ArrowRight, Play, Activity
} from 'lucide-react';

// --- Components ---

const Header = ({ 
  title, 
  currentView, 
  setView 
}: { 
  title: string, 
  currentView: 'schedule' | 'daily' | 'settings', 
  setView: (v: 'schedule' | 'daily' | 'settings') => void 
}) => (
  <header className="bg-slate-900 text-white p-4 sticky top-0 z-30 shadow-md h-[64px] flex items-center">
    <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        {currentView === 'daily' ? (
           <button onClick={() => setView('schedule')} className="mr-2 p-1 -ml-1 rounded hover:bg-slate-800 transition-colors">
             <ArrowLeft className="h-6 w-6 text-slate-300 hover:text-white" />
           </button>
        ) : (
          <div className="bg-blue-500/20 p-1.5 rounded-lg border border-blue-500/30">
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
        )}
        <h1 className="text-lg font-bold tracking-wider uppercase hidden sm:block font-mono">{title}</h1>
        <h1 className="text-lg font-bold tracking-wider uppercase sm:hidden font-mono">Tactical<span className="text-blue-400">Fit</span></h1>
      </div>
      <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
        <button
          onClick={() => setView('schedule')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
            currentView === 'schedule' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">Schedule</span>
        </button>
        <button
          onClick={() => setView('settings')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
            currentView === 'settings' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </div>
  </header>
);

const DateSelector = ({ 
  currentDate, 
  onDateChange 
}: { 
  currentDate: Date, 
  onDateChange: (d: Date) => void 
}) => {
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  return (
    <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-[64px] z-20 h-[72px] shadow-sm">
      <button onClick={handlePrev} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
          {currentDate.toLocaleDateString(undefined, { weekday: 'long' })}
        </span>
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          {currentDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
        </span>
      </div>
      <button onClick={handleNext} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

const ExerciseCard: React.FC<{ 
  exercise: Exercise; 
  week: number;
  isComplete: boolean;
  onToggle: () => void;
}> = ({ exercise, week, isComplete, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prescription: ExerciseSet | undefined = exercise.weeks[week];

  if (!prescription) return null;

  return (
    <div className={`
      relative overflow-hidden rounded-lg border transition-all duration-300 mb-4 group
      ${isComplete 
        ? 'bg-slate-50 border-slate-200 opacity-70' 
        : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
      }
    `}>
      {/* Status Bar Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${isComplete ? 'bg-emerald-500' : 'bg-blue-600'}`} />

      <div 
        className="p-4 pl-6 flex gap-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Checkbox Section */}
        <div className="pt-1">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                className={`
                    flex items-center justify-center h-6 w-6 rounded border-2 transition-all duration-200
                    ${isComplete 
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' 
                        : 'bg-white border-slate-300 text-transparent hover:border-blue-500'
                    }
                `}
                aria-label={`Mark ${exercise.name} as complete`}
            >
                <Check className="h-4 w-4 stroke-[3]" />
            </button>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
              <h3 className={`font-bold text-lg leading-tight transition-colors ${isComplete ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                  {exercise.name}
              </h3>
          </div>
          
          {/* Tech Pills for Data */}
          <div className="flex flex-wrap gap-2 mt-3">
             <div className="flex items-center bg-slate-100 rounded border border-slate-200 px-2 py-1">
                <span className="text-[10px] text-slate-500 uppercase font-mono mr-2">SETS</span>
                <span className="text-xs font-mono font-bold text-slate-900">{prescription.sets}</span>
             </div>
             <div className="flex items-center bg-slate-100 rounded border border-slate-200 px-2 py-1">
                <span className="text-[10px] text-slate-500 uppercase font-mono mr-2">REPS</span>
                <span className="text-xs font-mono font-bold text-slate-900">{prescription.reps}</span>
             </div>
             {prescription.intensity && (
                <div className="flex items-center bg-blue-50 rounded border border-blue-100 px-2 py-1">
                   <span className="text-xs font-mono font-medium text-blue-700">{prescription.intensity}</span>
                </div>
             )}
          </div>
        </div>

        {/* Expand/Collapse Icon */}
        <div className="flex items-center h-full pt-1">
          {isOpen ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
        </div>
      </div>
      
      {/* Details Accordion */}
      <div className={`transition-all duration-300 overflow-hidden bg-slate-50 ${isOpen ? 'max-h-[800px] border-t border-slate-100' : 'max-h-0'}`}>
        <div className="p-4 pl-6 space-y-4">
          {exercise.notes && (
            <div className="text-sm bg-blue-50 text-blue-800 p-3 rounded border border-blue-100 flex gap-2 items-start">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
              <span>{exercise.notes}</span>
            </div>
          )}
          
          {exercise.instructions && (
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 font-mono">Briefing</h4>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-300">
                {exercise.instructions.map((inst, idx) => (
                  <div key={idx} className="relative flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-mono z-10 shadow-sm">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{inst}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exercise.commonMistakes && (
            <div className="bg-rose-50 rounded p-3 border border-rose-100">
               <h4 className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-1.5 font-mono">
                 <AlertCircle className="h-3 w-3" /> Errors to Avoid
               </h4>
               <ul className="space-y-1">
                {exercise.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-rose-800">
                    <span className="text-rose-400">•</span>
                    <span className="leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {exercise.videoUrl && (
            <div className="pt-2">
              <a 
                href={exercise.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-center w-full gap-2 p-3 text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 rounded transition-all border border-slate-200 shadow-sm"
              >
                <div className="bg-slate-100 p-1 rounded-full group-hover/btn:bg-blue-100 group-hover/btn:text-blue-600 transition-colors">
                    <Play className="h-3 w-3 fill-current" />
                </div>
                VIZUALIZE MOVEMENT
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ completed, total }: { completed: number, total: number }) => {
    const percentage = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
    
    return (
        <div className="sticky top-[136px] z-10 bg-slate-50/95 backdrop-blur-sm pb-4 pt-2 border-b border-slate-200 mb-6">
             <div className="flex justify-between items-end mb-2 px-1">
                 <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Mission Progress</span>
                 </div>
                 <div className="text-right">
                    <span className="text-lg font-mono font-bold text-slate-900 leading-none">{Math.round(percentage)}%</span>
                    <span className="text-xs text-slate-500 ml-2 font-mono">[{completed}/{total}]</span>
                 </div>
             </div>
             <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300/50">
                 <div 
                    className={`h-full transition-all duration-500 ease-out relative overflow-hidden ${percentage === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                    style={{ width: `${percentage}%` }}
                 >
                 </div>
             </div>
        </div>
    )
};

const WorkoutView = ({ 
    date, 
    startDate,
    progress,
    onToggleExercise
}: { 
    date: Date, 
    startDate: Date,
    progress: Record<string, boolean>,
    onToggleExercise: (exerciseName: string) => void
}) => {
  const { workout, week, dayNum } = getWorkoutForDate(startDate, date);
  const dateStr = date.toISOString().split('T')[0];
  const dayProgress = progress || {};

  // Calculate stats
  let totalExercises = 0;
  let completedExercises = 0;

  workout.sections.forEach(section => {
      section.exercises.forEach(ex => {
          // If the exercise has data for this week, count it
          if (ex.weeks[week]) {
            totalExercises += 1;
            if (dayProgress[ex.name]) {
                completedExercises += 1;
            }
          }
      });
  });

  if (workout.type === 'Rest') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 p-8 text-center">
        <div className="bg-slate-100 p-8 rounded-full mb-6 border border-slate-200 relative">
          <Clock className="h-16 w-16 text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">REST DAY</h2>
        <p className="max-w-xs text-slate-500">Recovery is a tactical necessity. Hydrate and mobilize.</p>
        
        {workout.sections.map((section, idx) => (
            <div key={idx} className="mt-12 text-left w-full max-w-sm bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm border-b border-slate-100 pb-2">{section.title}</h3>
                {section.exercises.map((ex, i) => (
                    <div key={i} className="text-slate-600 text-sm py-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        {ex.name}
                    </div>
                ))}
            </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      {/* Hero Header */}
      <div className="mb-6 relative overflow-hidden rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
         <div className="absolute top-0 right-0 p-4 opacity-5">
            <Activity className="h-32 w-32 text-blue-600" />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Week {week}</span>
                <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{workout.type}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">{workout.title}</h2>
         </div>
      </div>

      <ProgressBar completed={completedExercises} total={totalExercises} />

      <div className="space-y-8">
        {workout.sections.map((section, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-4 px-1">
               {section.type === 'Warm Up' && <Timer className="h-4 w-4 text-orange-500" />}
               {section.type === 'Strength' && <Dumbbell className="h-4 w-4 text-blue-500" />}
               {section.type === 'Superset' && <List className="h-4 w-4 text-purple-500" />}
               {section.type === 'Circuit' && <Timer className="h-4 w-4 text-red-500" />}
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{section.title || section.type}</h3>
            </div>
            
            <div>
              {section.exercises.map((exercise, i) => (
                <ExerciseCard 
                    key={i} 
                    exercise={exercise} 
                    week={week} 
                    isComplete={!!dayProgress[exercise.name]}
                    onToggle={() => onToggleExercise(exercise.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsView = ({ 
  startDate, 
  setStartDate, 
  onClose 
}: { 
  startDate: Date, 
  setStartDate: (d: Date) => void,
  onClose: () => void
}) => {
  const [tempDate, setTempDate] = useState(startDate.toISOString().split('T')[0]);

  useEffect(() => {
    setTempDate(startDate.toISOString().split('T')[0]);
  }, [startDate]);

  const handleSave = () => {
    const [year, month, day] = tempDate.split('-').map(Number);
    setStartDate(new Date(year, month - 1, day));
    onClose();
  };

  const handleShiftSchedule = (days: number) => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + days);
    setStartDate(newDate);
  };

  const handleResetProgress = () => {
      if(confirm("Are you sure you want to reset all workout progress? This cannot be undone.")) {
          localStorage.removeItem('tp_workout_progress');
          window.location.reload();
      }
  }

  return (
    <div className="p-4 max-w-lg mx-auto pb-20">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wider">Settings</h2>
      
      {/* Schedule Shifting Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
              <CalendarOff className="h-5 w-5 text-orange-500" />
              <h3 className="font-bold text-slate-900">Missed a Day?</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed border-b border-slate-100 pb-4">
              Shift your schedule to realign with your training reality.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
              <button 
                  onClick={() => handleShiftSchedule(1)}
                  className="group flex flex-col items-center justify-center p-3 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all text-center"
              >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Push Schedule</span>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <span>+1 Day</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
              </button>

              <button 
                  onClick={() => handleShiftSchedule(-1)}
                  className="group flex flex-col items-center justify-center p-3 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all text-center"
              >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pull Schedule</span>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      <span>-1 Day</span>
                  </div>
              </button>
          </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 shadow-sm">
        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Program Start Date</label>
        <p className="text-xs text-slate-500 mb-4">Select the Monday when you started Phase 1.</p>
        <input 
          type="date" 
          value={tempDate}
          onChange={(e) => setTempDate(e.target.value)}
          className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        
        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition-colors uppercase tracking-wider text-sm shadow-sm"
          >
            Update Date
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-sm">
          <h3 className="font-bold text-rose-600 mb-4 uppercase tracking-wider text-sm">Danger Zone</h3>
          <button 
            onClick={handleResetProgress}
            className="w-full py-3 border border-rose-200 text-rose-600 rounded bg-rose-50 hover:bg-rose-100 font-bold transition-colors text-sm uppercase"
          >
              Reset All Progress
          </button>
      </div>
    </div>
  );
};

const ScheduleView = ({ 
    startDate, 
    onSelectDate,
    progress
}: { 
    startDate: Date, 
    onSelectDate: (d: Date) => void,
    progress: Record<string, Record<string, boolean>>
}) => {
    const today = new Date();
    // Generate 8 weeks dynamically
    const weeks = Array.from({ length: 8 }, (_, i) => i + 1);
    
    // Helper to generate day indices 0-6
    const dayIndices = [0, 1, 2, 3, 4, 5, 6];

    const msPerDay = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor((today.getTime() - startDate.getTime()) / msPerDay);
    const currentProgramWeek = Math.floor(dayDiff / 7) + 1;

    return (
        <div className="p-4 max-w-3xl mx-auto pb-20">
             <h2 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wider">Mission Timeline</h2>
             
             {weeks.map(weekNum => {
                 const weekStart = new Date(startDate);
                 weekStart.setDate(weekStart.getDate() + (weekNum - 1) * 7);
                 
                 const isCurrentWeek = weekNum === currentProgramWeek;
                 const isPhase2 = weekNum > 4;

                 // Calculate Weekly Progress
                 let totalExercises = 0;
                 let completedExercises = 0;
                 
                 for (let i = 0; i < 7; i++) {
                     const d = new Date(weekStart);
                     d.setDate(d.getDate() + i);
                     const dateStr = d.toISOString().split('T')[0];
                     const { workout, week: phaseWeek } = getWorkoutForDate(startDate, d);
                     
                     if (workout.type !== 'Rest') {
                         workout.sections.forEach(section => {
                             section.exercises.forEach(ex => {
                                  if (ex.weeks[phaseWeek]) {
                                      totalExercises++;
                                      if (progress[dateStr]?.[ex.name]) {
                                          completedExercises++;
                                      }
                                  }
                             });
                         });
                     }
                 }
                 
                 const percentage = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
                 
                 return (
                     <div key={weekNum} className={`mb-6 rounded-lg border ${isCurrentWeek ? 'border-blue-200 bg-white shadow-md ring-1 ring-blue-100' : 'border-slate-200 bg-white shadow-sm'} overflow-hidden`}>
                         <div className={`px-4 py-3 border-b border-slate-100 ${isPhase2 ? 'bg-slate-50' : 'bg-white'}`}>
                             <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`font-bold uppercase tracking-wider ${isCurrentWeek ? 'text-blue-600' : 'text-slate-600'}`}>Week {weekNum}</span>
                                    {isPhase2 && <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded font-mono font-bold">PHASE 2</span>}
                                    {!isPhase2 && <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-mono font-bold">PHASE 1</span>}
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {weekStart.toLocaleDateString(undefined, {month:'short', day:'numeric'})} - {new Date(weekStart.getTime() + 6*msPerDay).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                </span>
                             </div>

                             {/* Weekly Progress Bar */}
                             <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ease-out ${percentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-mono text-slate-400 w-8 text-right">{percentage}%</span>
                             </div>
                         </div>
                         <div className="divide-y divide-slate-100">
                             {dayIndices.map((idx) => {
                                 const dayDate = new Date(weekStart);
                                 dayDate.setDate(dayDate.getDate() + idx);
                                 const dateStr = dayDate.toISOString().split('T')[0];
                                 const { workout, week: phaseWeek } = getWorkoutForDate(startDate, dayDate);
                                 const isToday = dayDate.toDateString() === today.toDateString();
                                 const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
                                 
                                 // Calculate Daily Stats
                                 let dailyTotal = 0;
                                 let dailyCompleted = 0;
                                 if (workout.type !== 'Rest') {
                                     workout.sections.forEach(section => {
                                         section.exercises.forEach(ex => {
                                              if (ex.weeks[phaseWeek]) {
                                                  dailyTotal++;
                                                  if (progress[dateStr]?.[ex.name]) {
                                                      dailyCompleted++;
                                                  }
                                              }
                                         });
                                     });
                                 }
                                 const dailyPct = dailyTotal > 0 ? Math.round((dailyCompleted / dailyTotal) * 100) : 0;
                                 const isDone = dailyTotal > 0 && dailyTotal === dailyCompleted;
                                 
                                 return (
                                     <div 
                                        key={idx} 
                                        onClick={() => onSelectDate(dayDate)}
                                        className={`p-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${isToday ? 'bg-blue-50' : ''}`}
                                     >
                                         <div className="w-12 text-center flex-shrink-0">
                                             <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{dayName}</div>
                                             <div className={`text-sm font-bold leading-none ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>{dayDate.getDate()}</div>
                                         </div>
                                         <div className="flex-1 min-w-0">
                                             <div className="flex justify-between items-start">
                                                <div className={`font-medium text-sm truncate pr-2 ${isDone ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{workout.title}</div>
                                                {isDone && <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />}
                                             </div>
                                             <div className="text-[10px] text-slate-500 mb-1.5 uppercase tracking-wide">{workout.type}</div>
                                             
                                             {/* Daily Progress Bar */}
                                             {dailyTotal > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1 w-16 bg-slate-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all ${dailyPct === 100 ? 'bg-emerald-500' : 'bg-blue-400'}`}
                                                            style={{ width: `${dailyPct}%` }}
                                                        />
                                                    </div>
                                                </div>
                                             )}
                                         </div>
                                         <ChevronRight className="h-4 w-4 text-slate-300 flex-shrink-0" />
                                     </div>
                                 );
                             })}
                         </div>
                     </div>
                 )
             })}
        </div>
    )
};

const App = () => {
  const [view, setView] = useState<'daily' | 'schedule' | 'settings'>('daily');
  
  const [startDate, setStartDate] = useState<Date>(() => {
      const stored = localStorage.getItem('tp_start_date');
      if (stored) return new Date(stored);
      
      // Default to Jan 21, 2026
      return new Date(2026, 0, 21);
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>(() => {
      const saved = localStorage.getItem('tp_workout_progress');
      if (!saved) return {};
      try {
          return JSON.parse(saved);
      } catch (e) {
          return {};
      }
  });

  useEffect(() => {
      localStorage.setItem('tp_start_date', startDate.toISOString());
  }, [startDate]);

  const handleDateSelect = (d: Date) => {
      setSelectedDate(d);
      setView('daily');
  };

  const handleToggleExercise = (exerciseName: string) => {
      const dateStr = selectedDate.toISOString().split('T')[0];
      
      setProgress(prev => {
          const dayProgress = prev[dateStr] || {};
          const isComplete = !!dayProgress[exerciseName]; 

          const newProgress = {
              ...prev,
              [dateStr]: {
                  ...dayProgress,
                  [exerciseName]: !isComplete
              }
          };
          
          localStorage.setItem('tp_workout_progress', JSON.stringify(newProgress));
          return newProgress;
      });
  };

  const dateStr = selectedDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Header title="Tactical Performance" currentView={view} setView={setView} />
      
      {view === 'daily' && (
        <>
          <DateSelector currentDate={selectedDate} onDateChange={setSelectedDate} />
          <WorkoutView 
            date={selectedDate} 
            startDate={startDate} 
            progress={progress[dateStr] || {}}
            onToggleExercise={handleToggleExercise}
          />
        </>
      )}

      {view === 'schedule' && (
          <ScheduleView 
            startDate={startDate} 
            onSelectDate={handleDateSelect} 
            progress={progress}
          />
      )}

      {view === 'settings' && (
          <SettingsView startDate={startDate} setStartDate={setStartDate} onClose={() => setView('daily')} />
      )}
    </div>
  );
};

export default App;