'use client';
import { FC } from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Component {
  text?: string;
  className?: string;
}

const ReadMoreButton: FC<Component> = ({
  text = 'ReadMore',
  className = 'md:w-32 ',
}) => {
  return (
    <Link to={'/blog'}>
      <span
        className={` ${className} border border-[#1c1c1c] flex justify-center items-center pr-2 pl-2 md:pr-0 md:pl-0  md:h-10 h-10 rounded-lg font-inter md:text-[15px] text-[13px] gap-2 text-[#606060] cursor-pointer`}
      >
        {text}
        <MdOutlineArrowOutward className="text-[#FFAC9D] lg:w-[20px] lg:h-[20px] w-[14px] h-[14px]" />
      </span>
    </Link>
  );
};

export default ReadMoreButton;
