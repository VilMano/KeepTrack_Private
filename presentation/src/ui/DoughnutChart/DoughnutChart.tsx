import { Chart } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import './DoughnutChart.css'
import { useEffect } from 'react';

interface Props {
    chartData: any[];
}

export const DoughnutChart = (props: Props) => {

    useEffect(()=>{
        const ctx = document.getElementById('doughnut')!;

        // const chart = new Chart(ctx, {
        //     type: 'line',
        //     data: {
        //         labels: [
        //             'Red',
        //             'Blue',
        //             'Yellow'
        //         ],
        //         datasets: [{
        //             label: 'By category',
        //             data: [300, 50, 100],
        //             backgroundColor: [
        //                 'rgb(255, 99, 132)',
        //                 'rgb(54, 162, 235)',
        //                 'rgb(255, 205, 86)'
        //             ]
        //         }]
        //     },
        //     options: {
        //         borderColor: 'rgba(0, 0, 0, 0)',
        //     }
        // });
    }, [])



    const label = (
        <>
            <div className="total-price">
                <label>478.09€</label>
                <p>Total of June</p>
            </div>
        </>
    );

    return (
        <>
            <div style={{ padding: "0 1rem" }} className="container">
                {label}
                <div className="chart">
                    <canvas id='doughnut'></canvas>
                </div>
            </div>
        </>);
}