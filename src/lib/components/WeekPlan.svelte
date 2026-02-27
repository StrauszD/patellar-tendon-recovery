<script lang="ts">
	import type { DaySchedule } from '$lib/data/exercises';

	let { schedule }: { schedule: DaySchedule[] } = $props();

	const tagClasses: Record<string, string> = {
		isometric: 'tag-isometric',
		strength: 'tag-strength',
		run: 'tag-run',
		rest: 'tag-rest',
		mobility: 'tag-mobility'
	};
</script>

<div class="week-plan">
	<div class="week-plan-header">Sample Week (Phase 1 + Early Running)</div>
	{#each schedule as day}
		<div class="week-row">
			<div class="day-label">{day.day}</div>
			<div class="day-activities">
				{#each day.activities as activity}
					<span class="day-tag {tagClasses[activity.tag]}">{activity.label}</span>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.week-plan {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 12px;
		overflow: hidden;
		margin-bottom: 2.5rem;
	}

	.week-plan-header {
		background: var(--bg);
		padding: 0.85rem 1.25rem;
		font-family: 'DM Serif Display', serif;
		font-size: 1.1rem;
		font-weight: 400;
		border-bottom: 1px solid var(--border);
	}

	.week-row {
		display: flex;
		align-items: center;
		padding: 0.7rem 1.25rem;
		border-bottom: 1px solid var(--border);
		font-size: 0.82rem;
		gap: 0.75rem;
	}

	.week-row:last-child {
		border-bottom: none;
	}

	.day-label {
		width: 36px;
		font-weight: 700;
		color: var(--text-muted);
		flex-shrink: 0;
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	.day-activities {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.day-tag {
		padding: 0.2rem 0.6rem;
		border-radius: 5px;
		font-size: 0.72rem;
		font-weight: 600;
	}

	.tag-isometric {
		background: var(--accent-soft);
		color: var(--accent);
	}
	.tag-strength {
		background: var(--blue-soft);
		color: var(--blue);
	}
	.tag-run {
		background: var(--purple-soft);
		color: var(--purple);
	}
	.tag-rest {
		background: var(--bg);
		color: var(--text-muted);
	}
	.tag-mobility {
		background: var(--green-soft);
		color: var(--green);
	}
</style>
