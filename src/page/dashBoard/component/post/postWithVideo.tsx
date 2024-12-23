import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropDown from "../dropDown/dropDown";
import useLocalStorageVideo from "../../../../hooks/postBlogVideo";
import apiFunctions from "../../../api";
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import PostModal from "../../../../modal/post/postModal";

const PostWithVideo = () => {
  interface LocalValues {
    title?: { title: string };
    description?: { description: string };
    category?: { category: string };
    videoUrl?: { videoUrl: string };
  }

  const [localValues, setLocalValues] = useState<LocalValues | null>(null); // Store local storage data
  const [loading, setLoading] = useState(true); // Add loading state
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(17).max(54),
    description: Yup.string().required('Description is required').min(85).max(139),
    videoUrl: Yup.string().required('Video URL is required'),
  });
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorageVideo();
  const [category, setCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedData = getFromLocalStorage();
    setLocalValues(storedData); // Update state with retrieved data
    setLoading(false); // Once data is fetched, set loading to false
  }, [getFromLocalStorage]);

  const handleSaveToLocalStorage = (field: string, value: string | File, category: string) => {
    saveToLocalStorage(field, value, category);
  };

  const mutation = useMutation({
    mutationFn: apiFunctions.saveBlogVideo,
    onSuccess: () => {
        localStorage.removeItem('PostVideos')
        setLocalValues(null);
      setModalOpen(true);
    },
    onError: (error) => {
      console.error('Error saving data:', error);
    },
  });

  interface VideoData {
    title: { title: string };
    description: { description: string };
    category: string;
    video: { video: string };
  }

  interface FormValues {
    title: string;
    description: string;
    videoUrl: string;
  }

  const handleSubmit = (value: FormValues, resetForm: () => void) => {
    const videoData: VideoData = {
      title: { title: value.title },
      description: { description: value.description },
      category,
      video: { video: value.videoUrl },
    };
    mutation.mutate(videoData);
    resetForm();
  };

  if (loading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <main className="w-[89%]">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          title: localValues?.title?.title || '',
          description: localValues?.description?.description || '',
          category: localValues?.category?.category || '',
          videoUrl: localValues?.videoUrl?.videoUrl || '',
        }}
        onSubmit={(value, { resetForm }) => {
          handleSubmit(value, resetForm);
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
                className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none text-lg placeholder:text-text-colour"
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
                className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none  text-lg placeholder:text-text-colour"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = event.target;
                  handleSaveToLocalStorage(name, value, "description");
                  setFieldValue(name, value);
                }}
              />
              <ErrorMessage name="description" component="div" className="text-sm text-red-700 mt-1" />
            </div>
            <div>
              <DropDown setChoose={setCategory} />
            </div>
            <div>
              <Field
                type="text"
                name="videoUrl"
                id="videoUrl"
                placeholder="Video URL"
                className="w-full h-14 bg-transparent border-b border-text-colour/50 focus:outline-none  text-lg placeholder:text-text-colour"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, value } = event.target;
                  handleSaveToLocalStorage(name, value, "videoUrl");
                  setFieldValue(name, value);
                }}
              />
              <ErrorMessage name="videoUrl" component="div" className="text-sm text-red-700 mt-1" />
            </div>
            <div className="flex justify-center mt-10">
              <button type="submit" className="text-white bg-peach  text-xl px-10 py-2 rounded-md">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
      <PostModal isOpen={modalOpen} isClosed={() => setModalOpen(false)} text="Video Post created successfully" />
    </main>
  );
};

export default PostWithVideo;
