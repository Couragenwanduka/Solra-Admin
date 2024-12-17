import  { FC } from 'react';

interface Props {
  text: string;
  className?: string;
}

const SmallText: FC<Props> = ({ className, text }) => {
  return (
    <div
      className={`${className} font-outfit text-[15px] text-white text-opacity-50`}
    >
      {text}
    </div>
  );
};

export default SmallText;
