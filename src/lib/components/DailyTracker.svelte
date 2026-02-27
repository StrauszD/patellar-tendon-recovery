<script lang="ts">
	import type { Exercise } from '$lib/data/exercises';
	import {
		toggleExercise,
		isExerciseDone,
		getCompletedCount,
		todayStr,
		getTrackedDates
	} from '$lib/stores/tracker.svelte';

	let { phaseId, exercises }: { phaseId: string; exercises: Exercise[] } = $props();

	let selectedDate = $state(todayStr());
	let showHistory = $state(false);

	const isToday = $derived(selectedDate === todayStr());

	const completedCount = $derived(getCompletedCount(phaseId, selectedDate, exercises.length));

	const trackedDates = $derived(getTrackedDates(phaseId));
	const pastDates = $derived(trackedDates.filter((d) => d !== todayStr()));

	function prevDay() {
		const d = new Date(selectedDate);
		d.setDate(d.getDate() - 1);
		selectedDate = d.toISOString().slice(0, 10);
	}

	function nextDay() {
		const d = new Date(selectedDate);
		d.setDate(d.getDate() + 1);
		const today = todayStr();
		const next = d.toISOString().slice(0, 10);
		if (next <= today) selectedDate = next;
	}

	function goToday() {
		selectedDate = todayStr();
	}

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr + 'T12:00:00');
		return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
	}
</script>

<div class="tracker">
	<div class="tracker-header">
		<div class="date-nav">
			<button class="nav-btn" onclick={prevDay} aria-label="Previous day">&larr;</button>
			<span class="date-label">{formatDate(selectedDate)}</span>
			<button
				class="nav-btn"
				onclick={nextDay}
				disabled={isToday}
				aria-label="Next day">&rarr;</button
			>
			{#if !isToday}
				<button class="today-btn" onclick={goToday}>Today</button>
			{/if}
		</div>
		<div class="progress-summary">
			{completedCount}/{exercises.length} completed
		</div>
	</div>

	<div class="exercise-checks">
		{#each exercises as exercise}
			{@const done = isExerciseDone(phaseId, selectedDate, exercise.name)}
			<label class="check-row" class:readonly={!isToday} class:checked={done}>
				<span class="checkbox" class:checked={done}>
					{#if done}
						<svg viewBox="0 0 16 16" fill="none">
							<path d="M4 8l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					{/if}
				</span>
				<span class="check-label">{exercise.name}</span>
				{#if isToday}
					<input
						type="checkbox"
						checked={done}
						onchange={() => toggleExercise(phaseId, selectedDate, exercise.name)}
						class="sr-only"
					/>
				{/if}
			</label>
		{/each}
	</div>

	{#if pastDates.length > 0}
		<details class="history" bind:open={showHistory}>
			<summary>History ({pastDates.length} day{pastDates.length !== 1 ? 's' : ''})</summary>
			<div class="history-list">
				{#each pastDates as date}
					{@const count = getCompletedCount(phaseId, date, exercises.length)}
					<button class="history-row" onclick={() => (selectedDate = date)}>
						<span>{formatDate(date)}</span>
						<span class="history-count">{count}/{exercises.length}</span>
					</button>
				{/each}
			</div>
		</details>
	{/if}
</div>

<style>
	.tracker {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 1rem;
		margin-top: 0.75rem;
	}

	.tracker-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.date-nav {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.nav-btn {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 6px;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 0.8rem;
		color: var(--text);
	}

	.nav-btn:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.date-label {
		font-size: 0.82rem;
		font-weight: 600;
		min-width: 100px;
		text-align: center;
	}

	.today-btn {
		background: var(--accent);
		color: white;
		border: none;
		border-radius: 100px;
		padding: 0.2rem 0.6rem;
		font-size: 0.7rem;
		font-weight: 600;
		cursor: pointer;
	}

	.progress-summary {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
	}

	.exercise-checks {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.check-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.15s;
		font-size: 0.82rem;
	}

	.check-row:hover {
		background: var(--card);
	}

	.check-row.readonly {
		cursor: default;
		opacity: 0.7;
	}

	.check-row.checked .check-label {
		text-decoration: line-through;
		color: var(--text-muted);
	}

	.checkbox {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.15s;
	}

	.checkbox.checked {
		background: var(--green);
		border-color: var(--green);
		color: white;
	}

	.checkbox svg {
		width: 12px;
		height: 12px;
	}

	.check-label {
		flex: 1;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	.history {
		margin-top: 0.75rem;
		border-top: 1px solid var(--border);
		padding-top: 0.5rem;
	}

	.history summary {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
		cursor: pointer;
		padding: 0.25rem 0;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		margin-top: 0.4rem;
	}

	.history-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: none;
		border: none;
		padding: 0.3rem 0.5rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.75rem;
		color: var(--text);
		font-family: inherit;
	}

	.history-row:hover {
		background: var(--card);
	}

	.history-count {
		font-weight: 600;
		color: var(--text-muted);
	}
</style>
