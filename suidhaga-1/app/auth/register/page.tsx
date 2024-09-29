"use client";
import { auth } from "../../../firebase/setup";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Sansita } from "@next/font/google";
import PasswordForm from "@/components/auth/passwordForm";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "@/graphql/mutations/users.mutations";
import UserDetails from "@/components/auth/userDetails";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import akshay from "@/public/image/akshay.jpg";

const SansitaBold = Sansita({
  subsets: ["latin"],
  weight: "700",
  style: ["normal"],
});

export default function Register() {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState<ConfirmationResult | null>(null);
  const [status, setStatus] = useState(false);
  const [phoneStatus, setPhoneStatus] = useState(true);
  const [password, setPassword] = useState("");
  const [userDetail, setUserDetail] = useState({ name: "", email: "" });
  const [signup, { loading, error }] = useMutation(SIGN_UP);
  const [Namefocus, setNameFocus] = useState("");
  const [Emailfocus, setEmailFocus] = useState("");
  const router = useRouter();
  const [verified, setVerified] = useState<Boolean>(false);

  const sendOtp = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptchaVerifier",
        {}
      );
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );
      setUser(confirmation);
    } catch (error) {
      console.log(error);
    }
  };

  async function verifyUser() {
    try {
      const data = await user?.confirm(otp);
      console.log(data);
      setStatus(true);
      setPhoneStatus(false);
      // if(data){
      //     router.push('/home');
      // }
      setVerified(true);
    } catch (err) {
      console.log(err);
    }
    setStatus(true);
    setPhoneStatus(false);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: async () => {
      // console.log(formik.values);
      if (verified) {
        setUserDetail({
          name: ` ${formik.values.name} `,
          email: `${formik.values.email}`,
        });
        const signUpData = {
          phone: phone,
          password: password,
          username: phone,
          email: `${formik.values.email}`,
          name: `${formik.values.name}`
        };
        console.log(signUpData);

        try {
          signup({
            variables: {
              input: signUpData,
            },
          })
            .then(() => toast.success(`User Created`))
            .then(() => router.push(`/jobs`))
            .catch((err) => {
              console.log(error), toast.error(err?.message);
            });
        } catch (err) {
          toast.error(`error signing in`);
          console.log(err);
        }
      }
    },
    validationSchema: yup.object({
      name: yup.string().required("field is required"),
      email: yup.string().email(),
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
      <div id="card" className=" w-screen h-screen">
        <div className="flex xl:flex-row lg:flex-row sm:flex-col justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:p-[3%] xs:max-sm:py-[8%] xs:max-sm:px-[4%]  shadow-2xl w-[70%] h-[60%]">
          <div>
            <div className={`${!phoneStatus && "hidden"}`}>
              <span
                className={`${SansitaBold.className} text-xl md:text-2xl lg:text-3xl  text-[#333333] flex xs:place-content-center sm:place-content-center md:place-content-start`}
              >
                Register To Your Account
              </span>
              <div className="mt-[4%]">
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(phone) => setPhone("+" + phone)}
                  disableDropdown
                />
              </div>
              <div className="w-1/3 flex flex-col justify-center">
                <div className="flex justify-center">
                  <div
                    id="send_otp_button"
                    className="px-[5%] py-[1%] bg-[#C84869] text-white mt-[2%] rounded-md cursor-pointer"
                    onClick={sendOtp}
                  >
                    {" "}
                    Send OTP
                  </div>
                </div>
              </div>
              <div id="recaptchaVerifier" className="mt-[2%]"></div>
              <div className="full mt-[4%]">
                <div className="flex justify-center items-center">
                  <label className="px-[3%]">Enter OTP :</label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    renderSeparator={<span className="px-1"></span>}
                    inputStyle={"text-lg border-2 rounded border-gray-400 "}
                  />
                </div>
                <div className="">
                  <div className="flex justify-center">
                    <div
                      id="send_otp_button"
                      className="px-[10%] py-[1%] bg-[#C84869] text-white mt-[2%] rounded-md cursor-pointer"
                      onClick={verifyUser}
                    >
                      Verify
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${!status && "hidden"} `}>
              <div
                className={`${SansitaBold.className} lg:text-2xl text-md text-[#333333] md:text-xl mt-[4%] w-[100%] flex xs:max-md:place-content-center `}
              >
                Create Your Password
              </div>
              <div className="mt-[15%] w-full">
                <PasswordForm password={setPassword} status={setStatus} />
              </div>
            </div>
            <div className={`${!password && "hidden"}`}>
              <div
                className={`${SansitaBold.className} lg:text-2xl text-md text-[#333333] md:text-xl mt-[4%] w-[100%] flex xs:max-md:place-content-center `}
              >
                User Details
              </div>
              <div className="mt-[2%] w-full">
                {/* ----MAKE A COMPONENT AND RENDER HERE */}
                <div>
                  <form
                    className="sm:w-[100%] md:w-[55%] lg:w-full flex flex-col justify-center"
                    onSubmit={formik.handleSubmit}
                  >
                    <div id="name&password" className="flex flex-col">
                      <label
                        htmlFor="password"
                        className="text-[#333333] font-sans font-semibold text-lg mt-[20%]"
                      >
                        Name
                      </label>
                      <div
                        className={`bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded ${Namefocus} hover:outline-gray-900`}
                      >
                        <input
                          id="name"
                          type="text"
                          className="bg-gray-50 focus:outline-none w-full"
                          placeholder="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onFocusCapture={() =>
                            setNameFocus("outline-gray-900")
                          }
                          onBlurCapture={() => setNameFocus("")}
                        />
                        {/* <div>{passwordVisible ? <EyeInvisibleFilled onClick={()=>setPasswordVisible(false)} className=""/> : <EyeFilled onClick={()=>setPasswordVisible(true)} className="px-[1%]"/>} </div> */}
                      </div>
                      {formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                      )}
                    </div>

                    <div id="password" className="flex flex-col mt-[4%]">
                      <label
                        htmlFor="password"
                        className="text-[#333333] font-sans font-semibold text-lg "
                      >
                        Email
                      </label>
                      <div
                        className={` bg-gray-50 flex flex-row justify-between outline outline-1 outline-gray-400 p-[2%] rounded hover:outline-gray-900 ${Emailfocus}`}
                      >
                        <input
                          id="email"
                          type="text"
                          className="bg-gray-50 focus:outline-none w-full"
                          placeholder="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onFocus={() => setEmailFocus("outline-gray-900")}
                          onBlurCapture={() => setEmailFocus("")}
                        />
                        {/* <div>{confirmPasswordVisible ? <EyeInvisibleFilled onClick={()=>setConfirmPasswordVisible(false)} className=""/> : <EyeFilled onClick={()=>setConfirmPasswordVisible(true)} className="px-[1%]"/>} </div> */}
                      </div>
                      {formik.errors.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                      )}
                    </div>
                    <div className="flex place-content-center">
                      <button
                        type="submit"
                        className="bg-[#C84869] hover:bg-[#961638] text-white mt-[8%] rounded-md hover:transition-colors duration-500 ease-in-out p-[1%] w-[70%]"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="xs:hidden lg:block xl:block sm:hidden">
            <Image className="h-full w-full" src={akshay} alt="load"/>
          </div>
        </div>
      </div>
    </div>
  );
}
