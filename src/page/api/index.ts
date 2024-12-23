import axios from "axios";
import Cookies from 'js-cookie';
// import base64ToFile from "./base64ToFile";

const getCategory = async() => {
    try{
        const response = await axios.get('http://localhost:8000/category');
        return response.data;
    }catch(error){
        console.log('error', error);
    }
}

interface BlogData {
  title: { title: string };
  description: { description: string };
  category: { category: string };
  contents: { contents: { header: string; smallDescription: string; body: string } };
  file:{ image: File  }
}

const saveBlog = async (data: BlogData) => {
    try {
      // Create a FormData object
      const formData = new FormData();

      // Append fields to the FormData object
      formData.append("title", data.title.title);
      formData.append("description", data.description.description);
      formData.append("category", data.category.category);
      formData.append("header", data.contents.contents.header);
      formData.append("smallDescription", data.contents.contents.smallDescription);
      formData.append("body", data.contents.contents.body);
      const token = Cookies.get('accessToken');
      console.log(data.contents.contents, 'data',)


      if(data.file){
        formData.append("image", data.file )
      }

      // Send the FormData to the server
      const response = await axios.post('http://localhost:8000/blogPost/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure that content type is set to multipart
          'authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log('Error in saving blog post:', error);
    }
  };

  interface VideoData {
    title: { title: string };
    description: { description: string };
    category: string;
    video: { video: string };
  }

  const saveBlogVideo = async(data: VideoData) => {
    try {
      const sendData = {
        title: data.title.title,
        description: data.description.description,
        category: data.category,
        video: data.video.video,
      }
      const response = await axios.post('http://localhost:8000/videoPost', sendData, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log('Error in saving blog post with video:', error);
    }
  }

  const getAlLBlogPost = async() => {
    try{
        const response = await axios.get('http://localhost:8000/blogPost');
        return response.data;
    }catch(error){
        console.log('error', error);
    }
  }
  


const apiFunctions = {
    getCategory,
    saveBlog,
    saveBlogVideo,
    getAlLBlogPost,

}

export default apiFunctions;