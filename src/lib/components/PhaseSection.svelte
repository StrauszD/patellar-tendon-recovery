<script lang="ts">
	import type { Phase } from '$lib/data/exercises';
	import ExerciseCard from './ExerciseCard.svelte';

	let { phase }: { phase: Phase } = $props();
</script>

<section class="phase phase-{phase.id}">
	<div class="phase-header">
		<div class="phase-number">{phase.number}</div>
		<div>
			<h2 class="phase-title">{phase.title}</h2>
			<div class="phase-meta">{phase.meta}</div>
		</div>
	</div>
	<p class="phase-desc">{phase.description}</p>

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
	</div>
</section>

<style>
	.phase {
		margin-bottom: 2.5rem;
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

	.phase-title {
		font-family: 'DM Serif Display', serif;
		font-size: 1.35rem;
		font-weight: 400;
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
</style>
