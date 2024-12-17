import { useState, useEffect } from "react";
import LogoSolra from "../../../component/Logo/Logo";

const RightPanel = () => {
  // State to track the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidingImage: Array<{ id: number; img: string; quote: string }> = [
    { id: 1, img: "/image/auth1.jpg", quote: "In a time of deceit telling the truth is a revolutionary act" },
    { id: 2, img: "/image/auth2.jpg", quote: "There is no charm equal to tenderness of heart." },
    { id: 3, img: "/image/auth3.jpg", quote: "The secret of getting ahead is getting started." },
    { id: 4, img: "/image/auth4.jpg", quote: "You cannot find peace by avoiding life." },
  ];

  // Function to move to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidingImage.length);
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slidingImage.length]);

  return (
    <main className="relative w-full h-screen">
      {slidingImage.map((image, index) => (
        <div
          key={image.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ display: index === currentSlide ? "block" : "none" }}
        >
          {/* Image */}
          <img src={image.img} alt={image.quote} className="w-full h-full object-cover" />

          {/* Overlay with logo and text */}
          <div className="absolute inset-0 flex flex-col justify-between h-full text-white z-10 px-4">
            <span className="pt-5">
              <LogoSolra />
            </span>
            <p className="text-center font-medium font-inter text-xl mt-auto pb-10 text-peach">{image.quote}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default RightPanel;
