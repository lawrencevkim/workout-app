import { DailyWorkoutPlan, WorkoutType } from './types';

// Helper to create consistent empty weeks
const createWeeks = (w1: any, w2: any, w3: any, w4: any) => ({ 1: w1, 2: w2, 3: w3, 4: w4 });

// --- Phase 1 Strength Data (Weeks 1-4) ---

export const P1_D1_Strength: DailyWorkoutPlan = {
  id: 'p1_d1',
  title: 'Phase 1: Strength Day 1 (Legs/Push)',
  type: 'Strength',
  sections: [
    {
      type: 'Warm Up',
      title: 'Dynamic Warm Up',
      exercises: [
        {
          name: 'WU1: DB Counterbalance Squat',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+counterbalance+squat',
          instructions: [
            'Hold a light dumbbell vertically in front of your chest with arms extended.',
            'Squat down by pushing hips back and bending knees.',
            'Keep your chest up and the weight extended to help balance.',
            'Drive through heels to return to standing.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' })
        },
        {
          name: 'WU2: Wall Slides',
          notes: 'Bodyweight',
          videoUrl: 'https://www.youtube.com/results?search_query=wall+slides+exercise',
          instructions: [
            'Stand with your back, buttocks, and head pressed firmly against a wall.',
            'Raise arms to a "W" position with elbows and wrists touching the wall.',
            'Slide arms up into a "Y" position, maintaining contact with the wall.',
            'Lower back to the start position. Do not let your lower back arch.'
          ],
          weeks: createWeeks({ sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' })
        }
      ]
    },
    {
      type: 'Strength',
      title: 'Primary Strength (1:30 min rest)',
      exercises: [
        {
          name: 'DB Front Squat (or Goblet)',
          notes: 'Hold 2 DBs on shoulders or 1 heavy DB at chest. Tempo: Control.',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+front+squat',
          instructions: [
            'Clean two dumbbells to your shoulders (resting on deltoids), elbows high.',
            'Alternatively, hold one heavy dumbbell vertically at chest height (Goblet style).',
            'Keep chest up and core braced.',
            'Squat down until thighs are at least parallel to the floor.',
            'Drive up through the floor to return to standing.'
          ],
          weeks: {
            1: { sets: '1', reps: '8 (wu)', intensity: 'Then 1-2x8' },
            2: { sets: '1', reps: '10 (wu)', intensity: 'Then 1x10, 1-2x8' },
            3: { sets: '1', reps: '12 (wu)', intensity: 'Then 1x10, 1-2x8+' },
            4: { sets: '1', reps: '12 (wu)', intensity: 'Then 1x10, 1-2x8+' }
          }
        },
        {
          name: 'Mobility: 1/2 kneeling hip flexor stretch',
          videoUrl: 'https://www.youtube.com/results?search_query=half+kneeling+hip+flexor+stretch',
          instructions: [
            'Kneel on one knee with the other foot flat on the floor in front (90/90 position).',
            'Tuck your pelvis under (posterior pelvic tilt) and squeeze the glute of the kneeling leg.',
            'Lean slightly forward until you feel a stretch in the front of the hip.',
            'Keep torso upright. Hold for time.'
          ],
          weeks: createWeeks({ sets: '-', reps: '-' }, { sets: '-', reps: '-' }, { sets: '-', reps: '-' }, { sets: '-', reps: '-' })
        },
        {
          name: 'DB Floor Press',
          notes: 'Alternative to Bench Press. ROM: Elbows touch floor.',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+floor+press',
          instructions: [
            'Lie on the floor with knees bent and feet flat.',
            'Hold dumbbells with elbows on the floor at a 45-degree angle from the body.',
            'Press the weights straight up over your chest.',
            'Lower slowly until triceps lightly graze the floor.',
            'Pause briefly on the floor before pressing again.'
          ],
          weeks: {
            1: { sets: '1', reps: '8', intensity: 'Then 1-2x8' },
            2: { sets: '1', reps: '10', intensity: 'Then 1x10, 1-2x8' },
            3: { sets: '1', reps: '12', intensity: 'Then 1x10, 1-2x8+' },
            4: { sets: '1', reps: '12', intensity: 'Then 1x10, 1-2x8+' }
          }
        }
      ]
    },
    {
      type: 'Superset',
      title: 'Superset (30s rest)',
      exercises: [
        {
          name: 'A1: DB RDL (Romanian Deadlift)',
          notes: 'Substitute for Good Morning. Feel hamstrings.',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+rdl',
          instructions: [
            'Hold dumbbells in front of your thighs, palms facing legs.',
            'Stand with feet hip-width apart and knees soft (slightly bent but rigid).',
            'Hinge at the hips, sending your butt back as far as possible.',
            'Lower weights towards shins, keeping them close to your legs.',
            'Stop when you feel a strong stretch in hamstrings and cannot go lower without rounding back.',
            'Squeeze glutes to return to standing.'
          ],
          weeks: {
            1: { sets: '1', reps: '8 (wu)', intensity: '1x8' },
            2: { sets: '1', reps: '8 (wu)', intensity: '2x8' },
            3: { sets: '3', reps: '8' },
            4: { sets: '3', reps: '8' }
          }
        },
        {
          name: 'A2: Pull Ups OR Heavy DB Rows',
          notes: 'Goal: Build dead hang strength. If no bar, do Heavy DB Rows.',
          videoUrl: 'https://www.youtube.com/results?search_query=pull+ups+progression',
          instructions: [
            'Pull Ups: Grip bar slightly wider than shoulders. Hang fully. Pull chest to bar. Lower all the way down.',
            'DB Rows: Place one knee and hand on a bench/support. Keep back flat. Pull dumbbell to hip pocket. Lower with control.'
          ],
          weeks: {
            1: { sets: '2', reps: 'Max or 12e' },
            2: { sets: '3', reps: 'Max or 12e' },
            3: { sets: '3', reps: 'Max or 12e' },
            4: { sets: '3', reps: 'Max or 12e' }
          }
        }
      ]
    },
    {
      type: 'Circuit',
      title: 'Circuit B (Minimal Rest)',
      exercises: [
        {
          name: 'B1: Farmers Walk',
          notes: 'Heaviest DBs you can hold.',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+farmers+walk',
          instructions: [
            'Hold a heavy dumbbell in each hand at your sides.',
            'Pull shoulders back and down, keeping chest up.',
            'Walk forward with short, quick steps.',
            'Maintain a strong core and do not let the weights swing.'
          ],
          weeks: createWeeks({ sets: '2', reps: '20m or 30s' }, { sets: '3', reps: '20m or 30s' }, { sets: '3', reps: '20m or 30s' }, { sets: '3', reps: '20m or 30s' })
        },
        {
          name: 'B2: Alt. Leg Lowers',
          videoUrl: 'https://www.youtube.com/results?search_query=alternating+leg+lowers',
          instructions: [
            'Lie on your back with both legs straight up in the air.',
            'Press your lower back into the floor (engage core).',
            'Lower one leg slowly towards the floor while keeping the other vertical.',
            'Stop just before your lower back arches off the floor.',
            'Return leg to top and switch sides.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8e' }, { sets: '3', reps: '8e' }, { sets: '3', reps: '12e' }, { sets: '3', reps: '12e' })
        },
        {
          name: 'B3: Front Plank',
          notes: 'Goal: Build to 3:29 hold.',
          videoUrl: 'https://www.youtube.com/results?search_query=front+plank+form',
          instructions: [
            'Start on elbows and toes. Elbows directly under shoulders.',
            'Create a straight line from head to heels.',
            'Squeeze your glutes and quads tight.',
            'Pull your belly button towards your spine.',
            'Breathe normally while maintaining tension.'
          ],
          weeks: createWeeks({ sets: '2', reps: '45s' }, { sets: '3', reps: '45s' }, { sets: '3', reps: '60s' }, { sets: '3', reps: '60s' })
        }
      ]
    }
  ]
};

export const P1_D2_Strength: DailyWorkoutPlan = {
  id: 'p1_d2',
  title: 'Phase 1: Strength Day 2 (Upper/Hinge)',
  type: 'Strength',
  sections: [
    {
      type: 'Warm Up',
      title: 'Dynamic Warm Up',
      exercises: [
        { 
          name: 'WU1: DB Squats', 
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+squat',
          instructions: [
            'Hold dumbbells at your sides or on shoulders.',
            'Feet shoulder-width apart.',
            'Squat down by pushing hips back and bending knees.',
            'Keep chest up. Stand back up.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' }) 
        },
        { 
          name: 'WU2: Wall Slides', 
          videoUrl: 'https://www.youtube.com/results?search_query=wall+slides+exercise',
          instructions: [
            'Back against wall, arms in "W" shape.',
            'Slide arms up to "Y" shape keeping contact with wall.',
            'Return to start.'
          ],
          weeks: createWeeks({ sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' }) 
        }
      ]
    },
    {
      type: 'Strength',
      title: 'Primary Strength',
      exercises: [
        {
          name: 'DB Floor Press',
          notes: 'Control the descent. Pause briefly on floor.',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+floor+press',
          instructions: [
            'Lie on floor with knees bent.',
            'Press dumbbells up from shoulders.',
            'Lower slowly until elbows lightly tap the floor.',
            'Press back up explosively.'
          ],
          weeks: {
            1: { sets: '1', reps: '12', intensity: '1-2x10' },
            2: { sets: '1', reps: '12', intensity: '1x10, 1-2x8' },
            3: { sets: '1', reps: '12', intensity: '1x10, 1-2x8+' },
            4: { sets: '1', reps: '12', intensity: '1x10, 1-2x8+' }
          }
        },
        {
          name: 'Mobility: Banded/DB Rear Delt Flys',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+rear+delt+fly',
          instructions: [
            'Stand with feet hip-width, holding light dumbbells.',
            'Hinge forward at the hips until torso is nearly parallel to floor.',
            'Maintain a flat back.',
            'Raise arms out to the sides with a slight bend in elbows.',
            'Squeeze upper back/rear delts at the top.'
          ],
          weeks: createWeeks({ sets: '-', reps: '-' }, { sets: '-', reps: '-' }, { sets: '-', reps: '-' }, { sets: '-', reps: '-' })
        },
        {
          name: 'DB Split Squat',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+split+squat',
          instructions: [
            'Stand in a staggered stance (one foot forward, one back).',
            'Hold dumbbells at sides.',
            'Lower your back knee straight down towards the floor.',
            'Keep front shin vertical and torso upright.',
            'Drive through the front heel to return to start.'
          ],
          weeks: {
            1: { sets: '1', reps: '8e (wu)', intensity: '1x8e' },
            2: { sets: '1', reps: '8e (wu)', intensity: '2x8e' },
            3: { sets: '3', reps: '10e' },
            4: { sets: '3', reps: '10e' }
          }
        }
      ]
    },
    {
      type: 'Superset',
      title: 'Superset (30s rest)',
      exercises: [
        {
          name: 'A1: DB Single Arm Row',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+single+arm+row',
          instructions: [
            'Place left knee and left hand on a bench.',
            'Keep back flat and parallel to the floor.',
            'Hold dumbbell in right hand.',
            'Pull the weight towards your hip pocket.',
            'Lower fully to feel a stretch in the lat.'
          ],
          weeks: {
            1: { sets: '1', reps: '10e', intensity: '2x8e' },
            2: { sets: '1', reps: '10e', intensity: '2x10e' },
            3: { sets: '1', reps: '10e', intensity: '2-3x12e' },
            4: { sets: '1', reps: '10e', intensity: '2-3x12e' }
          }
        },
        {
          name: 'A2: Push Ups',
          notes: 'Goal: 34 reps @ 80bpm. Strict form.',
          videoUrl: 'https://www.youtube.com/results?search_query=push+up+form',
          instructions: [
            'Start in a high plank position, hands under shoulders.',
            'Keep body in a straight line.',
            'Lower chest towards the floor until elbows are at 90 degrees.',
            'Push back up fully.',
            'Keep elbows tucked at 45 degrees, not flared out.'
          ],
          weeks: {
            1: { sets: '3', reps: '10-15+' },
            2: { sets: '1', reps: '15-20', intensity: '2x10-15+' },
            3: { sets: '3', reps: 'MAX' },
            4: { sets: '3', reps: 'MAX' }
          }
        }
      ]
    },
    {
      type: 'Circuit',
      title: 'Circuit B (Minimal Rest)',
      exercises: [
        { 
          name: 'B1: DB Bent Over Row', 
          notes: 'Substitute for Inverted Row. Dual arm.', 
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+bent+over+row',
          instructions: [
            'Hold a dumbbell in each hand.',
            'Hinge forward at hips (45-degree angle), back flat.',
            'Pull both dumbbells towards your hips.',
            'Squeeze shoulder blades together at the top.',
            'Lower with control.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8-12' }, { sets: '3', reps: '8-12' }, { sets: '3', reps: '8-12' }, { sets: '3', reps: '8-12' }) 
        },
        { 
          name: 'B2: Bird Dog', 
          videoUrl: 'https://www.youtube.com/results?search_query=bird+dog+exercise',
          instructions: [
            'Start on hands and knees (all fours).',
            'Extend opposite arm and leg simultaneously.',
            'Keep hips level and core engaged (anti-rotation).',
            'Return to center and switch sides.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8-12e' }, { sets: '2-3', reps: '8-12e' }, { sets: '3', reps: '8-12e' }, { sets: '3', reps: '8-12e' }) 
        },
        { 
          name: 'B3: Glute Bridge', 
          notes: 'Add DB on hips for weight.', 
          videoUrl: 'https://www.youtube.com/results?search_query=weighted+glute+bridge',
          instructions: [
            'Lie on back with knees bent, feet flat.',
            'Place a dumbbell on your hips (hold with hands).',
            'Drive through heels to lift hips.',
            'Squeeze glutes at the top (full extension).',
            'Lower slowly.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8-10' }, { sets: '2-3', reps: '8-10' }, { sets: '3', reps: '8-12' }, { sets: '3', reps: '8-12' }) 
        },
        { 
          name: 'B4: Burpees', 
          videoUrl: 'https://www.youtube.com/results?search_query=burpees',
          instructions: [
            'From standing, drop into a squat and place hands on floor.',
            'Jump feet back into a plank position.',
            'Perform a push-up (chest to floor) - optional based on fitness level.',
            'Jump feet back to hands.',
            'Jump vertically into the air with hands overhead.'
          ],
          weeks: createWeeks({ sets: '2', reps: '10' }, { sets: '2-3', reps: '12' }, { sets: '3', reps: '12' }, { sets: '3', reps: '12' }) 
        }
      ]
    }
  ]
};

export const P1_D3_Strength: DailyWorkoutPlan = {
  id: 'p1_d3',
  title: 'Phase 1: Strength Day 3 (Full Body)',
  type: 'Strength',
  sections: [
    {
      type: 'Warm Up',
      title: 'Dynamic Warm Up',
      exercises: [
        { 
          name: 'WU1: DB Squats', 
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+squat',
          instructions: [
            'Hold dumbbells at sides.',
            'Squat down, keeping chest up.',
            'Stand tall.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' }) 
        },
        { 
          name: 'WU2: Wall Slides', 
          videoUrl: 'https://www.youtube.com/results?search_query=wall+slides+exercise',
          instructions: [
            'Back against wall, W to Y arm movement.',
            'Keep points of contact with wall.'
          ],
          weeks: createWeeks({ sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' }) 
        }
      ]
    },
    {
      type: 'Strength',
      title: 'Primary Strength',
      exercises: [
        {
          name: 'Squat Jumps',
          notes: 'Land softly. Continuous movement.',
          videoUrl: 'https://www.youtube.com/results?search_query=squat+jumps',
          instructions: [
            'Stand with feet shoulder-width apart.',
            'Descend into a quarter/half squat.',
            'Explode vertically into a jump.',
            'Land softly with bent knees to absorb impact.',
            'Immediately transition into next rep.'
          ],
          weeks: createWeeks({ sets: '2', reps: '5' }, { sets: '3', reps: '5' }, { sets: '3', reps: '5' }, { sets: '3', reps: '5' })
        },
        {
          name: 'Goblet Squat',
          videoUrl: 'https://www.youtube.com/results?search_query=goblet+squat',
          instructions: [
            'Hold one dumbbell vertically against your chest, cupping the top head.',
            'Keep elbows tucked in.',
            'Squat down deep (elbows should pass inside knees).',
            'Keep torso upright throughout.',
            'Stand up.'
          ],
          weeks: {
            1: { sets: '1', reps: '12', intensity: '1-2x10' },
            2: { sets: '1', reps: '15', intensity: '1x12, 1-2x10' },
            3: { sets: '1', reps: '15', intensity: '1x12, 1-2x12' },
            4: { sets: '1', reps: '15', intensity: '1x12, 1-2x12+' }
          }
        },
        {
          name: 'DB Overhead Press (Standing)',
          videoUrl: 'https://www.youtube.com/results?search_query=standing+dumbbell+overhead+press',
          instructions: [
            'Stand with feet shoulder-width, holding dumbbells at shoulder height.',
            'Palms can face forward or neutral (facing ears).',
            'Brace core (pull ribs down) to prevent arching back.',
            'Press weights directly overhead until arms are locked out.',
            'Lower with control.'
          ],
          weeks: {
            1: { sets: '1', reps: '12', intensity: '1-2x10' },
            2: { sets: '1', reps: '15', intensity: '1x12, 1-2x10' },
            3: { sets: '1', reps: '15', intensity: '1x12, 1-2x12' },
            4: { sets: '1', reps: '15', intensity: '1x12, 1-2x12+' }
          }
        },
      ]
    },
    {
        type: 'Circuit',
        title: 'Conditioning Circuit (3-4 Rounds)',
        exercises: [
            { 
              name: 'DB Swing', 
              notes: 'Hold one DB head with both hands.',
              videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+swing',
              instructions: [
                'Hold one dumbbell by the head (vertical) with both hands.',
                'Stand with wide stance.',
                'Hinge at hips, hiking the weight back between legs.',
                'Explosively snap hips forward to stand tall.',
                'Allow momentum to float the weight to chest height. Do not use shoulders to lift.',
                'Let weight swing back down between legs.'
              ],
              weeks: createWeeks({ sets: '3', reps: '15' }, { sets: '3', reps: '20' }, { sets: '4', reps: '20' }, { sets: '4', reps: '25' }) 
            },
            { 
              name: 'Push Up', 
              videoUrl: 'https://www.youtube.com/results?search_query=push+up',
              instructions: [
                'Hands under shoulders, body straight.',
                'Chest to floor.',
                'Push up.'
              ],
              weeks: createWeeks({ sets: '3', reps: '10' }, { sets: '3', reps: '12' }, { sets: '4', reps: '15' }, { sets: '4', reps: 'MAX' }) 
            },
            { 
              name: 'Goblet Lunge', 
              videoUrl: 'https://www.youtube.com/results?search_query=goblet+lunge',
              instructions: [
                'Hold dumbbell at chest (Goblet hold).',
                'Step forward (or backward) into a lunge.',
                'Lower back knee gently to floor.',
                'Keep torso upright.',
                'Push back to start.'
              ],
              weeks: createWeeks({ sets: '3', reps: '8e' }, { sets: '3', reps: '10e' }, { sets: '4', reps: '10e' }, { sets: '4', reps: '12e' }) 
            }
        ]
    }
  ]
};

// --- Phase 2 Strength Data (Weeks 5-8) ---

export const P2_D1_Strength: DailyWorkoutPlan = {
  id: 'p2_d1',
  title: 'Phase 2: Strength Day 1 (Heavy Leg/Push)',
  type: 'Strength',
  sections: [
    {
      type: 'Warm Up',
      title: 'Dynamic Warm Up',
      exercises: [
        { 
          name: 'WU1: DB Squats', 
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+squat',
          instructions: ['Hold DBs, squat deep, stand tall.'],
          weeks: createWeeks({ sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' }, { sets: '2', reps: '8' }) 
        },
        { 
          name: 'WU2: Wall Slides', 
          videoUrl: 'https://www.youtube.com/results?search_query=wall+slides',
          instructions: ['Back on wall, slide arms up and down.'],
          weeks: createWeeks({ sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' }, { sets: '2', reps: '12' }) 
        }
      ]
    },
    {
      type: 'Strength',
      title: 'Primary Strength (Increased Intensity)',
      exercises: [
        {
          name: 'DB Front Squat',
          notes: 'Go heavy. Slow lowering (3s).',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+front+squat',
          instructions: [
            'Hold heavy dumbbells on shoulders.',
            'Lower into squat taking 3 seconds (1-2-3).',
            'Drive up quickly.'
          ],
          weeks: {
            1: { sets: '1', reps: '8 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' },
            2: { sets: '1', reps: '8 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' },
            3: { sets: '1', reps: '8 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' },
            4: { sets: '1', reps: '10 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' }
          }
        },
        {
          name: 'DB Floor Press',
          notes: 'Slow lowering (3s) + Pause.',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+floor+press',
          instructions: [
            'Lie on floor with dumbbells.',
            'Press up.',
            'Lower taking 3 seconds.',
            'Pause on floor for 1 second.',
            'Press up.'
          ],
          weeks: {
            1: { sets: '1', reps: '8 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' },
            2: { sets: '1', reps: '8 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' },
            3: { sets: '1', reps: '8 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' },
            4: { sets: '1', reps: '10 (wu)', intensity: '1x8 (Mod), 1x8 (Hvy)' }
          }
        }
      ]
    },
    {
      type: 'Superset',
      title: 'Superset',
      exercises: [
        {
          name: 'A1: DB RDL',
          notes: 'Tempo 2:1:1. Focus on stretch.',
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+rdl',
          instructions: [
            'Hinge at hips holding DBs.',
            'Take 2 seconds to lower.',
            'Pause 1 second at bottom (stretch).',
            'Return to top.'
          ],
          weeks: {
            1: { sets: '1', reps: '8', intensity: '1x8 (Hvy)' },
            2: { sets: '1', reps: '8', intensity: '1x8 (Hvy)' },
            3: { sets: '3', reps: '8', intensity: 'Heavy' },
            4: { sets: '3', reps: '8', intensity: 'Heavy' }
          }
        },
        {
          name: 'A2: Eccentric Pull Ups / Rows',
          notes: 'Slow 5s lowering. If no bar, Heavy DB Rows.',
          videoUrl: 'https://www.youtube.com/results?search_query=eccentric+pull+up',
          instructions: [
            'Pull Up: Jump to top, lower yourself as slowly as possible (5 count).',
            'Row: Perform heavy row, focusing on controlled negative phase.'
          ],
          weeks: createWeeks({ sets: '2', reps: 'Max' }, { sets: '3', reps: 'Max' }, { sets: '3', reps: 'Max' }, { sets: '3', reps: 'Max' })
        }
      ]
    },
    {
      type: 'Circuit',
      title: 'Conditioning Circuit',
      exercises: [
        {
          name: 'B1: Farmers Walk',
          videoUrl: 'https://www.youtube.com/results?search_query=farmers+walk',
          instructions: ['Heavy carry, chest up, no swinging.'],
          weeks: createWeeks({ sets: '2', reps: '20m/30s' }, { sets: '3', reps: '20m/30s' }, { sets: '3', reps: '20m/30s' }, { sets: '3', reps: '20m/30s' })
        },
        {
          name: 'B2: Dead Bug',
          videoUrl: 'https://www.youtube.com/results?search_query=dead+bug+exercise',
          instructions: [
            'Lie on back, arms and legs in air.',
            'Flatten lower back to floor.',
            'Extend opposite arm and leg slowly.',
            'Do not let back arch.',
            'Return and switch.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8e' }, { sets: '2', reps: '10e' }, { sets: '2', reps: '12e' }, { sets: '3', reps: '12e' })
        },
        {
          name: 'B3: Front Plank',
          notes: 'Increasing duration. Goal: 3:29.',
          videoUrl: 'https://www.youtube.com/results?search_query=plank',
          instructions: ['Standard plank hold. Keep hips level.'],
          weeks: createWeeks({ sets: '2', reps: '75s' }, { sets: '2', reps: '90s' }, { sets: '2', reps: '90s' }, { sets: '3', reps: '90s' })
        }
      ]
    }
  ]
};

export const P2_D2_Strength: DailyWorkoutPlan = {
  id: 'p2_d2',
  title: 'Phase 2: Strength Day 2 (Hypertrophy)',
  type: 'Strength',
  sections: [
    { 
      type: 'Warm Up', 
      title: 'Dynamic Warm Up', 
      exercises: [
        {
          name: 'WU1: DB Squats & Wall Slides', 
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+squat',
          instructions: ['Perform 8 DB Squats followed by 12 Wall Slides.'],
          weeks: createWeeks({sets:'2', reps:'8'},{sets:'2', reps:'8'},{sets:'2', reps:'8'},{sets:'2', reps:'8'})
        }
      ] 
    },
    {
      type: 'Strength',
      title: 'Supersets',
      exercises: [
        {
          name: 'A1: DB Single Arm Row',
          videoUrl: 'https://www.youtube.com/results?search_query=single+arm+row',
          instructions: ['Hand/knee on bench. Pull weight to hip.'],
          weeks: createWeeks({ sets: '1', reps: '10e' }, { sets: '1', reps: '10e' }, { sets: '1', reps: '10e' }, { sets: '1', reps: '10e' })
        },
        {
          name: 'A2: Push Ups',
          notes: 'Aim for high volume. Goal: 34+ continuous.',
          videoUrl: 'https://www.youtube.com/results?search_query=push+up',
          instructions: ['Strict form. Max reps possible.'],
          weeks: createWeeks({ sets: '3', reps: '10-15' }, { sets: '1', reps: '15-20' }, { sets: '1', reps: 'Max' }, { sets: '1', reps: 'Max' })
        }
      ]
    },
    {
      type: 'Circuit',
      title: 'Circuit (Minimal Rest)',
      exercises: [
        { 
          name: 'B1: DB Bent Over Row', 
          videoUrl: 'https://www.youtube.com/results?search_query=bent+over+row',
          instructions: ['Hinge at hips, back flat. Row both DBs to hips.'],
          weeks: createWeeks({ sets: '2', reps: '8-10' }, { sets: '3', reps: '8-10' }, { sets: '3', reps: '8-12' }, { sets: '3', reps: '8-12' }) 
        },
        { 
          name: 'B2: Bear Crawls', 
          videoUrl: 'https://www.youtube.com/results?search_query=bear+crawl', 
          instructions: [
            'Start on all fours, knees hovering 1 inch off floor.',
            'Move opposite hand and foot forward.',
            'Keep back flat like a table.',
            'Do not let hips sway.'
          ],
          weeks: createWeeks({ sets: '2', reps: '20m' }, { sets: '2-3', reps: '20m' }, { sets: '3', reps: '20m' }, { sets: '3', reps: '20m' }) 
        },
        { 
          name: 'B3: Weighted Glute Bridge', 
          videoUrl: 'https://www.youtube.com/results?search_query=weighted+glute+bridge',
          instructions: ['DB on hips. Drive heels, squeeze glutes.'],
          weeks: createWeeks({ sets: '2', reps: '8-10' }, { sets: '2-3', reps: '8-10' }, { sets: '3', reps: '8-12' }, { sets: '3', reps: '8-12' }) 
        },
        { 
          name: 'B4: Burpees', 
          videoUrl: 'https://www.youtube.com/results?search_query=burpees',
          instructions: ['Squat, plank, (pushup), jump forward, jump up.'],
          weeks: createWeeks({ sets: '2', reps: '10' }, { sets: '2-3', reps: '12' }, { sets: '3', reps: '12' }, { sets: '3', reps: '12' }) 
        }
      ]
    }
  ]
};

export const P2_D3_Strength: DailyWorkoutPlan = {
  id: 'p2_d3',
  title: 'Phase 2: Strength Day 3 (Power/Accessory)',
  type: 'Strength',
  sections: [
    { 
      type: 'Warm Up', 
      title: 'Warm Up', 
      exercises: [
        {
          name: 'WU: DB Squats & Wall Slides', 
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+squat',
          instructions: ['Perform 8 squats and 12 wall slides.'],
          weeks: createWeeks({sets:'2', reps:'8'},{sets:'2', reps:'8'},{sets:'2', reps:'8'},{sets:'2', reps:'8'})
        }
      ] 
    },
    {
      type: 'Strength',
      title: 'Primary Work',
      exercises: [
        { 
          name: 'Box Jumps or Squat Jumps', 
          videoUrl: 'https://www.youtube.com/results?search_query=box+jump',
          instructions: [
            'Box Jump: Stand before box, swing arms, jump soft onto box. Stand tall. Step down.',
            'Squat Jump: Squat and explode up. Land soft.'
          ],
          weeks: createWeeks({ sets: '2', reps: '8' }, { sets: '3', reps: '8' }, { sets: '1', reps: '8' }, { sets: '1', reps: '8' }) 
        },
        { 
          name: 'Goblet Squat (Pause)', 
          notes: 'Pause 3s at bottom.', 
          videoUrl: 'https://www.youtube.com/results?search_query=goblet+squat',
          instructions: ['Squat deep with DB at chest. Hold bottom position for 3 seconds. Drive up.'],
          weeks: createWeeks({ sets: '1', reps: '8' }, { sets: '1', reps: '8' }, { sets: '1', reps: '8' }, { sets: '1', reps: '10' }) 
        }
      ]
    },
    {
      type: 'Superset',
      title: 'Superset',
      exercises: [
        { 
          name: 'A1: Chin Ups (or DB Curl + Row)', 
          videoUrl: 'https://www.youtube.com/results?search_query=chin+up',
          instructions: [
            'Chin Up: Palms facing you. Pull chin over bar.',
            'Alternative: DB Curl (10 reps) immediately into DB Row (10 reps).'
          ],
          weeks: createWeeks({ sets: '2', reps: '4-6' }, { sets: '3', reps: '4-6' }, { sets: '3', reps: '5-8' }, { sets: '2', reps: 'Max' }) 
        },
        { 
          name: 'A2: DB RDL', 
          videoUrl: 'https://www.youtube.com/results?search_query=rdl',
          instructions: ['Hinge at hips, stretch hamstrings, back flat.'],
          weeks: createWeeks({ sets: '1', reps: '8' }, { sets: '1', reps: '8' }, { sets: '1', reps: '8' }, { sets: '1', reps: '8' }) 
        }
      ]
    },
    {
      type: 'Circuit',
      title: 'Circuit',
      exercises: [
        { 
          name: 'B1: Kneeling DB Shoulder Press', 
          videoUrl: 'https://www.youtube.com/results?search_query=kneeling+dumbbell+press',
          instructions: [
            'Kneel on both knees or tall kneeling.',
            'Brace core/glutes.',
            'Press DBs overhead. Do not arch back.'
          ],
          weeks: createWeeks({ sets: '2', reps: '10e' }, { sets: '3', reps: '10e' }, { sets: '3', reps: '12e' }, { sets: '3', reps: '12e' }) 
        },
        { 
          name: 'B2: Farmers Walk Single Arm', 
          videoUrl: 'https://www.youtube.com/results?search_query=suitcase+carry',
          instructions: [
            'Hold heavy DB in ONE hand only.',
            'Walk without leaning to the side.',
            'Switch hands and repeat.'
          ],
          weeks: createWeeks({ sets: '2', reps: '20m' }, { sets: '3', reps: '20m' }, { sets: '3', reps: '20m' }, { sets: '2', reps: '20m' }) 
        },
        { 
          name: 'B3: DB Rear Delt Flys', 
          notes: 'Sub for Face Pulls', 
          videoUrl: 'https://www.youtube.com/results?search_query=dumbbell+rear+delt+fly', 
          instructions: ['Bent over, back flat. Fly arms out to side engaging rear delts.'],
          weeks: createWeeks({ sets: '2', reps: '12' }, { sets: '3', reps: '12' }, { sets: '3', reps: '12' }, { sets: '2', reps: '12' }) 
        }
      ]
    }
  ]
};


// --- Conditioning / Run Data (Placeholders for Structure) ---

export const P1_Conditioning_A: DailyWorkoutPlan = {
  id: 'p1_cond_a',
  title: 'Conditioning A (Run)',
  type: 'Run',
  sections: [
    {
      type: 'Warm Up',
      title: 'Run Warm Up',
      exercises: [
        { 
          name: 'Light Jog', 
          notes: '5-10 Minutes', 
          instructions: ['Jog at a conversational pace to warm up body temp.'],
          weeks: createWeeks({},{},{},{}) 
        }
      ]
    },
    {
      type: 'Strength',
      title: 'Intervals',
      exercises: [
        {
            name: '400m Repeats',
            notes: 'Rest 1:1 ratio',
            videoUrl: 'https://www.youtube.com/results?search_query=track+intervals+400m',
            instructions: [
              'Run 400m (1 lap of track) at a hard, sustainable pace (approx 80-90% effort).',
              'Rest for the exact amount of time it took you to run the lap.',
              'Repeat for prescribed sets.',
              'Try to keep all laps within 5 seconds of each other.'
            ],
            weeks: {
                1: { sets: '4', reps: '400m' },
                2: { sets: '5', reps: '400m' },
                3: { sets: '6', reps: '400m' },
                4: { sets: '6', reps: '400m (Faster pace)' }
            }
        }
      ]
    }
  ]
};

export const P1_Conditioning_B: DailyWorkoutPlan = {
    id: 'p1_cond_b',
    title: 'Conditioning B (Shuttle/Sprints)',
    type: 'Run',
    sections: [
        { type: 'Warm Up', title: 'Dynamic Warm Up', exercises: [] },
        { 
            type: 'Circuit', 
            title: 'Sprints',
            exercises: [
                { 
                  name: '25m Shuttle Run', 
                  videoUrl: 'https://www.youtube.com/results?search_query=shuttle+run+drills',
                  instructions: [
                    'Mark a 25m distance.',
                    'Sprint to the line, touch with foot/hand.',
                    'Turn and sprint back.',
                    'One rep = down and back (50m total) or as specified.',
                    '4 laps = 25m, back, 25m, back (100m total).'
                  ],
                  weeks: createWeeks({sets: '6', reps: '4 laps'}, {sets: '8', reps: '4 laps'}, {sets: '10', reps: '4 laps'}, {sets: '10', reps: '4 laps'}) 
                }
            ]
        }
    ]
};

export const Rest_Day: DailyWorkoutPlan = {
    id: 'rest',
    title: 'Rest & Recovery',
    type: 'Rest',
    sections: [
        {
            type: 'Optional',
            title: 'Active Recovery',
            exercises: [
                { 
                  name: 'Light Walk, Stretch, or Yoga', 
                  instructions: ['Perform low intensity movement to promote blood flow without fatigue.'],
                  weeks: createWeeks({sets: '1', reps: '30m'}, {sets: '1', reps: '30m'}, {sets: '1', reps: '30m'}, {sets: '1', reps: '30m'})
                }
            ]
        }
    ]
}

// --- Schedule Helper ---

export const getWorkoutForDate = (startDate: Date, currentDate: Date): { workout: DailyWorkoutPlan, week: number, dayNum: number } => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor((currentDate.getTime() - startDate.getTime()) / msPerDay);
    
    // Program is 8 weeks long (Phase 1 + Phase 2)
    const totalDays = dayDiff; 
    if (totalDays < 0) return { workout: Rest_Day, week: 1, dayNum: 1 };

    const weekNum = Math.floor(totalDays / 7) + 1;
    const dayOfWeek = totalDays % 7; // 0 = Day 1, 6 = Day 7

    // Logic: 
    // Week 1-4: Phase 1
    // Week 5-8: Phase 2
    
    // Cap at Week 8
    const effectiveWeek = weekNum > 8 ? 8 : weekNum;
    
    // Phase 1 or 2 logic
    const isPhase2 = effectiveWeek > 4;
    const phaseWeek = isPhase2 ? effectiveWeek - 4 : effectiveWeek;

    let workout: DailyWorkoutPlan;
    
    // Phase 1 Schedule
    if (!isPhase2) {
        switch (dayOfWeek) {
            case 0: workout = P1_D1_Strength; break;
            case 1: workout = P1_Conditioning_A; break;
            case 2: workout = P1_D2_Strength; break;
            case 3: workout = P1_Conditioning_B; break;
            case 4: workout = P1_D3_Strength; break;
            default: workout = Rest_Day; break;
        }
    } 
    // Phase 2 Schedule
    else {
        switch (dayOfWeek) {
            case 0: workout = P2_D1_Strength; break;
            case 1: workout = P1_Conditioning_A; break; // Use same running structure for now or duplicate if needed
            case 2: workout = P2_D2_Strength; break;
            case 3: workout = P1_Conditioning_B; break;
            case 4: workout = P2_D3_Strength; break;
            default: workout = Rest_Day; break;
        }
    }

    return { workout, week: phaseWeek, dayNum: dayOfWeek + 1 };
};