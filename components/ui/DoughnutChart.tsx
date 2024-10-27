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
                data: [100000, 100000, 100000,100000,100000],
                backgroundColor: ['#E2B7F2','#AD4AD4', '#8C4AA6',
                '#F9EAFF','#D7A2EB']
            }
        ],
        labels: ['Bank 1', 'Bank2', 'Bank3', 'Bank4', 'Bank5']
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
