import { useState, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../context/UserContext'
import Project from '../components/Project'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";
import Chart from 'chart.js/auto'


const dummyData = [
    {
        id: 1,
        budget: 21000,
        spent: 45000,
        client: 'Beyond Medals',
        project: 'McClarent Ad'

    },
    {
        id: 2,
        budget: 56000,
        spent: 45000,
        client: 'Liquid Death',
        project: 'McClarent Ad'

    },
    {
        id: 3,
        budget: 13000,
        spent: 45000,
        client: 'Guayaki',
        project: 'McClarent Ad'

    },
    {
        id: 4,
        budget: 79000,
        spent: 45000,
        client: 'DropBox',
        project: 'McClarent Ad'

    },
    {
        id: 5,
        budget: 100000,
        spent: 45000,
        client: 'McClaren',
        project: 'McClarent Ad'

    }
]


function Budgets(){
    const chartRef = useRef(null)
    const chartInstanceRef = useRef(null);
    const [budgetChartData, setBudgetChartData] = useState({
        labels: dummyData.map(data => data.client),
        datasets: [
            {
                label: 'Top Budgets',
                data: dummyData.map(data => data.budget),
                backgroundColor: 'rgba(109, 153, 181, 0.6)', // Color of the bars
                borderColor: 'rgba(109, 153, 181, 0.6)',       // Border color of the bars
                borderWidth: 1,

            }
        ]
    })

    useEffect(() => {
        // Check if the chartRef has been set and chart instance doesn't already exist

        const createChart = () => {

            const ctx = chartRef.current.getContext('2d'); // Get the context of the canvas

            chartInstanceRef.current =  new Chart(ctx, {
                type: 'bar', // Type of chart
                data: budgetChartData, // Data for the chart
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Start the y-axis at zero
                        }
                    }
                }
            });
        }

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        createChart()

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };

    }, [budgetChartData]);

    return(
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-bottom'>
                <p className=''>Budgets</p>
            </div>

            {/* main body */}
            <div className='h-[95%] w-full flex flex-col lg:flex-row border'>

                <div className='h-[50%] lg:h-full w-full'>

                    <div className='border h-[50%] w-full flex items-center justify-center'>
                        <canvas ref={chartRef} />
                    </div>

                    <div className='border h-[50%] w-full flex flex-col justify-center items-center'>
                        <div className='h-[100px] w-full flex flex-row justify-around items-center'>
                            <p className='text-2xl'>Total Spend</p>
                            <p className='text-3xl bold bg-ocean rounded-lg flex justify-center text-white p-2'>$123,456.00</p>
                        </div>

                        <div className='h-[100px] w-full flex flex-row justify-around items-center'>
                            <p className='text-2xl'>Total Budget</p>
                            <p className='text-3xl bold bg-ocean rounded-lg flex justify-center text-white p-2'>$900,456.00</p>
                        </div>
                    </div>

                </div>

                <div className='h-[50%] lg:h-full w-full'>
                    <div className='h-full overflow-scroll-y scrollbar scrollbar-thumb-ocean overflow-scroll'>
                        <div>
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />
                            <Project />

                        </div>
                    </div>

                </div>


            </div>



        </div>
    )
}

export default Budgets