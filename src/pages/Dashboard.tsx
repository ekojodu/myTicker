import { useDashboard } from '../hooks/useDashboard';
import { MetricCard } from '../components/cards/MetricCard';
import { PortfolioChart } from '../components/chart/PortfolioChart';
import { FuturePickTable } from '../components/table/FuturePickTable';

export function Dashboard() {
  const { data, loading, error } = useDashboard();
  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading dashboard</p>;

  // Safely get latest history
  const latest = data.history?.length > 0 ? data.history[data.history.length - 1] : null;

  // Safely get future picks
  const futurePicks = data.future_picks ?? [];

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <MetricCard label='Strategy Value' value={latest?.cumulative ?? 0} />
        <MetricCard label='S&P 500' value={latest?.cumulative_sp500 ?? 0} />
        <MetricCard label='Top Pick' value={futurePicks[0]?.ticker ?? 'N/A'} />
        <MetricCard label='Picks Counts' value={futurePicks.length} />
      </div>

      <PortfolioChart history={data.history ?? []} />
      <FuturePickTable picks={futurePicks} />
    </div>
  );
}
