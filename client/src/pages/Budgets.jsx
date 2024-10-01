import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Project from '../components/Project'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";

function Budgets(){
    return(
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-bottom'>
                <p className=''>Budgets</p>
            </div>



            {/* main body */}
            <div className='h-[95%] w-full flex flex-row border'>

                <div className='h-full w-[70%]'>

                    <div className='border h-[50%] w-full'>

                    </div>

                    <div className='border h-[50%] w-full'>
                        <p>Top Level Stats</p>

                    </div>

                </div>

                <div className='h-full w-[30%]'>
                    <p>List of Budgets to View</p>

                </div>


            </div>



        </div>
    )
}

export default Budgets