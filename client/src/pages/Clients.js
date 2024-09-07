import Client from '../components/Client'
import Project from '../components/Project'
import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useFormik, Formik, Form, Field } from 'formik'
import { UserContext } from '../context/UserContext'
import CloseIcon from '@mui/icons-material/Close';
import { object, string, array, number, bool } from "yup";
import { useDropzone} from 'react-dropzone'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';


function Clients() {
    const { user,updateUser, clients } = useContext(UserContext)
    const [newClient, setNewClient] = useState(false)
    const [files, setFiles] = useState([]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        }
      });

    

    const clientSchema = object({
        name: string()
        .required(),
        type: string(),
        account: number(),

      });

    const initialValues = {
        name: '', 
        type: '',
        isActive: null,
        account: user.user.account_details.id
    }

    const formik = useFormik({
        initialValues,
        validationSchema: clientSchema,
        onSubmit: (formData) => {


            fetch('http://127.0.0.1:5555/client/', {
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
                                    clients: [...user.user.account_details.clients,data]
                                
                                }
                            }
                        };
        
                        updateUser(updatedUser)
        
                        handleNewClient()
                        toast.success("Project Added")
        
                    })
        
        
        
                }
            })



        }
    })


    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name ))
      }


    const handleNewClient = () => {
        setNewClient(!newClient)
    }

    console.log(clients)

    return (
        <>
            {/* Page Header */}
            <div className='flex flex-row items-center justify-between mb-2 h-[5%]'>
                <div className='flex flex-row items-center'>
                    <PeopleOutlineIcon fontSize='small' />
                    <p className='text-lg ml-2'>Clients</p>
                </div>

                <div>
                    <AddBoxIcon fontSize='medium' onClick={handleNewClient}/>
                </div>
            </div>

            <div className='flex flex-row flex-wrap overflow-y-scroll items-start justify-center h-full'>
                <div className='flex flex-row flex-wrap'>
                    {
                        clients ?

                        clients.map(client => {
                            return <Client id={client.id} {...client} />
                        })

                        :


                            <h1>No Clients</h1>

                    }
                </div>

            </div>





        {
            newClient ?

            <div className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur'>
                <div className='bg-white border'>
                    <CloseIcon onClick={handleNewClient} />
                    <Formik 
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form 
                        className=' flex flex-col'
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                            <label> New Client </label>

                            <label> Name </label>
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


                            <label> Client Type </label>

                            <Field
                                name='type'
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                as='select'
                                type='text'
                                placeholder='type'
                                className='border m-2 p-2'
                            >
                                <option value=''>Select Type</option>
                                <option value='CPG'>CPG</option>
                                <option value='Brands'>Brands</option>
                            </Field>

                            {formik.errors.type && formik.touched.type && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                            )}



                    {/* <div  {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p className='bg-ocean border text-black m-2 p-2rounded-lg'>

                        <UploadFileIcon />
                        Drag or Click Here 
                        
                        </p>
                    </div> */}

                    {/* {files[0] ? 
                    <div className='flex flex-row justify-between bg-champagne p-2 m-2 rounded-lg '> 

                        <div clasName='flex flex-row'>
                        <img alt='img_preview' src={files[0].preview} className='h-[50px] w-[50px]' />

                        <div className='flex flex-col'> 

                            <p>{files[0].name}</p>
                            <p>{files[0].size}</p>
                            
                        </div>

                        </div>


                        <div className='flex flex-col'>

                        <button 
                            className='bg-shittake text-black rounded-lg p-1'
                            onClick={() => removeFile(files[0].name)}
                        >
                            Remove
                        </button>

                        </div>

                    </div>
                    : 
                    <h1>No file Uploaded</h1>} */}



                            <button type='submit'> + Add Client </button>


                        </Form>

                    </Formik>
                </div>
            </div>

            :

            <>
            </>

        }

        
        </>
    )
}

export default Clients