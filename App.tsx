import React, { useState, useEffect } from 'react';
import { getWorkoutForDate } from './data';
import { DailyWorkoutPlan, WorkoutSection, Exercise, ExerciseSet } from './types';
import { 
  Calendar, CheckCircle, ChevronLeft, ChevronRight, Info, 
  Trophy, Dumbbell, Timer, LayoutDashboard, CalendarDays, 
  ChevronDown, ChevronUp, AlertCircle, Video, Settings,
  List, Clock, XCircle, ArrowLeft, Check, Square, CheckSquare
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
           <button onClick={() => setView('schedule')} className="mr-2 p-1 -ml-1 rounded hover:bg-slate-800">
             <ArrowLeft className="h-6 w-6 text-slate-300 hover:text-white" />
           </button>
        ) : (
          <Dumbbell className="h-6 w-6 text-blue-400" />
        )}
        <h1 className="text-xl font-bold tracking-tight hidden sm:block">{title}</h1>
        <h1 className="text-xl font-bold tracking-tight sm:hidden">Tactical Fit</h1>
      </div>
      <div className="flex bg-slate-800 rounded-lg p-1">
        <button
          onClick={() => setView('schedule')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentView === 'schedule' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">Schedule</span>
        </button>
        <button
          onClick={() => setView('settings')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentView === 'settings' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
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
    <div className="bg-white p-4 shadow-sm border-b border-slate-200 flex items-center justify-between sticky top-[64px] z-20 h-[72px]">
      <button onClick={handlePrev} className="p-2 hover:bg-slate-100 rounded-full">
        <ChevronLeft className="h-6 w-6 text-slate-600" />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {currentDate.toLocaleDateString(undefined, { weekday: 'long' })}
        </span>
        <span className="text-lg font-bold text-slate-900">
          {currentDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
        </span>
      </div>
      <button onClick={handleNext} className="p-2 hover:bg-slate-100 rounded-full">
        <ChevronRight className="h-6 w-6 text-slate-600" />
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
    <div className={`rounded-xl shadow-sm border overflow-hidden mb-4 transition-all duration-300 ${
        isComplete ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'
    }`}>
      <div 
        className="p-4 flex gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
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
                    flex items-center justify-center h-8 w-8 rounded-lg border-2 transition-all duration-200
                    ${isComplete 
                        ? 'bg-green-500 border-green-500 text-white shadow-sm' 
                        : 'bg-white border-slate-300 text-slate-300 hover:border-blue-400'
                    }
                `}
                aria-label={`Mark ${exercise.name} as complete`}
            >
                {isComplete && <Check className="h-5 w-5" />}
            </button>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
              <h3 className={`font-bold text-lg leading-tight ${isComplete ? 'text-green-800' : 'text-slate-900'}`}>
                  {exercise.name}
              </h3>
          </div>
          <div className="flex gap-2 mt-2 text-sm text-slate-600 flex-wrap">
             <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold border border-slate-200">{prescription.sets} Sets</span>
             <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold border border-slate-200">{prescription.reps} Reps</span>
             {prescription.intensity && <span className="font-medium text-blue-600 px-1 py-0.5">{prescription.intensity}</span>}
          </div>
        </div>

        {/* Expand/Collapse Icon */}
        <div className="flex items-center h-full pt-1">
          {isOpen ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
        </div>
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-slate-100 bg-slate-50/50 pt-4 pl-[60px]">
          {exercise.notes && (
            <div className="mb-4 text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100 flex gap-2 items-start">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
              <span>{exercise.notes}</span>
            </div>
          )}
          
          {exercise.instructions && (
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Instructions</h4>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {exercise.instructions.map((inst, idx) => (
                  <div key={idx} className="relative flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold z-10">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{inst}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exercise.commonMistakes && (
            <div className="mt-4 bg-rose-50 rounded-lg p-4 border border-rose-100">
               <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                 <AlertCircle className="h-4 w-4" /> Common Mistakes
               </h4>
               <ul className="space-y-2">
                {exercise.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-rose-800">
                    <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-rose-400" />
                    <span className="leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {exercise.videoUrl && (
            <div className="mt-4 pt-3 border-t border-slate-200">
              <a 
                href={exercise.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 p-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all border border-slate-200 shadow-sm"
              >
                <Video className="h-4 w-4" />
                Watch Demonstration
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ProgressBar = ({ completed, total }: { completed: number, total: number }) => {
    const percentage = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
    
    return (
        <div className="sticky top-[136px] z-10 bg-slate-50/95 backdrop-blur-sm pb-4 pt-2 border-b border-slate-200/60 mb-6">
             <div className="flex justify-between items-end mb-1.5 px-1">
                 <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Session Progress</span>
                 </div>
                 <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{Math.round(percentage)}%</span>
                    <span className="text-xs text-slate-500 ml-1">({completed}/{total} Exercises)</span>
                 </div>
             </div>
             <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-green-500 shadow-sm transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                 />
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
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 p-8 text-center">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <Clock className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Rest Day</h2>
        <p className="max-w-xs">Take it easy today. Active recovery or complete rest.</p>
        {workout.sections.map((section, idx) => (
            <div key={idx} className="mt-8 text-left w-full max-w-sm bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2">{section.title}</h3>
                {section.exercises.map((ex, i) => (
                    <div key={i} className="text-slate-600 text-sm py-1 border-b border-slate-100 last:border-0">
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
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-2">
            <span>Week {week}</span>
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
            <span>{workout.type}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{workout.title}</h2>
      </div>

      <ProgressBar completed={completedExercises} total={totalExercises} />

      <div className="space-y-8">
        {workout.sections.map((section, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-4">
               {section.type === 'Warm Up' && <Timer className="h-5 w-5 text-orange-500" />}
               {section.type === 'Strength' && <Dumbbell className="h-5 w-5 text-blue-500" />}
               {section.type === 'Superset' && <List className="h-5 w-5 text-purple-500" />}
               {section.type === 'Circuit' && <Timer className="h-5 w-5 text-red-500" />}
               <h3 className="text-lg font-bold text-slate-800">{section.title || section.type}</h3>
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

  const handleSave = () => {
    setStartDate(new Date(tempDate));
    onClose();
  };

  const handleResetProgress = () => {
      if(confirm("Are you sure you want to reset all workout progress? This cannot be undone.")) {
          localStorage.removeItem('tp_workout_progress');
          window.location.reload();
      }
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Settings</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Program Start Date</label>
        <p className="text-sm text-slate-500 mb-4">Select the Monday when you started Phase 1.</p>
        <input 
          type="date" 
          value={tempDate}
          onChange={(e) => setTempDate(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <div className="mt-8 flex gap-3">
          <button 
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-2">Data Management</h3>
          <button 
            onClick={handleResetProgress}
            className="w-full py-3 border border-rose-200 text-rose-600 rounded-lg font-bold hover:bg-rose-50 transition-colors"
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
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const msPerDay = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor((today.getTime() - startDate.getTime()) / msPerDay);
    const currentProgramWeek = Math.floor(dayDiff / 7) + 1;

    return (
        <div className="p-4 max-w-3xl mx-auto pb-20">
             <h2 className="text-2xl font-bold text-slate-900 mb-4">Program Schedule (8 Weeks)</h2>
             
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
                     <div key={weekNum} className={`mb-6 rounded-xl border ${isCurrentWeek ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 bg-white'} overflow-hidden`}>
                         <div className={`px-4 py-3 border-b border-slate-100 ${isPhase2 ? 'bg-slate-100' : 'bg-slate-50'}`}>
                             <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-700">Week {weekNum}</span>
                                    {isPhase2 && <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Phase 2</span>}
                                    {!isPhase2 && <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">Phase 1</span>}
                                </div>
                                <span className="text-xs text-slate-500">
                                    {weekStart.toLocaleDateString(undefined, {month:'short', day:'numeric'})} - {new Date(weekStart.getTime() + 6*msPerDay).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                </span>
                             </div>

                             {/* Weekly Progress Bar */}
                             <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300/50">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ease-out ${percentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-slate-500 w-8 text-right">{percentage}%</span>
                             </div>
                         </div>
                         <div className="divide-y divide-slate-100">
                             {days.map((dayName, idx) => {
                                 const dayDate = new Date(weekStart);
                                 dayDate.setDate(dayDate.getDate() + idx);
                                 const dateStr = dayDate.toISOString().split('T')[0];
                                 const { workout, week: phaseWeek } = getWorkoutForDate(startDate, dayDate);
                                 const isToday = dayDate.toDateString() === today.toDateString();
                                 
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
                                        className={`p-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer ${isToday ? 'bg-blue-50' : ''}`}
                                     >
                                         <div className="w-12 text-center flex-shrink-0">
                                             <div className="text-xs font-bold text-slate-400 mb-0.5">{dayName}</div>
                                             <div className={`text-sm font-bold leading-none ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>{dayDate.getDate()}</div>
                                             <div className="text-[10px] font-medium text-slate-400 mt-0.5">{dayDate.toLocaleDateString(undefined, {month:'short'})}</div>
                                         </div>
                                         <div className="flex-1 min-w-0">
                                             <div className="flex justify-between items-start">
                                                <div className="font-medium text-slate-900 text-sm truncate pr-2">{workout.title}</div>
                                                {isDone && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                                             </div>
                                             <div className="text-xs text-slate-500 mb-1.5">{workout.type}</div>
                                             
                                             {/* Daily Progress Bar */}
                                             {dailyTotal > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all ${dailyPct === 100 ? 'bg-green-500' : 'bg-blue-400'}`}
                                                            style={{ width: `${dailyPct}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 font-medium">{dailyPct}%</span>
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
      
      const d = new Date();
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(d.setDate(diff));
      return monday;
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Store structure: { "YYYY-MM-DD": { "Exercise Name": true } }
  // Changed from boolean[] to boolean for single checkbox tracking
  const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>(() => {
      const saved = localStorage.getItem('tp_workout_progress');
      if (!saved) return {};
      try {
          // Add safe parse or migration if needed, for now just simple parse
          // If old data exists (arrays), this might behave unexpectedly if not cleared,
          // but React is robust enough to not crash usually.
          // Ideally, we could check the shape here.
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
          const isComplete = !!dayProgress[exerciseName]; // Force boolean

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
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