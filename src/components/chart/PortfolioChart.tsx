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
		<div className='bg-white rounded-xl shadow p-4'>
			<h2 className='text-lg font-semibold mb-4'>Strategy vs S&P 500</h2>

			<ResponsiveContainer width='100%' height={320}>
				<LineChart data={history}>
					<XAxis dataKey='date' />
					<YAxis />
					<Tooltip />
					<Legend />

					<Line
						type='monotone'
						dataKey='cumulative'
						stroke='2563eb'
						strokeWidth={2}
						name='Buffet + AI'
					/>
					<Line
						type='monotone'
						dataKey='cumulative_sp500'
						stroke='64748b'
						strokeWidth={2}
						name='S&P 500'
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
