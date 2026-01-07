import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from 'recharts';
import type { PortfolioHistoryItem } from '../../types/dashboard.types';

interface Props {
	history: PortfolioHistoryItem[];
}

export function PortfolioChart({ history }: Props) {
	return (
		<div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
			<h2 className='text-lg font-semibold mb-4 text-slate-900'>
				Strategy vs S&P 500
			</h2>

			<ResponsiveContainer width='100%' height={320}>
				<LineChart data={history}>
					<XAxis
						dataKey='date'
						tick={{ fontSize: 12, fill: '#475569' }}
						tickLine={false}
					/>
					<YAxis
						tick={{ fontSize: 12, fill: '#475569' }}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: '#ffffff',
							borderRadius: '8px',
							borderColor: '#e2e8f0',
						}}
						labelStyle={{ fontWeight: 500 }}
					/>
					<Legend wrapperStyle={{ fontSize: 12, color: '#475569' }} />

					<Line
						type='monotone'
						dataKey='cumulative'
						stroke='#2563eb' // blue for your strategy
						strokeWidth={2}
						name='Buffett + AI'
						dot={false}
					/>
					<Line
						type='monotone'
						dataKey='cumulative_sp500'
						stroke='#64748b' // gray-blue for S&P 500
						strokeWidth={2}
						name='S&P 500'
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
