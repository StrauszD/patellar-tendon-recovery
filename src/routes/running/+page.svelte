<script lang="ts">
	import PhaseSection from '$lib/components/PhaseSection.svelte';
	import { phases } from '$lib/data/exercises';

	const runPhase = phases.find(p => p.id === 'phase-run')!;
</script>

<svelte:head>
	<title>Running - Patellar Tendon Recovery</title>
</svelte:head>

<h1 class="page-title">Running Reintegration</h1>
<p class="page-subtitle">Runs parallel to strength phases 1 & 2 — not sequentially</p>

<PhaseSection phase={runPhase} />

<style>
	.page-title {
		font-family: 'DM Serif Display', serif;
		font-size: 1.6rem;
		font-weight: 400;
		margin-bottom: 0.35rem;
		color: var(--text);
	}

	.page-subtitle {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-bottom: 1.5rem;
		line-height: 1.5;
	}
</style>
