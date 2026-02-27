<script lang="ts">
	import type { Snippet } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { loadTracker } from '$lib/stores/tracker.svelte';
	import { onMount } from 'svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		loadTracker();
	});
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Nav />
{@render children()}

<style>
	:global(:root) {
		--bg: #f6f2ed;
		--card: #ffffff;
		--accent: #c44b2b;
		--accent-soft: #f3ddd6;
		--text: #2a2218;
		--text-muted: #7a7060;
		--border: #e6dfd6;
		--green: #3a7d5c;
		--green-soft: #dff0e6;
		--blue: #3a5e7d;
		--blue-soft: #dce8f0;
		--yellow: #b89030;
		--yellow-soft: #f5ecd4;
		--purple: #6b4e8a;
		--purple-soft: #ece4f2;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'DM Sans', sans-serif;
		background: var(--bg);
		color: var(--text);
		line-height: 1.6;
		padding: 2rem 1.25rem;
		max-width: 720px;
		margin: 0 auto;
	}
</style>
