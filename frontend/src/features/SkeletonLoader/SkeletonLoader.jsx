import React from 'react';
import './skeletonLoader.css'; 

const SkeletonLoader = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-8 mb-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-cyan-900 text-center underline mb-6 decoration-solid"></h1>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 xl:gap-x-8">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="relative animate-pulse">
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-200">
              <div className="absolute inset-0 bg-gray-300 shimmer"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-gray-300 h-4 w-3/4 rounded shimmer"></div>
              <div className="bg-gray-400 h-4 w-1/2 rounded shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
