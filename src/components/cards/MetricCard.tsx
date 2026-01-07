interface Props {
	label: string;
	value: string | number;
}

export const MetricCard = ({ label, value }: Props) => {
	return (
		<div className='bg-white rounded-xl border border-slate-200 shadow-sm p-4'>
			<p className='text-sm text-slate-500 tracking-wide'>{label}</p>
			<p className='mt-1 text-2xl font-semibold text-slate-900'>{value}</p>
		</div>
	);
};
