import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useParams, useNavigate } from 'react-router-dom'
import { Formik, useFormik, Form, Field } from 'formik'
import { object, string, array, number } from "yup";
import { toast } from 'react-hot-toast'
import DeleteIcon from '@mui/icons-material/Delete';


function ProductionNeed({description, deadline, note, type, project }) {

    const route = useParams();

    const { user, updateUser } = useContext(UserContext)
    const nav = useNavigate()
    const [prodNeeds, setProdNeeds] = useState([])
    const [newProdNeed, setNewProdNeed] = useState(false)

    const handleNewProdNeed = () => {
        setNewProdNeed(!newProdNeed)
    }

    const prodNeedSchema = object({
        description: string()
        .required(),
        type: string(),
        note: string(),
        deadline: string(),
        project: number()
      });

    const initialValues = {
        description: '',
        type: '',
        note: '',
        deadline: '',
        project:''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: prodNeedSchema,
        onSubmit: (formData) => { 

            // Add Project to Form Data

            formData['project'] = parseInt(route.id)


            fetch('http://127.0.0.1:5555/productionneed/', {
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


                        const updatedUser = {
                            ...user,
                            user: {
                                ...user.user,
                                account_details: {
                                    ...user.user.account_details,
                                    clients: user.user.account_details.clients.map(client => {
                                        if(client.id === data.client) {
                                            return {
                                                ...client,
                                                projects: client.projects.map((project) => {
                                                    if (project.id === data.id) {
                                                        return {
                                                            ...project,
                                                            prod_needs: [...project.prod_needs, data]
                                                        }
                                                    }
                                                    return project
                                                })
                                            };
                                        }
                                        return client;
                                    })
                                }
                            }
                        };

                        updateUser(updatedUser)

                        toast.success("Production Need Added")

                        

                    })



                }
            })
        }
      });


    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/productionneed/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${user.token}`
            }
        })
        .then(resp => {
            if(resp.ok) {

                return resp.json().then(data => {

                    const updatedProdNeeds = prodNeeds.filter(prod_need => prod_need.id !== id)

                    setProdNeeds(updatedProdNeeds)

                    toast.success('Task Deleted')

                })
            }
        })
    }



    useEffect(() => {
        fetch(`http://127.0.0.1:8000/productionneed/${route.id}`, {
            headers: {
                'Authorization': `Token ${user.token}`
            }

        })
        .then(resp => {
            if(resp.ok){
                return  resp.json().then(data => {
                    setProdNeeds(data)
                })
            }
        })

    }, [prodNeeds])


    return (

        <>
        {
            route.id ?            
            
            <div className='border border-black rounded-xl my-4 mx-4 p-4'>
                <div className='flex flex-row justify-between'>
                    <h1>Action Items</h1>
                    <div className='border'>
                        <button onClick={handleNewProdNeed}>
                        New +
                        </button>
                    </div>
                </div>
                {prodNeeds ? 
                    prodNeeds.map( prod_need => {
                        return (
                            <div className='border my-2 flex-col'>

                                <div className='flex flex-row justify-between '>
                                    <p className='w-[80%]'>{prod_need ? prod_need.description : 'None'}</p>
                                    <div className='flex flex-row justify-end w-[20%]'>
                                        <p>{prod_need ? prod_need.deadline.slice(5,10) : 'deadline'}</p>
                                        <button className='bg-ocean w-[25px]' onClick={() => handleDelete(prod_need.id)}>
                                            X
                                        </button>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between text-sm '>

                                    <p>{prod_need.note}</p>
                                    <p>{prod_need.type}</p>

                                </div>
                            </div>
                        )
                    })
                    : 
                    "No Project Tasks"}
                { newProdNeed ?
                    <Formik>
                        <Form
                            className='flex flex-row'
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                        >
                            <Field 
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                type='text'
                                className='border my-2 p-1 w-[200px]'
                                placeholder='description'
                                
                            >
                            </Field>

                            {formik.errors.description && formik.touched.description && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.description.toUpperCase()}</div>
                            )}

                            <Field 
                                name='type'
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                as='select'
                                type='text'
                                className='border m-2 p-1 w-[100px]'
                                placeholder='type'
                            >
                                <option>Select Here</option>
                                <option>Organization</option>
                                <option>Production</option>
                                <option>Lead Work</option>
                            </Field>

                            {formik.errors.type && formik.touched.type && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                            )}
                            
                            <Field 
                                name='note'
                                value={formik.values.note}
                                onChange={formik.handleChange}
                                type='text'
                                className='border m-2 p-1 w-[100px]'
                                placeholder='note'
                            >
                                
                            </Field>

                            {formik.errors.note && formik.touched.note && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.note.toUpperCase()}</div>
                            )}

                            <Field 
                                name='deadline'
                                value={formik.values.deadline}
                                onChange={formik.handleChange}
                                type='text'
                                className='border m-2 p-1 w-[100px]'
                                placeholder='note'
                            >
                                
                            </Field>

                            {formik.errors.deadline && formik.touched.deadline && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                            )}
                            <button type='submit'>+</button>
                        </Form>
                    </Formik>

                    :

                    <>
                    </>
                }
            </div>

            :

            <div className='border my-2'>
                <h1>{description ? description : 'No Description'}</h1>
                <p>{deadline ? deadline : 'No Deadline'}</p>
                <p>{note ? note : 'No Note'}</p>
                <p>{type ? type : 'No Type'}</p>
            </div>

        }
        
        </>
    )
}

export default ProductionNeed