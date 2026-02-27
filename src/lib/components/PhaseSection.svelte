<script lang="ts">
	import type { Phase } from '$lib/data/exercises';
	import ExerciseCard from './ExerciseCard.svelte';
	import DailyTracker from './DailyTracker.svelte';
	import {
		isPhaseUnlocked,
		isPhaseCompleted,
		markPhaseComplete,
		getPrevPhaseName
	} from '$lib/stores/tracker.svelte';

	let { phase }: { phase: Phase } = $props();

	const unlocked = $derived(isPhaseUnlocked(phase.id));
	const completed = $derived(isPhaseCompleted(phase.id));
	const prevPhase = $derived(getPrevPhaseName(phase.id));
</script>

<section class="phase phase-{phase.id}" class:locked={!unlocked}>
	<div class="phase-header">
		<div class="phase-number">
			{#if !unlocked}
				<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
					<path d="M11.5 6V4.5a3.5 3.5 0 0 0-7 0V6H3v7.5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5V6h-1.5zm-5.5-.001V4.5a2 2 0 1 1 4 0V6H6z"/>
				</svg>
			{:else}
				{phase.number}
			{/if}
		</div>
		<div class="header-text">
			<div class="title-row">
				<h2 class="phase-title">{phase.title}</h2>
				{#if completed}
					<span class="completed-badge">Completed</span>
				{/if}
			</div>
			<div class="phase-meta">{phase.meta}</div>
		</div>
	</div>

	{#if !unlocked}
		<div class="locked-overlay">
			<div class="locked-exercises">
				{#each phase.exercises as exercise}
					<div class="locked-exercise-name">{exercise.name}</div>
				{/each}
			</div>
			<p class="unlock-message">Complete {prevPhase?.replace('phase-', 'Phase ') ?? 'previous phase'} to unlock</p>
		</div>
	{:else}
		<p class="phase-desc">{phase.description}</p>

		<DailyTracker phaseId={phase.id} exercises={phase.exercises} />

		<div class="exercise-list">
			{#each phase.exercises as exercise}
				<ExerciseCard {exercise} />
			{/each}

			{#if phase.warnings}
				{#each phase.warnings as warning}
					{#if warning.type === 'warning'}
						<div class="warning-box">{@html warning.text}</div>
					{:else}
						<div class="stop-box">{@html warning.text}</div>
					{/if}
				{/each}
			{/if}

			{#if phase.progressionNote}
				<div class="progression-marker">
					<span>&#10003;</span> {phase.progressionNote}
				</div>
			{/if}

			{#if !completed && phase.progressionNote}
				<button class="complete-btn" onclick={() => markPhaseComplete(phase.id)}>
					Mark Phase Complete
				</button>
			{/if}
		</div>
	{/if}
</section>

<style>
	.phase {
		margin-bottom: 2.5rem;
	}

	.phase.locked {
		opacity: 0.55;
	}

	.phase-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	.phase-number {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.85rem;
		flex-shrink: 0;
	}

	.phase-phase-1 .phase-number {
		background: var(--accent-soft);
		color: var(--accent);
	}
	.phase-phase-2 .phase-number {
		background: var(--blue-soft);
		color: var(--blue);
	}
	.phase-phase-3 .phase-number {
		background: var(--green-soft);
		color: var(--green);
	}
	.phase-phase-run .phase-number {
		background: var(--purple-soft);
		color: var(--purple);
	}

	.header-text {
		flex: 1;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.phase-title {
		font-family: 'DM Serif Display', serif;
		font-size: 1.35rem;
		font-weight: 400;
	}

	.completed-badge {
		display: inline-block;
		background: var(--green-soft);
		color: var(--green);
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 0.2rem 0.55rem;
		border-radius: 100px;
	}

	.phase-meta {
		font-size: 0.78rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 600;
	}

	.phase-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-bottom: 1rem;
		line-height: 1.65;
		padding-left: 0.25rem;
	}

	.exercise-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}

	.locked-overlay {
		padding: 0.5rem 0.25rem;
	}

	.locked-exercises {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin-bottom: 0.75rem;
	}

	.locked-exercise-name {
		font-size: 0.85rem;
		color: var(--text-muted);
		padding: 0.3rem 0;
	}

	.unlock-message {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		font-style: italic;
	}

	.warning-box {
		background: #fff8f0;
		border: 1px solid #f0d8b8;
		border-left: 4px solid var(--yellow);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		margin-top: 0.75rem;
		font-size: 0.82rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.stop-box {
		background: var(--accent-soft);
		border: 1px solid #e0bdb4;
		border-left: 4px solid var(--accent);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		margin-top: 0.75rem;
		font-size: 0.82rem;
		color: var(--text);
		line-height: 1.6;
	}

	.progression-marker {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--green-soft);
		border: 1px solid #c0dece;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--green);
	}

	.progression-marker span {
		font-size: 1rem;
	}

	.complete-btn {
		display: block;
		width: 100%;
		background: var(--green);
		color: white;
		border: none;
		border-radius: 8px;
		padding: 0.65rem 1rem;
		font-size: 0.82rem;
		font-weight: 600;
		cursor: pointer;
		margin-top: 0.5rem;
		font-family: inherit;
		transition: opacity 0.15s;
	}

	.complete-btn:hover {
		opacity: 0.9;
	}
</style>
