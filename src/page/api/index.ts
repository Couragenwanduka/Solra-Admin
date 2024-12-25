import axios from "axios";

// const baseUrl ='https://blog-solra-1.onrender.com'
const getCategory = async() => {
    try{
        const response = await axios.get('https://blog-solra-1.onrender.com/category');
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
  file:File
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
      const token = localStorage.getItem('accessToken');

      if(data.file){
        formData.append("image", data.file )
      }

      // Send the FormData to the server
      const response = await axios.post('https://blog-solra-1.onrender.com/blogPost/image', formData, {
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
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('https://blog-solra-1.onrender.com/videoPost', sendData, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
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
        const response = await axios.get('https://blog-solra-1.onrender.com/blogPost');
        return response.data;
    }catch(error){
        console.log('error', error);
    }
  }

  const getBlogPostById = async(id: string) => {
    try{
        const response = await axios.get(`https://blog-solra-1.onrender.com/blogPost/blog/${id}`);
        return response.data;
    }catch(error){
        console.log('error', error);
    }
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

  const updateBlogPost = async(id: string, data:UpdateBlogData): Promise<UpdateBlogData | null>  => {
    try {

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("header", data.header);
      formData.append("smallDescription", data.smallDescription);
      formData.append("body", data.body);
       if(data.file){
        formData.append("image", data.file )
      }
      const response = await axios.patch(`https://blog-solra-1.onrender.com/blogPost/update/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.log('Error in updating blog post:', error);
      return null;
    }
  }

  const PostStatusUpdate = async (id:string, status:string) => {
    try {
      const response = await axios.patch(`https://blog-solra-1.onrender.com/blogPost/status/${id}`, { status }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error in updating blog post status:', error);
    }
  }

  const CreateComment = async(postId:string, content:string, userId:string) => {
    try {
      const response = await axios.post(`https://blog-solra-1.onrender.com/comment`, { postId, content, userId }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error in creating comment:', error);
    }
  }

  const getCommentByBlogId = async(blogId: string) => {
    try {
      const response = await axios.get(`https://blog-solra-1.onrender.com/comment/${blogId}`);
      return response.data;
    } catch (error) {
      console.log('Error in getting comments by blog id:', error);
    }
  }

  const addReply = async(postId:string, reply:string, userId:string) => {
    try {
      const response = await axios.post(`https://blog-solra-1.onrender.com/comment/add-replies`, { postId, reply, userId }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error in adding reply:', error);
    }
  }
  
  const getAllUser = async() => {
    try{
        const response = await axios.get('https://blog-solra-1.onrender.com/user');
        return response.data;
    }catch(error){
        console.log('error', error);
    }
  } 

  const assignRole = async(id:string, role:string) => {
    try{
      const response = await axios.patch(`https://blog-solra-1.onrender.com/user/role/${id}`,{role},{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    }catch(error){
      console.log('error', error);
    }
  }

  const changeVerifyStatus = async(id: string, status: boolean) => {
    try {
      const response = await axios.patch(`https://blog-solra-1.onrender.com/user/verify/${id}`, { verify:status }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error in changing verify status:', error);
    }
  }

  const updateProfilePicture = async(id:string, file:File) =>{
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.patch(`https://blog-solra-1.onrender.com/user/profile-picture/${id}`, formData, {
        headers: {
          'Content-Type':'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error in updating profile picture:', error);
    }
  }


const apiFunctions = {
    getCategory,
    saveBlog,
    saveBlogVideo,
    getAlLBlogPost,
    getBlogPostById,
    updateBlogPost,
    PostStatusUpdate,
    CreateComment,
    getCommentByBlogId,
    addReply,
    getAllUser,
    assignRole,
    changeVerifyStatus,
    updateProfilePicture,
};

export default apiFunctions;