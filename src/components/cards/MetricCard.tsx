interface Props {
	label: string;
	value: string | number;
}

export const MetricCard = ({ label, value }: Props) => {
	return (
		<div className='bg-white rounded-xl shadow p-4'>
			<p className='text-sm text-slate-500'>{label}</p>
			<p className='text-2xl font-bold mt-1'>{value}</p>
		</div>
	);
};
