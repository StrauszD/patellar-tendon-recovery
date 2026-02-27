<script lang="ts">
	import type { Tip } from '$lib/data/exercises';

	let { tips }: { tips: Tip[] } = $props();
</script>

<section class="tips-section">
	<h2>Tendon Recovery Tips</h2>
	<div class="tip-grid">
		{#each tips as tip}
			<div class="tip-card">
				<h4>{tip.title}</h4>
				<p>{tip.text}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	h2 {
		font-family: 'DM Serif Display', serif;
		font-size: 1.35rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}

	.tip-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	@media (max-width: 500px) {
		.tip-grid {
			grid-template-columns: 1fr;
		}
	}

	.tip-card {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 1rem 1.15rem;
	}

	.tip-card h4 {
		font-size: 0.82rem;
		font-weight: 700;
		margin-bottom: 0.3rem;
	}

	.tip-card p {
		font-size: 0.78rem;
		color: var(--text-muted);
		line-height: 1.55;
	}
</style>
