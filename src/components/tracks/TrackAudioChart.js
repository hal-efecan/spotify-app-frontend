import React from 'react'
import {Bar } from 'react-chartjs-2';
import './styles/audioChart.scss';

function MyChart({ audioFeatures, data }) {

    return (

        <div className='audioChartCanvas' >
            
            <Bar
                audioFeatures={audioFeatures}
                data={data}
                options={{
                    legend: {
                        display: false,
                        labels: {
                            fontColor: 'white'
                        },
                        // maintainAspectRatio: false,
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            gridLines: {
                                display: true,
                                color: 'grey'
                            },
                            scaleLabel: {
                            display: true,
                            labelString: 'Audio Features',
                            fontFamily: 'ubuntu',
                            fontSize: 13,
                            fontColor: 'white'
                            },
                            ticks: {
                                beginAtZero: true,
                                fontFamily: 'ubuntu',
                                fontSize: 11,
                                fontColor: 'white'
                            },
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                            display: true,
                            color: 'grey'
                            },
                            ticks: {
                                beginAtZero: true,
                                fontFamily: 'ubuntu',
                                fontSize: 12,
                                fontColor: 'white'
                            },
                    }]}
                }}
            />
        </div>
    )
}

export default MyChart