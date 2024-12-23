/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from "formik";
import DropDown from "../component/dropDown/dropDown";
import ReactQuill from "react-quill";
import { useParams, useLocation } from "react-router-dom";
import HeaderNav from "../component/nav/header";
import apiFunctions from "../../api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Blog } from "../component/interface/blog";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PostModal from "../../../modal/post/postModal";


interface BlogComponent {
    blog: Blog;
}
interface UpdateBlogData {
    title:string
    description:string
    category:string
    header:string
    smallDescription:string
    body:string
    file:File | null

  }

const EditImagePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const blogFromState = location.state as BlogComponent;
  const [category, setCategory] = useState('')
  const [modalOpen, setModalOpen] = useState(false);

  const { data: blogData, isLoading, isError } = useQuery<BlogComponent>({
    queryKey: ["blogById"],
    queryFn: () => {
      if (!id) {
        throw new Error("Blog ID is undefined");
      }
      return apiFunctions.getBlogPostById(id);
    },
    initialData: blogFromState, // Use state if provided
  });

  const mutation = useMutation<UpdateBlogData, Error, UpdateBlogData>({
      mutationFn: async (data) => {
      if (!id) {
        throw new Error("Blog ID is undefined");
      }
      const response = await apiFunctions.updateBlogPost(id, data);
      if (!response) {
        throw new Error("Failed to update blog post");
      }
      return response;
    },
    onSuccess: () => {
        setModalOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 3000); // Adjust delay as needed
      },
      
    onError: (error) => {
      console.error("Error editing blog post:", error);
    },
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading blog post.</div>;
  }
  console.log(blogData, 'blog data');

  const validationSchema = Yup.object({
      title: Yup.string().min(17).max(54),
      description: Yup.string().min(85).max(139),
    });

  return (
    <main className="w-[99%] flex flex-col p-10 justify-center">
      <div>
        <HeaderNav />
      </div>
      <Formik
        initialValues={{
          title: blogData?.blog?.title || "",
          description: blogData?.blog?.description || "",
          header: blogData?.blog?.contents?.[0]?.header || "",
          smallDescription: blogData?.blog?.contents?.[0]?.smallDescription || "",
          body: blogData?.blog?.contents?.[0]?.body || "",
          file: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          mutation.mutate({ ...values, category });
        }}
      >
        <Form className="p-5 flex flex-col gap-5">
          <div>
            <Field
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="w-full h-14 bg-transparent border-b border-text-colour/50 text-[#979799] focus:outline-none text-lg placeholder:text-text-colour"
            />
          </div>
          <div>
            <Field
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none text-lg text-[#979799] placeholder:text-text-colour"
            />
          </div>
          <div>
            <DropDown setChoose={setCategory} />
          </div>
          <div>
            <Field
              type="text"
              name="header"
              className="border-b w-full bg-transparent h-14 text-[#979799] focus:outline-none border-text-colour/50 placeholder:text-text-colour"
              placeholder="Enter blog header"
            />
          </div>
          <div>
            <Field
              as="textarea"
              name="smallDescription"
              className="border-b w-full bg-transparent text-[#979799] h-20 resize-none focus:outline-none border-text-colour/50 placeholder:text-text-colour"
              placeholder="Enter small description"
            />
          </div>
          <div>
            <Field
              name="body"
              as={ReactQuill}
              theme="snow"
              placeholder="Enter paragraph content"
              className="h-56 placeholder:text-text-colour mt-5 text-[#979799]"
            />
          </div>
          <div className="mt-16">
          <Field name="file">
            {({ field, form }: { field: any; form: any }) => (
                <input
                type="file"
                id="image"
                onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    form.setFieldValue(field.name, file);
                }}
                className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none text-lg placeholder:text-text-colour"
                />
            )}
            </Field>

          </div>
          <div>
            {blogData?.blog?.image && (
                <img
                  src={blogData?.blog?.image}
                  alt="Blog Image"
                  className="h-48 w-48 object-cover"
                />
  
            )}
          </div>
          <button type="submit" className="mt-5 bg-peach text-white p-2 rounded">
            Save
          </button>
        </Form>
      </Formik>
      <PostModal isOpen={modalOpen} isClosed={() => setModalOpen(false)} text="Blog edit was successful" />
    </main>
  );
};

export default EditImagePost;
