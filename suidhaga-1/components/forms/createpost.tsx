import React                from 'react'
import { useState }         from 'react'
import { useFormik }        from 'formik'
import * as yup             from 'yup'

interface ChildProp {
    visibility: boolean;
}

const CreatePost:React.FC<ChildProp> = ({visibility}) => {

    const formik = useFormik({
        initialValues : {
          title:'',
          description: '',
        },
        onSubmit: async () => {
            console.log(formik.values);
        },
        validationSchema: yup.object({  
          title:        yup.string().required('field is required'),
          description:  yup.string().required('password is required'),
        })
      });

  return (
    <div>
      <div>
      <form className="sm:w-[100%] md:w-[55%] lg:w-[35%] flex flex-col justify-center" onSubmit={formik.handleSubmit} >
                <div id='title' className="flex flex-col">
                    <label htmlFor="password" className="text-[#333333] font-sans font-semibold text-lg">Title</label>
                    <div className={`bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded hover:outline-gray-900`}>
                        <input
                            id="password"
                            type="text"
                            className="bg-gray-50 focus:outline-none w-full"
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                           
                        />
                    </div>
                    {formik.errors.title && (
                        <div className="text-danger">{formik.errors.title}</div>
                    )}
                </div>

                <div id='description' className="flex flex-col">
                    <label htmlFor="description" className="text-[#333333] font-sans font-semibold text-lg">Description</label>
                    <div className={`bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded hover:outline-gray-900`}>
                        <input
                            id="descritption"
                            type="textbox"
                            className="bg-gray-50 focus:outline-none w-full"
                            placeholder="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                           
                        />
                    </div>
                    {formik.errors.description && (
                        <div className="text-danger">{formik.errors.description}</div>
                    )}
                </div>

                <div className="flex place-content-center">
                    <button type="submit" className="bg-[#C84869] hover:bg-[#961638] text-white mt-[4%] rounded-md hover:transition-colors duration-500 ease-in-out p-[1%] w-[70%]">Submit</button>
                </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
