import React , {SetStateAction, useState} from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'

interface ChildProps {
    setUserDetail: React.Dispatch<React.SetStateAction<{ name: string; email: string; }>>;
  }

const UserDetails:React.FC<ChildProps> = ({setUserDetail}) => {
    const[ Namefocus, setNameFocus ] = useState('');
    const[ Emailfocus , setEmailFocus ] = useState('');

    const formik = useFormik({
        initialValues : {
          name:'',
          email: '',
        },
        onSubmit: async () => {
            console.log(formik.values);
            setUserDetail({name:` ${formik.values.name} `, email: `${formik.values.email}`})
            
        },
        validationSchema: yup.object({  
          name:     yup.string().required('field is required'),
          email:    yup.string().email(),
        })
      });

  return (
    <div>
        <form className="sm:w-[100%] md:w-[55%] lg:w-[35%] flex flex-col justify-center" onSubmit={formik.handleSubmit} >
                <div id='name&password' className="flex flex-col">
                    <label htmlFor="password" className="text-[#333333] font-sans font-semibold text-lg">Name</label>
                    <div className={`bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded ${Namefocus} hover:outline-gray-900`}>
                        <input
                            id="name"
                            type="text"
                            className="bg-gray-50 focus:outline-none w-full"
                            placeholder="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onFocusCapture={()=>setNameFocus('outline-gray-900' )}
                            onBlurCapture={() => setNameFocus('')}
                        />
                        {/* <div>{passwordVisible ? <EyeInvisibleFilled onClick={()=>setPasswordVisible(false)} className=""/> : <EyeFilled onClick={()=>setPasswordVisible(true)} className="px-[1%]"/>} </div> */}
                    </div>
                    {formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                </div>

                <div id='password' className="flex flex-col mt-[4%]">
                    <label htmlFor="password" className="text-[#333333] font-sans font-semibold text-lg ">Email</label>
                    <div className={` bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded hover:outline-gray-900 ${Emailfocus}`}>
                        <input
                            id="email"
                            type="text"
                            className="bg-gray-50 focus:outline-none w-full"
                            placeholder="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onFocus={()=>setEmailFocus('outline-gray-900' )}
                            onBlurCapture={() => setEmailFocus('')}
                        />
                        {/* <div>{confirmPasswordVisible ? <EyeInvisibleFilled onClick={()=>setConfirmPasswordVisible(false)} className=""/> : <EyeFilled onClick={()=>setConfirmPasswordVisible(true)} className="px-[1%]"/>} </div> */}
                    </div>
                    {formik.errors.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                    )}
                </div>
                <div className="flex place-content-center">
                    <button type="submit" className="bg-[#C84869] hover:bg-[#961638] text-white mt-[4%] rounded-md hover:transition-colors duration-500 ease-in-out p-[1%] w-[70%]">Submit</button>
                </div>
                
            </form>
    </div>
  )
}

export default UserDetails;
