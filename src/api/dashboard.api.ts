import type { DashboardResponse } from '../types/dashboard.types';

const BASE_URL = import.meta.env.NEXT_PUBLIC_API_BASE_URL;

export async function getDashboard():
Promise<DashboardResponse> {
	const res = await fetch (`${BASE_URL}/dashboard`);
	if(!res.ok){
		throw new Error('Failed to fetch dashboard');
	}
	return res.json();
}

export async function exportDashboard(): Promise<Blob>{
	const res = await fetch(`${BASE_URL}/export`);
	if(!res.ok){
		throw new Error('Failed to export dashboard');
	}
	return res.blob();
}
