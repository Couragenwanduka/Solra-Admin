import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropDown from "../dropDown/dropDown";
import BlogEditor from "./content";
import useLocalStorage from "../../../../hooks/postBlog";
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import apiFunctions from "../../../api";
import PostModal from "../../../../modal/post/postModal";


const PostWithImage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localValues, setLocalValues] = useState<any>(null); // Store local storage data
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();
  const [file, setFile] = useState<File>();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);


  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").min(17).max(54),
    description: Yup.string().required("Description is required").min(85).max(139),
    category: Yup.string().required("Category is required"),
    contents: Yup.string().required("Contents are required"),
    image: Yup.mixed().required("Image is required"),
  });

  useEffect(() => {
    const storedData = getFromLocalStorage();
    setLocalValues(storedData); // Update state with retrieved data
  }, [getFromLocalStorage]);

  const handleSaveToLocalStorage = (field: string, value: string | File, category: string) => {
    saveToLocalStorage(field, value, category);
  };

  const mutation = useMutation({
    mutationFn: apiFunctions.saveBlog,
    onSuccess: (data) => {
      if(data.status === 201){
      setIsLoading(false);
        setModalOpen(true);
      setIsSubmited(true)
      localStorage.removeItem('GetInFormation');
      }
      
    },
    onError: (error) => {
      setIsLoading(false);
      console.error('Error saving data:', error);
    },
  });

  const handleSubmit = () => {
    const storedData = getFromLocalStorage();
    mutation.mutate({ ...storedData, file });
  };

  return (
    <main className="w-[90%]">
      <Formik
        enableReinitialize
        initialValues={{
          title: localValues?.title?.title || "",
          description: localValues?.description?.description || "",
          table: localValues?.table || "",
          image: "",
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          console.log("Form Submitted");
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <Field
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                className="w-full h-14 bg-transparent border-b border-text-colour/50 text-[#979799] focus:outline-none text-lg placeholder:text-text-colour"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = event.target;
                  handleSaveToLocalStorage(name, value, "title");
                  setFieldValue(name, value);
                }}
              />
              <ErrorMessage name="title" component="div" className="text-sm text-red-700 mt-1" />
            </div>

            <div>
              <Field
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none text-lg text-[#979799]  placeholder:text-text-colour"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = event.target;
                  handleSaveToLocalStorage(name, value, "description");
                  setFieldValue(name, value);
                }}
              />
              <ErrorMessage name="description" component="div" className="text-sm text-red-700 mt-1" />
            </div>

            <div>
              <DropDown />
            </div>

            <div>
              <BlogEditor isSubmited={isSubmited} />
            </div>

            <div className="flex justify-between w-full">
              <input
                type="file"
                name="image"
                id="image"
                className="w-full mt-20 h-14 bg-transparent focus:outline-none pl-2 text-lg placeholder:text-text-colour file:bg-[#141414] file:text-text-colour file:w-32 file:border-none file:h-10 text-text-colour"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const selectedFile = event.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile); // Store the selected file
                    setFieldValue("image", selectedFile); // Formik will not set the value of file input directly
                  }
                }}
              />
              <ErrorMessage name="image" component="div" className="text-sm text-red-700 mt-1" />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-peach w-52 h-10 rounded-md text-[#141414] font-inter disabled:bg-transparent disabled:text-peach "
                onClick={handleSubmit}
                disabled={!file}
               // Disable button until form is valid and dirty
              >
                {isLoading ? "saving..." : "Save Blog"}
                
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <PostModal isOpen={modalOpen} isClosed={() => setModalOpen(false)} text="Blog upload was successful" />
    </main>
  );
};

export default PostWithImage;
