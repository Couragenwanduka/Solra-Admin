import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropDown from "../dropDown/dropDown";
import BlogEditor from "./content";

const PostWithImage = () => {
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').min(17).max(54),
        description: Yup.string().required('Description is required').min(85).max(139),
        category: Yup.string().required('Category is required'),
        contents: Yup.string().required('Contents are required'),
        table: Yup.string().required('Table is required'),
    });

  return (
    <main className="w-[89%] ">
        <Formik
        validationSchema={validationSchema}
        initialValues={{
            title: '',
            description: '',
            category: '',
            contents: '',
            table: '',
            image: null,
        }}
        onSubmit={()=>{console.log('something')}}
        >
            <Form>
                <div>
                    <Field
                       type="text"
                       name="title"
                       id="title"
                       placeholder="Title"
                       className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none text-lg placeholder:text-text-colour"
                    />
                    <ErrorMessage name="title" component="div" className="text-sm text-red-700 mt-1" />
                </div>
                <div>
                    <Field
                       type="text"
                       name="description"
                       id="description"
                       placeholder="Description"
                       className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none  text-lg placeholder:text-text-colour"
                    />
                    <ErrorMessage name="description" component="div" className="text-sm text-red-700 mt-1" />
                </div>
                <div>
                    <DropDown/>
                </div>
                <div>
                    <BlogEditor/>
                </div>
                <div>
                    <Field
                     type='file'
                     name='image'
                     id='image'
                     placeholder='Image'
                     className='w-full h-14 bg-transparent  focus:outline-none pl-2 text-lg placeholder:text-text-colour file:bg-[#141414] file:text-text-colour file:w-32 file:border-none file:h-10 text-text-colour'
                    />
                </div>
                <div className="flex justify-center">
                    <button  className="bg-peach w-52 h-10 rounded-md text-[#141414] font-inter">Save Blog</button>
                </div>
            </Form>
        </Formik>
    </main>
  )
}

export default PostWithImage