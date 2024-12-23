import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FcGoogle } from "react-icons/fc";
import { IoLogoTwitter } from "react-icons/io5";
import * as Yup from "yup";
import { PiEyeSlashLight } from "react-icons/pi";
import { LiaEyeSolid } from "react-icons/lia";
import { useMutation } from '@tanstack/react-query';
import loginUser from "../api";
import { User, UserResponse } from "../api/interface";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from "../../../hooks/userDetails";
import { Link } from "react-router-dom";

interface ErrorResponse {
  message: string;
}

const RightPanel = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handlePasswordVisiblity = () => {
        setPasswordVisible(prev => !prev)
    }

    // Mutation hook
    const mutation = useMutation<UserResponse, AxiosError<ErrorResponse>, User>({
      mutationFn: loginUser,
      onError: (error) => {
        const errorMessage = error instanceof Error && error.response?.data?.message
        ? error.response.data.message
        : 'An unexpected error occurred';

          toast.error( errorMessage);
          setIsLoading(false);  
      },
      onSuccess: (data) => {
          setIsLoading(false); 
          toast.success(data.message)
          Cookies.set('accessToken', data.accessToken, {expires: 0.125});  // store the JWT token in a cookie for future requests (3 hours)
          setUser(data.user); 
          setTimeout(() => {
            navigate('/');
          }, 5000)
      },
    });

    // Submit handler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (user: User, { setSubmitting, resetForm }: any) => {
      setIsLoading(true);  
      const values = {
        email: user.email,
        password: user.password,
      }
      mutation.mutate(values); 
      setSubmitting(false); 
      resetForm();
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
         .min(8, 'Password must be at least 8 characters')
        //  .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
         .required('Password is required'),
  
    });
  return (
   <main>
        <span>
            <h1 className="text-5xl font-inter  ">Welcome Back</h1>
            <h2 className="mt-5 text-text-colour underline font-thin text-sm"> Dont have an Account <Link to={'/signup'}><span className="text-muted-peach">SignUp</span></Link></h2>
        </span>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
         validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
           handleSubmit(values, {setSubmitting, resetForm})
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full mt-5 flex flex-col gap-5">
                
                <div>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="w-full h-14 bg-transparent border-b border-text-colour  focus:outline-none pl-2 text-lg placeholder:text-text-colour"
                    />
                    <ErrorMessage name="email" component="div" className="text-sm text-red-700 mt-1" />
                </div>
                <div>
                   <div className="flex ">
                        <Field
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="w-full h-14 bg-transparent border-b border-text-colour  focus:outline-none pl-2 text-lg placeholder:text-text-colour "
                            />
                            <button type="button" onClick={handlePasswordVisiblity} className={`text-text-colour hover:text-peach text-xl -ml-10 ${isPasswordVisible ? "text-text-colour" : "text-text-colour"}`}>
                                {isPasswordVisible? <PiEyeSlashLight/> : <LiaEyeSolid/>}
                            </button>
                   </div>
                    <ErrorMessage name="password" component="div" className="text-sm text-red-700 mt-1" />
                </div>
                
               <div className="flex justify-center items-center">
                    <button type="submit" className="mt-6 bg-peach text-black h-10 w-full rounded-md"  disabled={isSubmitting || isLoading}> {isLoading ? "logging in..." : "Login"}</button>
               </div>
            </Form>
          )}
        </Formik>
        <section className="flex justify-center items-center flex-col mt-8 gap-5">
        <div className="flex items-center justify-center w-full">
        <div className="border-t border-text-colour flex-grow mx-2"></div>
        <p className="text-text-colour text-sm">or register with</p>
        <div className="border-t border-text-colour flex-grow mx-2"></div>
        </div>
            <div className="flex justify-center items-center gap-5 w-full">
                <button className="w-full h-10 flex justify-center items-center bg-transparent border border-text-colour rounded-md focus:outline-none pl-2 text-base gap-2">
                     <FcGoogle />
                     Google
                </button>
                <button className="w-full h-10 flex justify-center items-center bg-transparent border border-text-colour rounded-md focus:outline-none pl-2 text-base gap-2">
                     <IoLogoTwitter  className="text-blue-700"/>
                     Twitter
                </button>
            </div>
        </section>
        <ToastContainer autoClose={5000} />
   </main>
  )
}

export default RightPanel
