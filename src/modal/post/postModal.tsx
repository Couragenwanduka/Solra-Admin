import { FC } from 'react';

interface Component {
  text: string;
  isOpen: boolean;
  isClosed: () => void; // Make sure this is a function
}

const PostModal: FC<Component> = ({ text, isOpen, isClosed }) => {
  return (
    <main>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-100 flex items-center justify-center">
          <div className="p-5 bg-white w-1/3 rounded-md flex  flex-col justify-center items-center">
            <img src="/icons/Steps indicator.svg" alt="Success Icon" />
            <h2 className="text-xl font-bold font-inter text-black">Successful</h2>
            <p className="text-lg font-bold font-inter text-black">{text}</p>
            <button
              onClick={isClosed} // Correct function call
              className="mt-5 text-red-600 hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PostModal;
