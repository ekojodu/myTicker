import { useDashboard } from '../hooks/useDashboard';
import { MetricCard } from '../components/cards/MetricCard';
import { PortfolioChart } from '../components/chart/PortfolioChart';
import { FuturePickTable } from '../components/table/FuturePickTable';

export function Dashboard() {
	const { data, loading, error } = useDashboard();
	if (loading) return <p>Loading...</p>;
	if (error || !data) return <p>Error loading dashboard</p>;

	const latest = data.history[data.history.length - 1];

	return (
		<div className='space-y-6'>
			<div className='grid grid-cols-1  md:grid-cols-4 gap-4'>
				<MetricCard label='Strategy Value' value={latest.cumulative} />
				<MetricCard label='S&P 500' value={latest.cumulative_sp500 ?? 0} />
				<MetricCard label='Top Pick' value={data.future_pick[0]?.ticker} />
				<MetricCard label='Picks Counts' value={data.future_pick.length} />
			</div>

			<PortfolioChart history={data.history} />
			<FuturePickTable picks={data.future_pick} />
		</div>
	);
}
