"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({accounts}: DoughnutChartProps) => 
{
    const data ={
        datasets: [
            {
                label: 'Banks',
                data: [1079950, 893333, 1245234],
                backgroundColor: ['#ee9f39', '#f0d14b',
                '#f4df81']
            }
        ],
        labels: ['Bank 1', 'Bank2', 'Bank3']
    }
    return (
      <Doughnut 
      data={data}
      options={{
        cutout:'60%',
        plugins:{
            legend:{
                display:false
            }
        }
      }} />

  )
}

export default DoughnutChart
