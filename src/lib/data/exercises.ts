export type Frequency = 'daily' | '3x' | '2x' | 'run';

export interface Exercise {
	name: string;
	rx: string;
	description: string;
	frequency: Frequency;
	frequencyLabel: string;
}

export interface Phase {
	id: string;
	number: string;
	title: string;
	meta: string;
	description: string;
	exercises: Exercise[];
	progressionNote?: string;
	warnings?: Array<{ type: 'warning' | 'stop'; text: string }>;
}

export interface DaySchedule {
	day: string;
	activities: Array<{ label: string; tag: string }>;
}

export interface Tip {
	title: string;
	text: string;
}

export const principles = [
	'Tendons adapt to load, not rest. Progressive loading is the treatment.',
	'Pain up to 3–4/10 during exercise is acceptable. Check how it feels the next morning.',
	"If worse the next morning, you did too much. If same or better, you're on track.",
	'No deep quad stretches or kneeling — these compress the tendon.',
	'Slow and heavy beats fast and light for tendon adaptation.'
];

export const phases: Phase[] = [
	{
		id: 'phase-1',
		number: '1',
		title: 'Isometric Loading',
		meta: 'Start now · 1–2 weeks',
		description:
			'Isometrics are the foundation of tendon rehab. They load the tendon without the dynamic stress that\'s currently painful, and have a proven analgesic (pain-reducing) effect on irritable tendons. Do these daily.',
		exercises: [
			{
				name: 'Wall Sit Isometric Hold',
				rx: '5 × 45 sec holds · 1 min rest between sets',
				description:
					'Lean against a wall with knees at about 60° (not too deep). This is the single most important exercise in the protocol. The sustained hold loads the patellar tendon at a moderate length with no dynamic component. If 60° is comfortable, progress to 70–80° over time. You should feel your quads working but the below-knee pain should stay ≤ 3/10.',
				frequency: 'daily',
				frequencyLabel: 'Daily'
			},
			{
				name: 'Short-Arc Quad Extensions',
				rx: '3 × 12 reps · 3 sec hold at top · slow lower',
				description:
					'Sit on the floor or bed with a rolled towel or foam roller under your knee. Straighten only the last 30° of knee extension, hold, then lower slowly (3 sec). This isolates terminal extension with low tendon load — building the exact quad activation pattern that\'s currently painful, but at a fraction of the force. Progress by adding a light ankle weight (1–2 lbs) when bodyweight becomes easy.',
				frequency: 'daily',
				frequencyLabel: 'Daily'
			},
			{
				name: 'Straight Leg Raises',
				rx: '3 × 12 each leg · 3 sec hold at top',
				description:
					'Lie on your back, bend the uninvolved knee for support. Lock the quad on the injured leg and lift ~12 inches. This strengthens the quad and hip flexors with minimal patellar tendon stress because the knee stays straight throughout. Builds the quad volume you lost during weeks off.',
				frequency: 'daily',
				frequencyLabel: 'Daily'
			},
			{
				name: 'Glute Bridges',
				rx: '3 × 15 reps · 3 sec squeeze at top',
				description:
					'Lie on your back, feet flat, drive hips up. Rebuilds the posterior chain (glutes, hamstrings) that supports knee function during running. No patellar tendon stress, purely supplemental. Progress to single-leg bridges when bilateral feels easy.',
				frequency: 'daily',
				frequencyLabel: 'Daily'
			}
		],
		warnings: [
			{
				type: 'warning',
				text: '<strong>Pain monitoring:</strong> Mild discomfort below the knee during wall sits is expected and acceptable. The key metric is the next morning — if the tendon is no worse than baseline, you\'re dosing correctly.'
			}
		],
		progressionNote:
			'Progress to Phase 2 when: wall sits at 60–70° are pain-free and short-arc extensions with light weight are comfortable'
	},
	{
		id: 'phase-2',
		number: '2',
		title: 'Slow Eccentric Loading',
		meta: 'When Phase 1 is pain-free · 2–3 weeks',
		description:
			'Eccentric loading (controlling the lowering phase) is the gold standard for tendon rehabilitation. Slow eccentrics stimulate tendon remodeling and build load tolerance. Every rep should be deliberate — speed is the enemy here.',
		exercises: [
			{
				name: 'Decline Single-Leg Squat (Eccentric Focus)',
				rx: '3 × 15 reps · 3 sec down · use both legs to stand back up',
				description:
					"Stand on a 25° decline board or wedge (a thick book or slant board works). Lower on the injured leg over 3 seconds to about 60° knee bend, then use both legs to return to standing. The decline angle increases patellar tendon loading specifically. If you don't have a decline surface, do these on flat ground initially — still very effective. This is the most evidence-backed exercise for patellar tendinopathy.",
				frequency: '3x',
				frequencyLabel: 'Every other day'
			},
			{
				name: 'Step-Ups (Low Step, Slow Tempo)',
				rx: '3 × 10 each leg · 2 sec up, 3 sec down',
				description:
					"Start with a 4–6 inch step. Drive through the heel of the injured leg to step up (concentric), then control the descent slowly (eccentric). The slow lowering phase is the money — that's where tendon adaptation happens. Only progress step height when the current height is pain-free.",
				frequency: '3x',
				frequencyLabel: 'Every other day'
			},
			{
				name: 'Single-Leg Balance',
				rx: '3 × 30 sec each side',
				description:
					"Stand on the injured leg with a slight knee bend (not locked). Restores proprioception and neuromuscular control. Progress by closing your eyes, then by standing on a pillow or cushion. Quick wins — you'll feel this improve fast.",
				frequency: 'daily',
				frequencyLabel: 'Daily'
			},
			{
				name: 'Continue: Wall Sits + Glute Bridges',
				rx: 'Maintain Phase 1 dosing',
				description:
					'Keep wall sits as a warm-up before eccentric work — they prime the tendon. Maintain glute bridges for posterior chain development.',
				frequency: 'daily',
				frequencyLabel: 'Daily'
			}
		],
		warnings: [
			{
				type: 'stop',
				text: '<strong>Step-downs:</strong> Do not attempt step-downs until slow step-ups on a 6-inch step are pain-free. Step-downs at your current stage are too aggressive for the tendon. They\'ll come back in Phase 3.'
			}
		],
		progressionNote:
			'Progress to Phase 3 when: decline squats and step-ups are ≤ 2/10 pain and the tendon feels no worse the next morning'
	},
	{
		id: 'phase-run',
		number: 'R',
		title: 'Running Reintegration',
		meta: 'Runs parallel to phases 1 & 2',
		description:
			"Since you can already run 5 minutes pain-free, we'll build on that in parallel with the strength work — not sequentially. Running provides its own tendon loading stimulus. The key is conservative progression and never increasing more than one variable at a time.",
		exercises: [
			{
				name: 'Week 1: Establish Baseline',
				rx: '3 runs · 5 min easy running each',
				description:
					'Confirm your 5-minute tolerance is repeatable across multiple sessions. Keep it Zone 2 pace. Run on flat, even surfaces. Monitor tendon response for 24 hours after each run. If 5 minutes is consistently pain-free across 3 runs, progress.',
				frequency: 'run',
				frequencyLabel: 'Mon · Wed · Fri'
			},
			{
				name: 'Week 2: Build Duration',
				rx: '3 runs · 8–10 min easy running',
				description:
					'Add 3–5 minutes per run. Still easy pace, still flat terrain. The jump from 5 to 10 minutes is meaningful for the tendon — watch for any delayed soreness below the kneecap the morning after. If it appears, stay at the current duration for another week before progressing.',
				frequency: 'run',
				frequencyLabel: 'Mon · Wed · Fri'
			},
			{
				name: 'Week 3: Continue Building',
				rx: '3 runs · 12–15 min easy',
				description:
					'Continue adding 3–5 minutes per run if the tendon is responding well. By the end of this week you\'re targeting 15 continuous minutes. At this point you can start to introduce gentle hills if flat running is fully comfortable.',
				frequency: 'run',
				frequencyLabel: 'Mon · Wed · Fri'
			},
			{
				name: 'Week 4+: Return to Training',
				rx: 'Progress toward 20–30 min runs',
				description:
					"Once you're at 15+ minutes pain-free, continue building toward your pre-injury volume. Add no more than 10–15% weekly mileage. Reintroduce your Zone 2 heart rate training. No speed work or tempo runs until you're back to 30+ minutes comfortably. Maintain the Phase 2 strength work on non-run days — this is now your long-term prehab routine.",
				frequency: 'run',
				frequencyLabel: '3–4× per week'
			}
		],
		warnings: [
			{
				type: 'warning',
				text: "<strong>Running + strength timing:</strong> Don't do heavy eccentric work (decline squats, step-ups) and running on the same day. Separate them to give the tendon adequate recovery between loading sessions. Isometrics (wall sits, quad sets) are fine on run days as warm-up."
			}
		]
	},
	{
		id: 'phase-3',
		number: '3',
		title: 'Return to Full Loading',
		meta: 'When running 20+ min & Phase 2 strength pain-free',
		description:
			'This phase reintroduces the higher-demand exercises and transitions from rehab into ongoing maintenance. The tendon should be tolerating progressive load well by this point.',
		exercises: [
			{
				name: 'Step-Downs (Slow Eccentric)',
				rx: '3 × 10 each leg · 4 sec lowering phase',
				description:
					"Now you're ready. Start with a 4-inch step. Stand on the edge, slowly lower the opposite foot to the ground over 4 seconds, then push back up. The key difference from your earlier attempt: your tendon has been progressively loaded through Phases 1–2 and can now handle this demand. Progress step height gradually.",
				frequency: '3x',
				frequencyLabel: 'Every other day'
			},
			{
				name: 'Bodyweight Squats (Full Range)',
				rx: '3 × 15 reps · controlled tempo',
				description:
					'Full depth squats through complete range of motion. If these are comfortable, you can progress to weighted squats (goblet squat with dumbbell). This is the foundation of long-term knee resilience for running.',
				frequency: '3x',
				frequencyLabel: '2–3× per week'
			},
			{
				name: 'Lateral Band Walks',
				rx: '3 × 15 steps each direction',
				description:
					'Place a resistance band above knees or around ankles. Walk sideways maintaining tension. Targets the hip abductors (glute med) which are critical for single-leg stability during running and often weak in runners returning from injury.',
				frequency: '3x',
				frequencyLabel: '2–3× per week'
			},
			{
				name: 'Speed Work Reintroduction',
				rx: 'After 2+ weeks of 30 min pain-free running',
				description:
					'Start with strides (6–8 × 20 sec at slightly faster than easy pace with full recovery). No interval work or tempo runs until strides are comfortable. When ready, reintroduce your structured heart rate zone training. The tendon needs to adapt to higher-speed loading progressively.',
				frequency: 'run',
				frequencyLabel: '1× per week initially'
			}
		]
	}
];

export const sampleWeek: DaySchedule[] = [
	{
		day: 'Mon',
		activities: [
			{ label: 'Easy Run 5 min', tag: 'run' },
			{ label: 'Wall Sits', tag: 'isometric' },
			{ label: 'SLR + Glute Bridges', tag: 'isometric' }
		]
	},
	{
		day: 'Tue',
		activities: [
			{ label: 'Wall Sits', tag: 'isometric' },
			{ label: 'Short-Arc Extensions', tag: 'isometric' },
			{ label: 'SLR + Glute Bridges', tag: 'isometric' }
		]
	},
	{
		day: 'Wed',
		activities: [
			{ label: 'Easy Run 5 min', tag: 'run' },
			{ label: 'Wall Sits', tag: 'isometric' },
			{ label: 'SLR + Glute Bridges', tag: 'isometric' }
		]
	},
	{
		day: 'Thu',
		activities: [
			{ label: 'Wall Sits', tag: 'isometric' },
			{ label: 'Short-Arc Extensions', tag: 'isometric' },
			{ label: 'SLR + Glute Bridges', tag: 'isometric' }
		]
	},
	{
		day: 'Fri',
		activities: [
			{ label: 'Easy Run 5 min', tag: 'run' },
			{ label: 'Wall Sits', tag: 'isometric' },
			{ label: 'SLR + Glute Bridges', tag: 'isometric' }
		]
	},
	{
		day: 'Sat',
		activities: [
			{ label: 'Full Isometric Session', tag: 'isometric' },
			{ label: 'Balance Work', tag: 'mobility' }
		]
	},
	{
		day: 'Sun',
		activities: [{ label: 'Rest · Walk Only', tag: 'rest' }]
	}
];

export const tips: Tip[] = [
	{
		title: 'No Deep Stretching',
		text: 'Avoid deep quad stretches, kneeling, or sitting on your heels. These compress the patellar tendon against the kneecap and irritate it. Gentle hamstring stretches are fine.'
	},
	{
		title: 'Ice Strategically',
		text: "Ice for 15 min after running or heavy exercise sessions if the tendon feels warm or irritated. Don't ice before exercise — blood flow helps tendon adaptation."
	},
	{
		title: 'Diclofenac Timing',
		text: 'Continue applying before exercise if it helps with comfort. Some evidence suggests long-term NSAID use may slow tendon healing, so taper off as symptoms improve.'
	},
	{
		title: 'Protein & Collagen',
		text: 'Tendon repair is protein-intensive. Maintain 1.6–2g/kg daily. Consider 15g collagen peptides + vitamin C 30–60 min before rehab sessions to support tendon synthesis.'
	},
	{
		title: 'Warm Up First',
		text: '5 min walking + wall sit holds before any running or eccentric work. Tendons are stiffer when cold and more prone to irritation without adequate warm-up.'
	},
	{
		title: 'Patience with Tendons',
		text: "Muscle recovers in weeks. Tendons take 6–12 weeks to remodel. Don't chase pain-free — chase progressive loading tolerance. Small, consistent tendon stimulus beats aggressive catch-up."
	}
];
