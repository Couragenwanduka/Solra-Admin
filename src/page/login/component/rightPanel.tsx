import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FcGoogle } from "react-icons/fc";
import { IoLogoTwitter } from "react-icons/io5";
import * as Yup from "yup";
import { PiEyeSlashLight } from "react-icons/pi";
import { LiaEyeSolid } from "react-icons/lia";

const RightPanel = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisiblity = () => {
        setPasswordVisible(prev => !prev)
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
         .min(8, 'Password must be at least 8 characters')
         .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
         .required('Password is required'),
  
    });
  return (
   <main>
        <span>
            <h1 className="text-5xl font-inter  ">Create an account</h1>
            <h2 className="mt-5 text-text-colour underline font-thin text-sm"> Dont have an Account <span className="text-muted-peach">SignUp</span></h2>
        </span>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
         validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Simulate form submission
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
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
                    <button type="submit" className="mt-6 bg-peach text-black h-10 w-full rounded-md">Create Account</button>
               </div>
            </Form>
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
   </main>
  )
}

export default RightPanel
