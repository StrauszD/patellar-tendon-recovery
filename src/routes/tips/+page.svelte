<script lang="ts">
	import TipGrid from '$lib/components/TipGrid.svelte';
	import WeekPlan from '$lib/components/WeekPlan.svelte';
	import { tips, sampleWeek } from '$lib/data/exercises';
</script>

<svelte:head>
	<title>Tips - Patellar Tendon Recovery</title>
</svelte:head>

<h1 class="page-title">Recovery Tips & Schedule</h1>

<WeekPlan schedule={sampleWeek} />

<div class="section-divider"></div>

<TipGrid {tips} />

<style>
	.page-title {
		font-family: 'DM Serif Display', serif;
		font-size: 1.6rem;
		font-weight: 400;
		margin-bottom: 1.5rem;
		color: var(--text);
	}

	.section-divider {
		height: 1px;
		background: var(--border);
		margin: 2rem 0;
	}
</style>
