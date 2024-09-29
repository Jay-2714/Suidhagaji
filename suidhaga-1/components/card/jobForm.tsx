import React, { useRef } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_JOB } from "@/graphql/mutations/addJob.mutations";
import toast from "react-hot-toast";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import "@/public/css/client.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";

interface AddJobCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddJobCard: React.FC<AddJobCardProps> = ({ isOpen, onClose }) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [imageBase64, setImageBase64] = React.useState<string>();
  const [createJob, { loading, error }] = useMutation(ADD_JOB);
  const { data } = useQuery(GET_AUTHENTICATED_USER);
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobDescription: "",
      materialProvided: false,
      amount: "",
      color: "",
      numOfApplicants: 1,
      status: "Active",
      imageInput: null,
      size: "",
      quantity: "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("Required"),
      jobDescription: Yup.string().required("Required"),
      amount: Yup.number().required("Required"),
      // numOfApplicants: Yup.number().required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(values.imageInput);
      toast.success("Job Created");

      if (values.imageInput) {
        console.log(values.imageInput);
      }

      if (
        imageBase64 !== "" ||
        imageBase64 !== null ||
        imageBase64 !== undefined
      ) {
        const jobInput = {
          title: values.jobTitle,
          description: values.jobDescription,
          createdAt: "04-05-2024",
          color: values.color,
          amount: values.amount,
          quantity: values.quantity,
          size: values.size,
          image: imageBase64,
        };
        console.log(jobInput);

        try {
          
          await createJob({
            variables: {
              input: jobInput,
            },
          });
          toast.success(`Job Created`);
          router.push(`/jobs`);
        } catch (err) {
          toast.error(`Error creating job`);
          console.error(err);
        }
        try {
          const name = `${values.jobTitle}`;
          const message = `${data?.authUser?.name} created a New Job`;
  
          await axios.post("http://localhost:8080/api", { name, message })
              .then((res) => {
                  console.log(res)
              })
  
          // console.log("submitted", name, message)
        } catch (error) {
          console.log(error);
          
        }
      }

      onClose();
    },
  });

  function imageToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result) {
          resolve(fileReader.result.toString());
        }
      };
      fileReader.onerror = () => {
        reject(new Error("Error reading file"));
      };
    });
  }
  
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("imageInput", file);
      setImagePreview(URL.createObjectURL(file));
      const base64 = await imageToBase64(file);
      console.log(base64);
      setImageBase64(base64);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("imageInput", null);
    setImagePreview(null);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-job-modal"
      aria-describedby="add-job-modal-description"
    >
      <Box 
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width:{
            xs: "90%",
            md: "60%",
            xl: "50%",
          },
        
          height: "70%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          outline: 0,
          borderRadius: 2,
        }}
      >
        <div className="flex flex-col xl:flex-row h-full gap-[2%]">
          <form
            onSubmit={formik.handleSubmit}
            className="overflow-auto custom-scrollbar "
          >
            <Typography id="add-job-modal-title" variant="h6" component="h2">
              Add Job
            </Typography>
            <div className="overflow-auto flex flex-col ">
              <div className="mb-4">
                <TextField
                  id="jobTitle"
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.jobTitle && Boolean(formik.errors.jobTitle)
                  }
                  helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="jobDescription"
                  label="Job Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={formik.values.jobDescription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.jobDescription &&
                    Boolean(formik.errors.jobDescription)
                  }
                  helperText={
                    formik.touched.jobDescription &&
                    formik.errors.jobDescription
                  }
                />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="imageInput"
                  className="block w-full h-32 px-[5%] text-wrap text-center bg-[#fcfcfc] border-gray-400  border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center"
                >
                  <span className="text-gray-500">
                    Drag and drop an image or click to upload
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <TextField
                  id="color"
                  label="Color"
                  placeholder="Blue Red Green"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="mb-4">
                <TextField
                  id="size"
                  label="Size"
                  placeholder="L Xl 2XL"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="mb-4">
                <TextField
                  type="number"
                  id="quantity"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="mb-4">
                <TextField
                  id="amount"
                  label="Amount"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="numOfApplicants"
                  label="Number of Applicants"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.numOfApplicants}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.numOfApplicants &&
                    Boolean(formik.errors.numOfApplicants)
                  }
                  helperText={
                    formik.touched.numOfApplicants &&
                    formik.errors.numOfApplicants
                  }
                />
              </div>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Submit
                </Button>
                <Button variant="contained" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </div>
          </form>
          {/* <div className="h-full px-[1.5px] bg-gray-100" /> */}
          <div className="flex w-full xl:w-[50%] justify-center h-full overflow-auto custom-scrollbar">
            <div className="h-screen w-[90%] p-[4%] bg-[#ededed52]">
              <div className="relative flex justify-center">
                {imagePreview && (
                  <>
                    <Image
                      alt="jobImage"
                      className="max-w-[40%] object-cover object-center rounded-xl h-[100%]"
                      src={imagePreview}
                      width={500}
                      height={500}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      X
                    </button>
                  </>
                )}
              </div>
              <div className="">
                <h2 className=" cursor-pointer font-sans text-black font-bold tracking-widest text-xl mb-2">
                  {formik.values.jobTitle}
                </h2>
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    {formik.values.jobDescription}
                  </p>
                  <div className="flex border-t border-gray-600 py-2">
                    <span className="text-black">Color: </span>
                    <span className="ml-auto text-black">
                      {formik.values.color}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-600 py-2">
                    <span className="text-black">Size: </span>
                    <span className="ml-auto text-black">
                      {formik.values.size}
                    </span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-600 py-2">
                    <span className="text-black">Quantity: </span>
                    <span className="ml-auto text-black">
                      {formik.values.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <span className="title-font font-medium text-2xl text-black mb-2 md:mb-0 md:mr-4">
                    ₹{formik.values.amount}
                  </span>
                  <div className="flex items-center md:ml-auto">
                    <button
                      className="ml-2 w-full bg-[#C84869] border-2 py-2 px-6 focus:outline-none hover:bg-[#A72447] rounded text-white font-semibold"
                      type="submit"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        formik.handleSubmit();
                      }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddJobCard;
