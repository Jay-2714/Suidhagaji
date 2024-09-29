// "use client"
// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import type { NextPage } from 'next';
// import axios from "axios";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from '../../firebase/setup'

//  const AuthForm = () => {

//   const[ status, setStatus ]  = useState(false)

//   const formik = useFormik({
//     initialValues : {
//       phoneNumber:'',
//       password:'',
//       confirmPassword: '',
//     },
//     onSubmit: async () => {
//       setStatus(true);
//       console.log(formik.values);
//       await axios.post(`http://localhost:8080/api/register`,{
//         phoneNumber: formik.values.phoneNumber,
//         password:formik.values.password,
//         confirmPassword:formik.values.confirmPassword
//       })
//       .then((res)=>console.log("Data sent success",res))
//       .catch((err)=>console.log(err))
//     },
//     validationSchema: yup.object({  
//       phoneNumber:      yup.string().trim().required('Phone Number is required'),
//       confirmPassword:  yup.string().required('password is required'),
//       password:         yup.string().required('password is required'),
//     })
//   });

//    const sendOtp = () => {
//     try {
//       const reCaptcha = new RecaptchaVerifier(auth , "recaptcha" , {})
//       const reconfirmation = signInWithPhoneNumber(auth ,formik.values.phoneNumber, reCaptcha )
//       console.log(reconfirmation);
      
//     } catch (error) {
//       console.log(error);
      
//     }
      
//    }

//   return(
//     <div>
//       <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
//         <form className="w-50" onSubmit={formik.handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
//             <input
//               name="phoneNumber"
//               type="text"
//               maxLength={10}
//               placeholder="Phone Number"
//               value={formik.values.phoneNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.phoneNumber && (
//               <div className="text-danger">{formik.errors.phoneNumber}</div>
//             )}
            
//             </div>
//             <div id="password" className="mb-3">
//             <label className="form-label" htmlFor="password">Password</label>
//             <input
//               name="password"
//               type="password"
//               minLength={8}
//               placeholder="password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.password && (
//               <div className="text-danger">{formik.errors.password}</div>
//             )}

//             </div>

//             <div id="confirm_password" className="mb-3">
//             <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               name="confirmPassword"
//               type="text"
//               minLength={8}
//               placeholder="password"35
//               value={formik.values.confirmPassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.confirmPassword && (
//               <div className="text-danger">{formik.errors.confirmPassword}</div>
//             )}
              
//             </div>

//             <button type="submit" onClick={sendOtp} className="btn btn-primary">Submit</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AuthForm;