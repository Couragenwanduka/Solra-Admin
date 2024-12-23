import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useLocalStorage from '../../../../hooks/postBlog';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


type BlogContent = {
  header: string;
  smallDescription: string;
  body: string;
};

interface Props {
  isSubmited: boolean;
}

const BlogEditor: React.FC<Props> = ({isSubmited}) => {
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();
  const [contents, setContents] = useState<BlogContent>({
    header: '',
    smallDescription: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load content from local storage on component mount
  useEffect(() => {
    const storedData = getFromLocalStorage();
    if (storedData?.contents?.contents) {
      setContents(storedData.contents.contents); // Deeply nested structure
    } else if (storedData?.contents) {
      setContents(storedData.contents); // Simplified structure
    }
    setIsLoading(false);
  }, [getFromLocalStorage]);

  // Save content to local storage with a debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveToLocalStorage('contents', contents, 'contents');
    }, 500);
    return () => clearTimeout(timeout);
  }, [contents, saveToLocalStorage]);

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Handlers for content updates
  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContents({ ...contents, header: e.target.value });

  const handleSmallDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContents({ ...contents, smallDescription: e.target.value });

  const handleBodyChange = (value: string) => {
    setContents({ ...contents, body: value });
  };

  const validationSchema = Yup.object({
    header: Yup.string().required('Header is required'),
    smallDescription: Yup.string().required('Small description is required'),
  });

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ header: contents.header, smallDescription: contents.smallDescription }}
        onSubmit={(values, {resetForm}) => {
          if(isSubmited === true){
            resetForm();
          }
          console.log('Form Submitted', values);
        }}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <Field
                type="text"
                name="header"
                value={contents.header}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleHeaderChange(e);
                  setFieldValue('header', e.target.value);
                }}
                className="border-b w-full bg-transparent h-14 text-[#979799]  focus:outline-none border-text-colour/50 placeholder:text-text-colour"
                placeholder="Enter blog header"
              />
              <ErrorMessage name="header" component="div" className="text-sm text-red-700 mt-1" />
            </div>
            <div>
              <Field
                as="textarea"
                name="smallDescription"
                value={contents.smallDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleSmallDescriptionChange(e);
                  setFieldValue('smallDescription', e.target.value);
                }}
                className="border-b w-full bg-transparent text-[#979799]  h-20 resize-none focus:outline-none border-text-colour/50 placeholder:text-text-colour"
                placeholder="Enter small description"
              />
              <ErrorMessage name="smallDescription" component="div" className="text-sm text-red-700 mt-1" />
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <ReactQuill
          theme="snow"
          value={contents.body}
          onChange={(value) => handleBodyChange(value)}
          placeholder="Enter paragraph content"
          className="h-56 placeholder:text-text-colour mt-5 text-[#979799]"
        />
      </div>
    </div>
  );
};

export default BlogEditor;
