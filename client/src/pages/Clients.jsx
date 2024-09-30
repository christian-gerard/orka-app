import { useState } from 'react'
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";
import CloseIcon from '@mui/icons-material/Close';
import Client from '../components/Client'


function Clients() {
    const [newClient, setNewClient] = useState(false)

    const handleNewClient = () => setNewClient(!newClient)

    const clientSchema = object({
        description: string(),
        deadline: string(),
        status: string(),
        note: string(),
        type: string(),
        project: string()


      });

    const initialValues = {
        name: '',
        description: '',
        deadline: '',
        project_type: '',
        budget: '',
        client: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: clientSchema,
        onSubmit: (formData) => {


            fetch('/api/client/', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(resp => {
                if(resp.ok){

                    return resp.json().then(data => {


                    })



                }
            })



        }
    })





    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-center'>
                <p className=''>Clients</p>
                <div className='border bg-black'>
                    <p className='text-lg text-white p-1' onClick={handleNewClient}>+ New Client</p>
                </div>
            </div>

            {/* Clients */}
            <div className='h-[95%] w-full bg-white border w-full flex justify-center'>
                {/* Outstanding Tasks */}
                <div className='flex flex-row flex-wrap w-full h-full'>
                    <Client />
                    <Client />
                    <Client />
                    <Client />
                    <Client />
                    <Client />

                </div>

            </div>


            {
                newClient ?

                <div className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur'>
                    <div className='bg-white border h-[700px] w-[350px] lg:h-[80%] lg:w-[40%]'>
                        <CloseIcon  style={{width: '40px', height: '40px'}} onClick={handleNewClient} />
                        <Formik
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                        >
                            <Form
                            className=' flex flex-col lg:gap-2'
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                            >
                                <label className='ml-2 mt-1 text-2xl'> New Client </label>

                                <label className='ml-2'> Name </label>
                                <Field
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeholder='Name'
                                    className='border m-2 p-2'
                                />

                                {formik.errors.name && formik.touched.name && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.name.toUpperCase()}</div>
                                )}

                                <label className='ml-2'> Description </label>
                                <Field
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    as='textarea'
                                    placeholder='Description'
                                    className='border m-2 p-2 lg:h-[200px]'
                                />

                                {formik.errors.description && formik.touched.description && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.description.toUpperCase()}</div>
                                )}

                                <label className='ml-2'> Deadline </label>
                                <Field
                                    name='deadline'
                                    type='date'
                                    min="2024-01-01"
                                    max="2025-12-31"
                                    value={formik.values.deadline}
                                    onChange={formik.handleChange}
                                    placeholder='Deadline'
                                    className='border m-2 p-2'
                                />

                                {formik.errors.deadline && formik.touched.deadline && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                                )}
                                <label className='ml-2'> Type </label>
                                <Field
                                    name='status'
                                    as='select'
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeholder='Status'
                                    className='border m-2 p-2'
                                >
                                    <option value=''>Select Status</option>
                                    <option value='Not Started'>Not Started</option>
                                    <option value='Doing'>Doing</option>
                                    <option value='Blocked'>Blocked</option>
                                    <option value='Done'>Done</option>

                                </Field>

                                {formik.errors.status && formik.touched.status && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.status.toUpperCase()}</div>
                                )}

                                <label className='ml-2'> Budget </label>
                                <Field
                                    name='type'
                                    as='select'
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeholder='Type'
                                    className='border m-2 p-2'
                                >
                                    <option value=''>Select Type</option>
                                    <option value='Prep'>Prep</option>
                                    <option value='Shooting'>Shooting</option>
                                    <option value='Edit'>Edit</option>

                                </Field>

                                {formik.errors.type && formik.touched.type && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                                )}

                                <label className='ml-2'> Client </label>
                                <Field
                                    name='project'
                                    as='select'
                                    value={formik.values.project}
                                    onChange={formik.handleChange}
                                    type='text'
                                    className='border m-2 p-2'
                                >
                                    <option value=''>Select Client</option>
                                    {/* {
                                        projects ?

                                        projects.map(project => { return <option value={project.id}>{project.name}</option>})

                                        :

                                        <></>
                                    } */}


                                </Field>

                                {formik.errors.type && formik.touched.type && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                                )}

                                <button type='submit' className='border bg-black text-white h-[50px]'> Create Client </button>


                            </Form>

                        </Formik>
                    </div>
                </div>

                :

                <>
                </>
            }





        </div>
    )
}
export default Clients