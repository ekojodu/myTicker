import type { ReactNode } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { downloadDashboardExcel } from '../../utils/exportExcel';

interface Props {
	children: ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
	return (
		<div className='min-h-screen bg-slate-50'>
			<header className='bg-slate-900 text-white px-6 py-4 text-lg font-semibold'>
				My Brokerage
			</header>
			<main className='p-6'>{children}</main>
			<button
				onClick={downloadDashboardExcel}
				className='bg-blue-600 text-white px-4 py-2 rounded-lg'
			>
				Export Excel
			</button>
			<LoadingSkeleton />
		</div>
	);
};
