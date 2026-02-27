<script lang="ts">
	import { page } from '$app/stores';

	const tabs = [
		{ href: '/', label: 'Protocol' },
		{ href: '/running', label: 'Running' },
		{ href: '/tips', label: 'Tips' }
	];
</script>

<nav class="nav">
	{#each tabs as tab}
		<a
			href={tab.href}
			class="nav-tab"
			class:active={$page.url.pathname === tab.href}
		>
			{tab.label}
		</a>
	{/each}
</nav>

<style>
	.nav {
		display: flex;
		gap: 0.25rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 0.25rem;
		margin-bottom: 1.5rem;
	}

	.nav-tab {
		flex: 1;
		text-align: center;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--text-muted);
		text-decoration: none;
		transition: all 0.15s;
	}

	.nav-tab:hover {
		color: var(--text);
		background: var(--bg);
	}

	.nav-tab.active {
		background: var(--accent);
		color: white;
	}
</style>
