import { useState, useEffect } from "react";
import { ArrowUp } from "react-bootstrap-icons";

const ScrollToTopButton = () => {
   const [isVisible, setIsVisible] = useState(false);

   const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
         window.removeEventListener("scroll", toggleVisibility);
      };
   }, []);

   return (
      <button
         className={`btn btn-primary rounded-circle btn-scroll-to-top ${
            isVisible ? "visible" : ""
         }`}
         onClick={scrollToTop}
         aria-label="Scroll to top"
      >
         <ArrowUp />
      </button>
   );
};

export default ScrollToTopButton;
