import { FC } from 'react';

interface Text {
  className?: string;
  text: string;
}

const BlogSmallText: FC<Text> = ({
  className = 'md:text-[15px] text-[12px]',
  text,
}) => {
  return (
    <h3 className={`font-inter text-[#98989A] font-normal   ${className}`}>
      {text}
    </h3>
  );
};

export default BlogSmallText;
