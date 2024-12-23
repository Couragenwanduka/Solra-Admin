import BlogSmallText from '../../../../component/text/blogSmallText';
import { FaEdit } from "react-icons/fa";
import ReadMoreButton from '../button/readMoreButton';
import { CiHeart } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../../../../hooks/readBlog';

interface Component {
  isAuthor?: boolean;
  author: { 
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    id: string;};
  category: {
    id: string;
    name: string;
  };
  postDate: Date;
  title: string;
  description: string;
  likes: number;
  shares: number | undefined;
  blog:Blog
}

interface Blog {
  isAuthor?: boolean;
  author: { 
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    id: string;
  };
  category: {
    id: string;
    name: string;
  };
  postDate: string;
  title: string;
  description: string;
  likes: number;
  shares: number;
  _id: string;
  contents:[{
    header:string;
    smallDescription:string;
    body:string
}]
  publicationDate: string;
  image?: string;
  video?: string;
  views?: number;
  sendBlog?: number;
  likesIp?: string[];
  isHeadLine?: boolean;
  pulicationDate: Date;
}

const ViewBlogUi: FC<Component> = ({
  isAuthor,
  author,
  category,
  postDate,
  title,
  description,
  likes,
  shares,
  blog
}) => {
  const { addBlog } = useBlogs();
  const formattedDate = new Date( postDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleOnCLick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addBlog(blog);
  }


  return (
    <section className="justify-between items-center w-full h-full border-t border-borderColor pb-5 hidden md:flex">
      {/* Author Section */}
      <div className="flex w-[30%]">
        <div className="w-[35%] flex justify-center items-start">
          <img
            src={ author.picture||'/image/Image.png'}
            alt={`Profile picture of ${author.firstName} ${author.lastName}`}
            className="md:w-[5rem] md:h-[5rem] rounded-full"
          />
        </div>
        <div className="mt-2 w-[60%]">
          <h1 className="text-[20px] font-inter">{author.firstName} {author.lastName}</h1>
          <p className="font-inter text-text-colour text-[15px]">{category.name}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex justify-center items-center w-[80%] gap-3">
        <div className="w-[75%] flex flex-col gap-3">
          <p className="text-text-colour text-[17px] font-semibold mt-5">{formattedDate}</p>
          <p className="text-[23px] font-semibold">{title}</p>
          <BlogSmallText text={description} />
          <div className="flex gap-5">
            {/* Like Button */}
            <button className="flex justify-center items-center border border-text-colour/50 w-20 gap-2 rounded-3xl h-10 ">
              <CiHeart className="text-gray-500" />
              <p className="text-gray-500">{likes}k</p>
            </button>
            {/* Share Button */}
            <button className="flex justify-center items-center border border-text-colour/50 w-20 gap-2 rounded-3xl h-10 ">
              <FiSend className="text-gray-500" />
              <p className="text-gray-500">{shares}k</p>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="w-[25%] flex flex-col justify-end">
          <button onClick={handleOnCLick}>
               <ReadMoreButton />
          </button>
        
          {/* {isAuthor && <Link to={`/edit/${blog._id}`} state={blog}><button className="text-pe w-32 rounded-md h-8 gap-3 text-text-colour mt-2 flex  flex-row-reverse justify-center items-center border border-peach"><FaEdit />Edit</button></Link>} */}
          {isAuthor && blog?._id && (
            <Link to={`/edit/${blog._id}`} state={blog}>
              <button className="text-pe w-32 rounded-md h-8 gap-3 text-text-colour mt-2 flex flex-row-reverse justify-center items-center border border-peach">
                <FaEdit /> Edit
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewBlogUi;
