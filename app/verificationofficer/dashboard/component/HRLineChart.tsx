import React from 'react'
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
	labels: [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
	],
	datasets: [{
		// label: 'Monthly Data',
		data: [200, 600, 700, 700, 800, 200, 400, 300, 400, 200, 300, 400],
		fill: true,
		borderColor: '#002DB3',
		backgroundColor: '#002DB3',
		tension: 0
	}]
};

const options = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		y: {
			beginAtZero: true
		}
	}
};
const HRLineChart = () => {
	return (
		<div className='h-[315px] p-[10px] '>
			<Line data={data} options={options} />
		</div>
	)
}

export default HRLineChart
