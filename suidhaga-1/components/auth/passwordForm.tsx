'use client'
import React from "react";
import { EyeFilled,EyeInvisibleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
import toast from "react-hot-toast";
import { message } from "antd";
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/graphql/mutations/users.mutations';
import { stat } from "fs";

// interface passwordField {
//     password        : String
//     confirmPassword : String
// }

interface ChildProps{
    password : React.Dispatch<React.SetStateAction<string>>
    status:  React.Dispatch<React.SetStateAction<boolean>>
    // phone : String
}

const PasswordForm:React.FC<ChildProps> = ({password , status}) => {

    const[passwordVisible,setPasswordVisible] =  useState(false);
    const[confirmPasswordVisible , setConfirmPasswordVisible]= useState(false); 
    const[ Pfocus, setPfocus ] = useState('');
    const[ CPfocus , setCPfocus ] = useState('');
    const [signup,{loading , error}] =  useMutation(SIGN_UP)
    // console.log(signup , loading , error);

    const formik = useFormik({
        initialValues : {
          password:'',
          confirmPassword: '',
        },
        onSubmit: async () => {
            if (formik.values.password===formik.values.confirmPassword) {
                // const SignUpData = {phone:'12' ,password: `${formik.values.password}`}
                // console.log(SignUpData);
                
                // try {
                //     await signup({
                //         variables:{
                //             input: SignUpData,
                //         }
                //     })
                // } catch (error) {
                //     console.log(error);
                // }
                // toast.success('Password created')
                console.log(formik.values);
                password(formik.values.confirmPassword);
                status(false)
                // setState(formik.values.password);
            }
            if(formik.values.password!==formik.values.confirmPassword){
                toast.error('password dont match')
            }
        },
        validationSchema: yup.object({  
          confirmPassword:  yup.string().min(6,"min 6 Characters").max(18,'max 18 characters').required('field is required'),
          password:         yup.string().min(6,'min 6 characters').max(18,'max 18 characters').required('password is required'),
        })
      });

    return(
        <>
            <form className="sm:w-[100%] md:w-[55%] lg:w-full flex flex-col justify-center" onSubmit={formik.handleSubmit} >
                <div id='password' className="flex flex-col w-full">
                    <label htmlFor="password" className="text-[#333333] font-sans font-semibold text-lg">Password</label>
                    <div className={`bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded ${Pfocus} hover:outline-gray-900`}>
                        <input
                            id="password"
                            type={passwordVisible?'text':'password'}
                            className="bg-gray-50 focus:outline-none w-full"
                            placeholder="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onFocusCapture={()=>setPfocus('outline-gray-900' )}
                            onBlurCapture={() => setPfocus('')}
                        />
                        <div>{passwordVisible ? <EyeInvisibleFilled onClick={()=>setPasswordVisible(false)} className=""/> : <EyeFilled onClick={()=>setPasswordVisible(true)} className="px-[1%]"/>} </div>
                    </div>
                    {formik.errors.password && (
                        <div className="text-danger">{formik.errors.password}</div>
                    )}
                </div>

                <div id='password' className="flex flex-col mt-[4%]">
                    <label htmlFor="password" className="text-[#333333] font-sans font-semibold text-lg ">Confirm Password</label>
                    <div className={` bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded hover:outline-gray-900 ${CPfocus}`}>
                        <input
                            id="confirmPassword"
                            type={confirmPasswordVisible?'text':'password'}
                            className="bg-gray-50 focus:outline-none w-full"
                            placeholder="re-type password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onFocus={()=>setCPfocus('outline-gray-900' )}
                            onBlurCapture={() => setCPfocus('')}
                        />
                        <div>{confirmPasswordVisible ? <EyeInvisibleFilled onClick={()=>setConfirmPasswordVisible(false)} className=""/> : <EyeFilled onClick={()=>setConfirmPasswordVisible(true)} className="px-[1%]"/>} </div>
                    </div>
                    {formik.errors.confirmPassword && (
                        <div className="text-danger">{formik.errors.confirmPassword}</div>
                    )}
                </div>
                <div className="flex place-content-center">
                    <button type="submit" className="bg-[#C84869] hover:bg-[#961638] text-white mt-[4%] rounded-md hover:transition-colors duration-500 ease-in-out p-[1%] w-[70%]">Submit</button>
                </div>
            </form>
        </>
    )
}

export default PasswordForm;