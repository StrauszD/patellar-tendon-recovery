<script lang="ts">
	import type { Exercise } from '$lib/data/exercises';

	let { exercise }: { exercise: Exercise } = $props();

	const frequencyClasses: Record<string, string> = {
		daily: 'freq-daily',
		'3x': 'freq-3x',
		'2x': 'freq-2x',
		run: 'freq-run'
	};
</script>

<div class="exercise">
	<div class="exercise-name">{exercise.name}</div>
	<div class="exercise-rx">{exercise.rx}</div>
	<p class="exercise-desc">{exercise.description}</p>
	<div class="frequency-tag {frequencyClasses[exercise.frequency]}">
		&#8635; {exercise.frequencyLabel}
	</div>
</div>

<style>
	.exercise {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1.25rem 1.5rem;
		transition: box-shadow 0.2s;
	}

	.exercise:hover {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
	}

	.exercise-name {
		font-weight: 700;
		font-size: 0.95rem;
		margin-bottom: 0.25rem;
	}

	.exercise-rx {
		display: inline-block;
		background: var(--bg);
		border-radius: 6px;
		padding: 0.2rem 0.6rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}

	.exercise-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.frequency-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-top: 0.6rem;
		padding: 0.2rem 0.55rem;
		border-radius: 5px;
	}

	.freq-daily {
		background: var(--yellow-soft);
		color: var(--yellow);
	}
	.freq-3x {
		background: var(--green-soft);
		color: var(--green);
	}
	.freq-2x {
		background: var(--blue-soft);
		color: var(--blue);
	}
	.freq-run {
		background: var(--purple-soft);
		color: var(--purple);
	}
</style>
