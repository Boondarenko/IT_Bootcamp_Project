import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const InfiniteScrollLoader = ({ isLoading, onLoadMore }) => {
   const loaderRef = useRef();

   useEffect(() => {
      const options = {
         root: null,
         rootMargin: "20px",
         threshold: 1.0,
      };

      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting && isLoading) {
            onLoadMore();
         }
      }, options);

      const currentLoaderRef = loaderRef.current;

      if (currentLoaderRef) {
         observer.observe(currentLoaderRef);
      }

      return () => {
         if (currentLoaderRef) {
            observer.unobserve(currentLoaderRef);
         }
      };
   }, [isLoading, onLoadMore]);

   return (
      <div ref={loaderRef} className="text-center mt-4">
         {isLoading && <Spinner animation="border" variant="primary" />}
      </div>
   );
};

InfiniteScrollLoader.propTypes = {
   isLoading: PropTypes.bool.isRequired,
   onLoadMore: PropTypes.func.isRequired,
};

export default InfiniteScrollLoader;
