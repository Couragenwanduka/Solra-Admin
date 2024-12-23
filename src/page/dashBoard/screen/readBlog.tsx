import { useState, useEffect } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import BlogSmallText from '../../../component/text/blogSmallText';
import { FaHeart } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa6';
import { FiSend } from 'react-icons/fi';
import { useBlogs } from '../../../hooks/readBlog';



const ReadPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [body, setBody] = useState('');

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const { blogs } = useBlogs();

  const date = (publishedDate: Date | undefined) => {
    const formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) : 'Unknown Date';
    return formattedDate;
  };

  useEffect(()=>{
    blogs?.contents.map((content) => {
      setBody(content.body)    
   })
  }, [blogs])
 
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/html');
  const headers = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(header =>
    header?.textContent?.trim() || ''
  );


  return (
    <main className="bg-[#141414] font-inter">
         <section>
              <div className="relative flex flex-col justify-center items-center">
                <img
                  src={blogs?.image}
                  alt="Blog image"
                  className="w-full object-cover h-[21rem]"
                />
                <h1 className="text-white md:text-[50px] text-[25px]   font-inter font-bold  text-center">
                  {blogs?.title}
                </h1>
              </div>
            </section>
            <section className="flex flex-col-reverse md:flex-row md:mt-4 mt-20 ">
              {/* Main Content Section */}
              {blogs?.contents.map((content, index) => {
                return (
                  <div className="md:w-[65%] w-full" key={index}>
                    <div className="p-6 md:p-8 border-t border-r border-borderColor h-52 flex flex-col gap-3">
                      <h2 className="text-[20px]">{content.header}</h2>
                      <BlogSmallText text={content.smallDescription} />
                    </div>
                    <div className="relative p-6 md:p-8 border border-borderColor">
                      <div
                        className={`overflow-hidden ${
                          expanded ? 'h-auto' : 'h-[21.7rem]'
                        } relative transition-all duration-500`}
                        style={{
                          maskImage: expanded
                            ? 'none'
                            : 'linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                          WebkitMaskImage: expanded
                            ? 'none'
                            : 'linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                        }}
                      >
                         
                        <p className="font-inter text-[#98989A] font-normal md:text-[15px] text-[9px] content" dangerouslySetInnerHTML={{ __html: content.body }}></p>
                      </div>
                      <div className="flex justify-center items-center pb-5">
                        <button
                          onClick={toggleExpand}
                          className="mt-4 flex items-center font-inter border border-borderColor w-40 h-10 justify-center text-[16px] text-text-colour rounded-md"
                        >
                          {expanded ? 'Show Less' : 'Read Full Blog'}
                          <FaArrowDownLong
                            className={`ml-2 ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Sidebar Section */}
              <div className="md:w-[35%] w-full">
                <div className="flex justify-center items-center h-28 gap-4 md:gap-8 border-t border-b border-r border-borderColor">
                  <span className="flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-24 h-10 text-text-colour">
                    <FaHeart className="text-red-600" />
                    <span className="ml-2">{blogs?.likes}</span>
                  </span>
                  <span className="flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-24 h-10 text-text-colour">
                    <FaEye />
                    <span className="ml-2">{(blogs?.views ?? 1) + 1}</span>
                  </span>
                  <span className="flex justify-center items-center rounded-3xl border border-borderColor w-20 md:w-24 h-10 text-text-colour">
                    <FiSend />
                    <span className="ml-2">{blogs?.sendBlog}</span>
                  </span>
                </div>

                <div className=" border-r border-borderColor">
                  {/* Info Section */}
                  <div className="flex flex-col justify-center items-center h-auto md:h-[9.8rem] gap-5 p-4 md:pl-3">
                    <div className="flex justify-center w-full gap-5">
                      <span className="flex flex-col justify-center items-left text-left w-[59%]">
                        <p className="text-text-colour font-inter font-medium text-[15px]">
                          Publication Date
                        </p>
                        <p className="font-inter font-medium text-[14px]">
                          {date(blogs?.pulicationDate)}
                        </p>
                      </span>
                      <span className="flex flex-col justify-center items-left text-left w-[30%]">
                        <p className="text-text-colour font-inter font-medium text-[15px]">
                          Category
                        </p>
                        <p className="font-inter font-medium text-[14px]">
                          {blogs?.category.name}
                        </p>
                      </span>
                    </div>
                    <div className="flex justify-center w-full gap-5">
                      <span className="flex flex-col justify-center items-left text-left w-[59%]">
                        <p className="text-text-colour font-inter font-medium text-[15px]">
                          Reading Time
                        </p>
                        <p className="font-inter font-medium text-[14px]">
                          23 Min
                        </p>
                      </span>
                      <span className="flex flex-col justify-center items-left text-left w-[30%]">
                        <p className="text-text-colour font-inter font-medium text-[15px]">
                          Author
                        </p>
                        <p className="font-inter font-medium text-[14px]">
                          {blogs?.author.firstName} {blogs?.author.lastName}
                        </p>
                      </span>
                    </div>
                  </div>

                  {/* Table of Contents */}
                  <div className="flex flex-col justify-center items-center font-inter pb-5 p-5 md:p-0">
                    <div>
                      <h3 className="text-[15px] text-text-colour pb-5">
                        Table of contents
                      </h3>
                      <ul className="bg-[#191919] p-6 flex flex-col text-[14px] gap-2 rounded-md list-disc text-white pl-6">
                        {headers.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

      
    </main>
  );
};

export default ReadPage;
