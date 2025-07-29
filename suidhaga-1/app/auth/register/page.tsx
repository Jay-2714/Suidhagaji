"use client";
import React, { useState } from "react";
import { Sansita } from "@next/font/google";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "@/graphql/mutations/users.mutations";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import akshay from "@/public/image/akshay.jpg";
import TextField from "@mui/material/TextField";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

const SansitaBold = Sansita({
  subsets: ["latin"],
  weight: "700",
  style: ["normal"],
});

export default function Register() {
  const [signup, { loading, error }] = useMutation(SIGN_UP);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",  
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const signUpData = {
        username: values.email,
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone // Keep empty for now to maintain backend compatibility
      };
      
      console.log(signUpData);

      try {
        signup({
          variables: {
            input: signUpData,
          },
        })
          .then(() => {
            toast.success(`User Created Successfully`);
            router.push(`/auth/login`);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err?.message || "Error creating account");
          });
      } catch (err) {
        toast.error(`Error signing up`);
        console.log(err);
      }
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email format").required("Email is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: yup.string().required("Confirm password is required"),
      phone: yup.string().required("Phone number is required"),
    }),
  });

  return (
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
      
      <div id="card" className="w-screen h-screen">
        <div className="flex xl:flex-row lg:flex-row sm:flex-col justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:p-[3%] xs:max-sm:py-[8%] xs:max-sm:px-[4%] shadow-2xl w-[70%] h-[70%]">
          
          <div className="w-[45%] flex flex-col justify-center">
            <span
              className={`${SansitaBold.className} text-xl md:text-2xl lg:text-3xl text-[#333333] flex xs:place-content-center sm:place-content-center md:place-content-start mb-6`}
            >
              Create Your Account
            </span>
            
            <form
              className="flex flex-col space-y-4"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="name"
                label="Full Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoComplete="name"
                fullWidth
              />

              <TextField
                id="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
                fullWidth
              />

                 <TextField
                id="phone"
                label="Phone .no"
                type="string"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phone"
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                autoComplete="phone"
                fullWidth
              />

              <div className="relative">
                <TextField
                  id="password"
                  label="Password"
                  type={passwordVisible ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  autoComplete="new-password"
                  fullWidth
                />
                <div 
                  className="absolute right-3 top-4 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeInvisibleFilled /> : <EyeFilled />}
                </div>
              </div>

              <div className="relative">
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  autoComplete="new-password"
                  fullWidth
                />
                <div 
                  className="absolute right-3 top-4 cursor-pointer"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <EyeInvisibleFilled /> : <EyeFilled />}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[#C84869] hover:bg-[#961638] text-white rounded-md transition-colors duration-300 p-3 w-[70%] disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="mt-5 text-center">
              <div className="flex flex-row justify-center">
                <p className="px-[10px]">Already have an account?</p>
                <a href="/auth/login" className="text-[#C84869] hover:underline">Login</a>
              </div>
            </div>
          </div>
          
          <div className="xs:hidden lg:block xl:block sm:hidden w-[45%]">
            <Image className="h-full w-full object-cover" src={akshay} alt="Registration illustration"/>
          </div>
        </div>
      </div>
    </div>
  );
}