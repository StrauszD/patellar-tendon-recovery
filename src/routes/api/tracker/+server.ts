import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const BLOB_PATH = 'tracker-state.json';

// In-memory fallback for dev when Vercel Blob is not configured
let memoryStore: string | null = null;

function hasBlobToken(): boolean {
	return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export const GET: RequestHandler = async () => {
	if (hasBlobToken()) {
		const { list } = await import('@vercel/blob');
		const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
		if (blobs.length > 0) {
			const res = await fetch(blobs[0].url);
			if (res.ok) {
				const data = await res.json();
				return json(data);
			}
		}
		return json(null);
	}

	// Fallback: in-memory store
	if (memoryStore) {
		return json(JSON.parse(memoryStore));
	}
	return json(null);
};

export const PUT: RequestHandler = async ({ request }) => {
	const body = await request.json();

	if (hasBlobToken()) {
		const { put } = await import('@vercel/blob');
		await put(BLOB_PATH, JSON.stringify(body), {
			access: 'public',
			addRandomSuffix: false
		});
		return json({ ok: true });
	}

	// Fallback: in-memory store
	memoryStore = JSON.stringify(body);
	return json({ ok: true });
};
