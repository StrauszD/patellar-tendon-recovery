<script lang="ts">
	import PhaseSection from '$lib/components/PhaseSection.svelte';
	import { phases, principles } from '$lib/data/exercises';
</script>

<svelte:head>
	<title>Patellar Tendon Recovery Routine</title>
	<meta
		name="description"
		content="Post-fall rehab protocol for patellar tendon recovery with running reintegration"
	/>
</svelte:head>

<header class="header">
	<span class="header-badge">Updated · Tendon Protocol</span>
	<h1>Patellar Tendon<br />Recovery Routine</h1>
	<p class="subtitle">Post-fall rehab · Running reintegration included</p>
</header>

<div class="context-box">
	<strong>Current status:</strong> Near-full extension restored. Pain below the kneecap with strong
	quad contraction and eccentric loading (step-downs). Walking and stairs pain-free. Can run easy for
	~5 minutes without pain.
	<strong>Diagnosis: patellar tendon irritation from deconditioning + premature loading.</strong>
</div>

<div class="principles-box">
	<h3>Tendon Rehab Rules</h3>
	{#each principles as principle}
		<div class="principle">
			<span class="principle-icon">&rarr;</span>
			<span>{principle}</span>
		</div>
	{/each}
</div>

{#each phases.filter(p => p.id !== 'phase-run') as phase}
	<PhaseSection {phase} />
{/each}

<footer class="footer-note">
	<p>
		Patellar tendon protocol based on current evidence for tendon loading programs.<br />
		The running track runs parallel to the strength phases — not sequentially.<br />
		If below-knee pain worsens or doesn't improve within 2–3 weeks of this protocol, get evaluated
		by a sports medicine physician.<br />
		<strong>Progress by symptoms, not by calendar.</strong>
	</p>
</footer>

<style>
	.header {
		text-align: center;
		margin-bottom: 2.5rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid var(--border);
	}

	.header-badge {
		display: inline-block;
		background: var(--accent-soft);
		color: var(--accent);
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 0.35rem 0.9rem;
		border-radius: 100px;
		margin-bottom: 1rem;
	}

	h1 {
		font-family: 'DM Serif Display', serif;
		font-size: 2.2rem;
		font-weight: 400;
		line-height: 1.15;
		margin-bottom: 0.5rem;
		color: var(--text);
	}

	.subtitle {
		color: var(--text-muted);
		font-size: 0.95rem;
	}

	.context-box {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1.25rem 1.5rem;
		margin-bottom: 2.5rem;
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.7;
	}

	.principles-box {
		background: var(--yellow-soft);
		border: 1px solid #e8d9b0;
		border-radius: 12px;
		padding: 1.25rem 1.5rem;
		margin-bottom: 2.5rem;
		font-size: 0.85rem;
		line-height: 1.75;
	}

	.principles-box h3 {
		font-size: 0.9rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--text);
	}

	.principle {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.principle-icon {
		flex-shrink: 0;
		font-weight: 700;
		color: var(--yellow);
	}

	.footer-note {
		text-align: center;
		font-size: 0.78rem;
		color: var(--text-muted);
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
		line-height: 1.7;
	}

	@media (max-width: 500px) {
		h1 {
			font-size: 1.8rem;
		}
	}
</style>
