import { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { Formik, useFormik, Form, Field } from 'formik'
import { object, string, number } from "yup";
import { toast } from 'react-hot-toast'
import Expense from '../components/Expense'
import AddBoxIcon from '@mui/icons-material/AddBox';


function Budget() {

    const route = useParams();

    const { user, updateExpenses, expenses } = useContext(UserContext)
    const initialValue = 0


    const expenseSchema = object({
        name: string(),
        amount: number(),
        description: string(),
        type: string(),
        note: string(),
        deadline: string(),
        project: number()
      });

    const initialValues = {
        name: '',
        amount: 0,
        description: '',
        type: '',
        note: '',
        project:''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: expenseSchema,
        onSubmit: (formData) => { 

            // Add Project to Form Data

            formData['project'] = parseInt(route.id)



            fetch('http://127.0.0.1:5555/expense/', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${user.token}`
                }
            })
            .then(resp => {
                if(resp.ok){

                    return resp.json().then(data => {

                        const newExpenses = [...expenses, data]

                        updateExpenses(newExpenses)


                        toast.success("Expense Added")

                        

                    })



                }
            })
        }
      });


    useEffect(() => {

    }, [])


    return (

        <>
        {
            route.id ?            
            
            <div className='border border-black rounded-xl p-4 h-full '>
                <div className='flex flex-row justify-between h-[5%]'>
                    <h1 className=''>Expenses</h1>
                </div>

                <div className='w-full bg-black text-white flex flex-row items-center h-[5%] p-4'>
                    <p className='text-sm w-[10%]'>New Expense</p>
                    <Formik>
                            <Form
                                className='flex flex-row items-center text-black justify-between w-[90%] p-1'
                                onSubmit={formik.handleSubmit}
                                initialValues={initialValues}
                            >
                                <Field 
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    type='text'
                                    className='text-sm border-[0.2px] w-[25%] h-[25px]'
                                    placeholder='description'
                                    
                                >
                                </Field>

                                {formik.errors.description && formik.touched.description && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.description.toUpperCase()}</div>
                                )}

                                <Field 
                                    name='amount'
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    type='number'
                                    step='100'
                                    className='text-sm border-[0.2px] w-[10%] h-[25px]'
                                    placeholder='amount'
                                />

                                {formik.errors.type && formik.touched.type && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                                )}
                                
                                <Field 
                                    name='note'
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                    type='text'
                                    className='text-sm border-[0.2px] w-[20%] h-[25px]'
                                    placeholder='note'
                                >
                                    
                                </Field>

                                {formik.errors.note && formik.touched.note && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.note.toUpperCase()}</div>
                                )}

                                <Field 
                                    name='type'
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    type='text'
                                    as='select'
                                    className='text-sm border-[0.2px] w-[15%] h-[25px]'
                                    placeholder='type'
                                >
                                    <option>Payroll</option>
                                    <option>Ad Spend</option>
                                    
                                </Field>

                                {formik.errors.type && formik.touched.type && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                                )}

                                <Field 
                                    name='status'
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    type='text'
                                    as='select'
                                    className='text-sm border-[0.2px] w-[15%] h-[25px]'
                                    placeholder='status'
                                >
                                    <option>Planned</option>
                                    <option>Pending</option>
                                    <option>Paid</option>
                                    
                                </Field>

                                {formik.errors.status && formik.touched.status && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.status.toUpperCase()}</div>
                                )}
                                <button type='submit' className='flex items-center'>
                                    <AddBoxIcon className='text-white' />
                                </button>
                            </Form>
                    </Formik>

                </div>


                <div className='flex flex-col h-[90%] w-full flex mb-2'>

                    <div className='border-b-[0.2px] h-[97%] overflow-y-scroll'>

                        { expenses.filter(expense => expense.project === parseInt(route.id)).length !== 0 ?

                            expenses.filter(expense => expense.project === parseInt(route.id)).map(expense => {
                                return <Expense id={expense.id} {...expense} />
                            })

                            :

                            <div className='text-black text-5xl w-full flex justify-center h-full items-center'>
                                <p>No Project Expenses</p>
                            </div>
                        
                        }

                        <div className='w-[80%] border-r-[0.2px]'>
                        </div>


                    </div>

                    <div className='flex flex-row h-[3%] w-full'>

                        <div className='border-r-[0.2px] w-[80%] h-full'>
                            
                        </div>

                        <div className='w-[20%] h-full text-sm flex flex-row text-2xl'>
                            <p className='text-2xl ml-1'>Total:</p>

                            <p className='text-2xl'> $
                                {
                                    expenses ?

                                    expenses.filter(expense => expense.project === parseInt(route.id)).reduce((accumulator, currentExpense) => accumulator + currentExpense.amount, initialValue)
                                    :

                                    <></>
                                }
                            </p>
                            
                        </div>

                    </div>

                </div>

            </div>

            :

            <div className='border my-2'>
                {/* <h1>{description ? description : 'No Description'}</h1>
                <p>{deadline ? deadline : 'No Deadline'}</p>
                <p>{note ? note : 'No Note'}</p>
                <p>{type ? type : 'No Type'}</p> */}
            </div>

        }
        
        </>
    )
}

export default Budget