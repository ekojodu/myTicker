import { useState, useEffect } from 'react';
import { getDashboard } from '../api/dashboard.api';
import type { DashboardResponse } from '../types/dashboard.types';

export function useDashboard() {
	const [data, setData] = useState<DashboardResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getDashboard()
			.then(setData)
			.catch((err: Error) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	return { data, loading, error };
}
