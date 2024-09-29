import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '@/graphql/mutations/addPost.mutations';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/users.queries';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import Image from 'next/image';

interface AddJobCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPostCard: React.FC<AddJobCardProps> = ({ isOpen, onClose }) => {
  const [createPost, { loading, error }] = useMutation(ADD_POST);
  const router = useRouter();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [imageBase64, setImageBase64] = React.useState<string>();
  const{data} = useQuery(GET_AUTHENTICATED_USER)

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      jobDescription: '',
      materialProvided: false,
      amount: '',
      numOfApplicants: 1,
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required('Required'),
      jobDescription: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      toast.success(`Success`);
      onClose();
      const postInput = {
        title: values.jobTitle,
        description: values.jobDescription,
        createdAt: '04-05-2024',
        image : imageBase64
      };
      console.log(postInput);

      try {
        await createPost({
          variables: {
            input: postInput,
          },
        })
          .then(() => toast.success(`Post Created`))
          .then(() => router.push(`/posts`))
      } catch (err) {
        toast.error(`error creating Post`);
        console.log(err);
      }

      try {
        const name = `${values.jobTitle}`;
        const message = `${data?.authUser?.name} created a New Post`;

        await axios.post("http://localhost:8080/api", { name, message })
            .then((res) => {
                console.log(res)
            })

        // console.log("submitted", name, message)
      } catch (error) {
        console.log(error);
        
      }
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


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-post-modal-title"
      aria-describedby="add-post-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="add-post-modal-title" variant="h5" component="h2" gutterBottom>
          Add Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
        <div className='flex justify-center'>
          {imagePreview && <Image src={imagePreview} alt='' className='w-full h-auto overflow-auto' width={60} height={50} style={{width : '30%'}} />}
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

          <TextField
            id="jobTitle"
            label="Post Title"
            variant="outlined"
            fullWidth
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            margin="normal"
          />
          <TextField
            id="jobDescription"
            label="Post Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            error={formik.touched.jobDescription && Boolean(formik.errors.jobDescription)}
            helperText={formik.touched.jobDescription && formik.errors.jobDescription}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPostCard;
