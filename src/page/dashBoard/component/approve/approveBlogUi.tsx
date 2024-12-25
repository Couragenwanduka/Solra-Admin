import BlogSmallText from '../../../../component/text/blogSmallText';
import { FaEdit } from "react-icons/fa";
import { MdOutlineArrowOutward } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../../../../hooks/readBlog';
import { Blog } from '../interface/blog';

interface Component {
  isBlog?: boolean;
  authorName: string;
  category: string;
  postDate: string;
  title: string;
  description: string;
  likes: number;
  shares:number | undefined;
  authorsPicture: string
  blog:Blog
}

const ApproveBlogUi: FC<Component> = ({
  isBlog,
  authorName,
  category,
  postDate,
  title,
  description,
  likes,
  shares,
  authorsPicture,
  blog
}) => {
  const { addBlog } = useBlogs();
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
            src={authorsPicture||'/image/Image.png'}
            alt={`Profile picture of ${authorName}`}
            className="md:w-[5rem] md:h-[5rem] rounded-full"
          />
        </div>
        <div className="mt-2 w-[60%]">
          <h1 className="text-[20px] font-inter">{authorName}</h1>
          <p className="font-inter text-text-colour text-[15px]">{category}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex justify-center items-center w-[80%] gap-3">
        <div className="w-[75%] flex flex-col gap-3">
          <p className="text-text-colour text-[17px] font-semibold mt-5">{postDate}</p>
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
             <Link to={`/blog/${blog._id}`}>
                  <span
                    className={` w-32  border border-[#1c1c1c] flex justify-center items-center pr-2 pl-2 md:pr-0 md:pl-0  md:h-10 h-10 rounded-lg font-inter md:text-[15px] text-[13px] gap-2 text-[#606060] cursor-pointer`}
                  >
                    ReadMore
                    <MdOutlineArrowOutward className="text-[#FFAC9D] lg:w-[20px] lg:h-[20px] w-[14px] h-[14px]" />
                  </span>
                </Link>
          </button>
          {isBlog && <Link to={''}><button className="text-pe w-32 rounded-md h-8 gap-3 text-text-colour mt-2 flex  flex-row-reverse justify-center items-center border border-peach"><FaEdit />Approve</button></Link>}
        </div>
      </div>
    </section>
  );
};

export default ApproveBlogUi;
