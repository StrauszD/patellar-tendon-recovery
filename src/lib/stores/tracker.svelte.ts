export interface TrackerState {
	logs: Record<string, Record<string, Record<string, boolean>>>;
	unlockedPhases: string[];
	completedPhases: string[];
}

const DEFAULT_STATE: TrackerState = {
	logs: {},
	unlockedPhases: ['phase-1', 'phase-run'],
	completedPhases: []
};

const UNLOCK_CHAIN: Record<string, string> = {
	'phase-1': 'phase-2',
	'phase-2': 'phase-3'
};

const PREV_PHASE: Record<string, string> = {
	'phase-2': 'phase-1',
	'phase-3': 'phase-2'
};

let state = $state<TrackerState>(structuredClone(DEFAULT_STATE));
let loaded = $state(false);
let saveTimeout: ReturnType<typeof setTimeout> | undefined;

function todayStr(): string {
	return new Date().toISOString().slice(0, 10);
}

function useLocalStorage(): boolean {
	return typeof window !== 'undefined';
}

async function fetchState(): Promise<TrackerState | null> {
	try {
		const res = await fetch('/api/tracker');
		if (res.ok) {
			const data = await res.json();
			if (data && data.unlockedPhases) return data;
		}
	} catch {
		// API not available, fall through
	}
	return null;
}

async function persistState(): Promise<void> {
	try {
		await fetch('/api/tracker', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(state)
		});
	} catch {
		// Silently fail, localStorage is the fallback
	}
	if (useLocalStorage()) {
		localStorage.setItem('tracker-state', JSON.stringify(state));
	}
}

function debouncedSave(): void {
	if (saveTimeout) clearTimeout(saveTimeout);
	saveTimeout = setTimeout(() => persistState(), 500);
}

export async function loadTracker(): Promise<void> {
	if (loaded) return;

	// Try API first
	const remote = await fetchState();
	if (remote) {
		state = remote;
		loaded = true;
		return;
	}

	// Fall back to localStorage
	if (useLocalStorage()) {
		const stored = localStorage.getItem('tracker-state');
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				if (parsed && parsed.unlockedPhases) {
					state = parsed;
				}
			} catch {
				// Invalid JSON, use default
			}
		}
	}
	loaded = true;
}

export function saveTracker(): void {
	debouncedSave();
}

export function toggleExercise(phaseId: string, date: string, exerciseName: string): void {
	if (!state.logs[phaseId]) state.logs[phaseId] = {};
	if (!state.logs[phaseId][date]) state.logs[phaseId][date] = {};
	state.logs[phaseId][date][exerciseName] = !state.logs[phaseId][date][exerciseName];
	debouncedSave();
}

export function isExerciseDone(phaseId: string, date: string, exerciseName: string): boolean {
	return !!state.logs[phaseId]?.[date]?.[exerciseName];
}

export function getCompletedCount(phaseId: string, date: string, total: number): number {
	const dayLog = state.logs[phaseId]?.[date];
	if (!dayLog) return 0;
	return Object.values(dayLog).filter(Boolean).length;
}

export function markPhaseComplete(phaseId: string): void {
	if (!state.completedPhases.includes(phaseId)) {
		state.completedPhases = [...state.completedPhases, phaseId];
	}
	const next = UNLOCK_CHAIN[phaseId];
	if (next && !state.unlockedPhases.includes(next)) {
		state.unlockedPhases = [...state.unlockedPhases, next];
	}
	debouncedSave();
}

export function isPhaseUnlocked(phaseId: string): boolean {
	return state.unlockedPhases.includes(phaseId);
}

export function isPhaseCompleted(phaseId: string): boolean {
	return state.completedPhases.includes(phaseId);
}

export function getPrevPhaseName(phaseId: string): string | undefined {
	return PREV_PHASE[phaseId];
}

export function getTrackedDates(phaseId: string): string[] {
	const phaseLogs = state.logs[phaseId];
	if (!phaseLogs) return [];
	return Object.keys(phaseLogs).sort().reverse();
}

export function isLoaded(): boolean {
	return loaded;
}

export { todayStr };
