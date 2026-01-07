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
						stroke='#4f46e5' // indigo-600
						strokeWidth={3}
						name='Buffett + AI'
						dot={false}
						fillOpacity={0.1}
						fill='url(#colorStrategy)' // add gradient fill
					/>
					<Line
						type='monotone'
						dataKey='cumulative_sp500'
						stroke='#94a3b8' // slate-400
						strokeWidth={3}
						name='S&P 500'
						dot={false}
					/>
					// Add this inside LineChart for gradient fill
					<defs>
						<linearGradient id='colorStrategy' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#4f46e5' stopOpacity={0.4} />
							<stop offset='95%' stopColor='#4f46e5' stopOpacity={0} />
						</linearGradient>
					</defs>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
