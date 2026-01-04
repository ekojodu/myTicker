import type { FuturePick } from '../../types/dashboard.types';

interface Props {
	picks: FuturePick[];
}

export function FuturePickTable({ picks }: Props) {
	return (
		<div className='bg-white rounded-xl shadow p-4'>
			<h2 className='text-lg font-semibold mb-4'>Future Top 10 Picks</h2>

			<table className='w-full border-collapse'>
				<thead>
					<tr className='text-left text-sm text-slate-500 border-b'>
						<th>Ticker</th>
						<th>PEG</th>
						<th>ROE</th>
						<th>D/E</th>
						<th>Margin</th>
						<th>Score</th>
					</tr>
				</thead>

				<tbody>
					{picks.map((p) => (
						<tr key={p.ticker} className='border-b last:border-0'>
							<td>{p.peg.toFixed(2)}</td>
							<td>{(p.roe * 100).toFixed(1)}%</td>
							<td>{p.debt_to_equity.toFixed(2)}</td>
							<td>{(p.profit_margin * 100).toFixed(1)}%</td>

							<td className='font-mono'>{p.score.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
