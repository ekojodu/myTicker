import { saveAs } from 'file-saver';
import { exportDashboard } from '../api/dashboard.api';

export async function downloadDashboardExcel() {
	const blob = await exportDashboard();
	saveAs(blob, 'buffett_ai_dashboard.xlsx');
}
