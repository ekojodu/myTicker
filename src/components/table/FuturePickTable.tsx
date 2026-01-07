import type { FuturePick } from '../../types/dashboard.types';

interface Props {
	picks: FuturePick[];
}

export function FuturePickTable({ picks }: Props) {
	return (
		<div className='bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-slate-200 overflow-hidden'>
			<div className='bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4'>
				<h2 className='text-xl font-bold text-white'>Future Top 10 Picks</h2>
			</div>

			<table className='w-full'>
				<thead>
					<tr className='text-left text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-700'>
						<th className='py-2 px-3'>Ticker</th>
						<th className='py-2 px-3'>PEG</th>
						<th className='py-2 px-3'>ROE</th>
						<th className='py-2 px-3'>D/E</th>
						<th className='py-2 px-3'>Margin</th>
						<th className='py-2 px-3'>Score</th>
					</tr>
				</thead>

				<tbody>
					{picks.map((p, i) => (
						<tr
							key={p.ticker}
							className={`border-b border-slate-200 ${
								i % 2 === 0 ? 'bg-slate-50' : ''
							}`}
						>
							<td className='py-2 px-3 font-medium text-slate-900'>
								{p.ticker}
							</td>
							<td className='py-2 px-3'>{p.peg.toFixed(2)}</td>
							<td
								className={`py-2 px-3 ${
									p.roe >= 0.15
										? 'text-emerald-600 font-semibold'
										: 'text-red-600'
								}`}
							>
								{(p.roe * 100).toFixed(1)}%
							</td>
							<td className='py-2 px-3'>{p.debt_to_equity.toFixed(2)}</td>
							<td
								className={`py-2 px-3 ${
									p.profit_margin >= 0.2
										? 'text-emerald-600 font-semibold'
										: 'text-red-600'
								}`}
							>
								{(p.profit_margin * 100).toFixed(1)}%
							</td>
							<td className='py-2 px-3 font-mono'>{p.score.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
