"use client";
import React, { useState } from "react";
import { Sansita } from "@next/font/google";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/graphql/mutations/users.mutations";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import akshay from "@/public/image/akshay.jpg";
import Image from 'next/image';
import { useFormik } from "formik";
import * as yup from "yup";

const SansitaBold = Sansita({
  subsets: ["latin"],
  weight: "700",
  style: ["normal"],
});

const Login = () => {
  const router = useRouter();
  const [login, { loading, error }] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      const loginData = { username: values.email, password: values.password };
      console.log(loginData);
      try {
        login({
          variables: {
            input: loginData,
          },
        })
          .then(() => {
            toast.success(`User Logged In`);
            router.push("/jobs");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    }
  });

  return (
    <div>
      <div className="relative h-screen bg-[#F1F1F1]">
        <div className="absolute inset-0">
          <div
            id="vector-bg"
            className="flex justify-end overflow-hidden h-screen"
          >
            <svg
              viewBox="0 0 702 1117"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full"
            >
              <path
                d="M372 0H703.5V1117H302C159 912 113.358 833.88 58 757.5C-21 648.5 -15.0001 598 58 488.5L372 0Z"
                fill="#3357B7"
                stroke="#ABCBFF"
              />
            </svg>
          </div>
        </div>
        <div id="card" className="flex xl:flex-row lg:flex-row sm:flex-col w-screen h-screen">
          <div className="flex xl:flex-row lg:flex-row sm:flex-col absolute top-1/2 left-1/2 justify-evenly transform -translate-x-1/2 -translate-y-1/2 bg-white sm:p-[3%] xs:max-sm:py-[8%] xs:max-sm:px-[4%]  shadow-2xl w-[70%] lg:[50%] sm:[100%] h-[60%]">
           
            <form className={`flex flex-col w-[35%] justify-center`} onSubmit={formik.handleSubmit}>
              <span
                className={`${SansitaBold.className} text-xl md:text-2xl lg:text-3xl  text-[#333333] flex xs:place-content-center sm:place-content-center md:place-content-start`}
              >
                Login To Your Account
              </span>
              
              <TextField
                className="mt-[4%] w-[88%]"
                id="outlined-email-input"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
              />
              
              <TextField
                className="mt-[4%] w-[88%]"
                id="outlined-password-input"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
              />
              
              <div className=" w-[85%] mt-[4%]">
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-[20%] py-[1%] bg-[#C84869] text-white mt-[2%] rounded-md cursor-pointer hover:bg-[#961638] transition-colors duration-300 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </div>
              
              <div className="mt-[5%]">
                <div className="flex flex-row">
                  <p className="px-[10px]">Dont have an account?</p>
                  <a href="/auth/register" className="text-[#C84869] hover:underline">Register</a>
                </div>
              </div>
            </form>
            
            <div className="xs:hidden lg:block xl:block sm:hidden">
              <Image className="h-full w-full" src={akshay} alt="load"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;