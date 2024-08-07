import React from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "../../SkeletonLoader/SkeletonLoader"; // Import the SkeletonLoader

const HomeSectionCarousel = ({ data, section, isLoading }) => {
  return (
    <>
      <div className="px-5 mt-8 mb-10">
        <h1 className="text-4xl text-[#508C9B] text-center mb-10 decoration-solid">
          {section}
        </h1>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.map((product, idx) => (
              <Link
                key={idx}
                to={`/productdetails/${product._id}`}
                className="group"
                onClick={window.scrollTo(0, 0)}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.image.imageUrl}
                    alt={product.image.imageUrl}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                {product.stock <= 0 ? (
                  <div className="text-red-700 mt-2">Out of Stock</div>
                ) : (
                  <>
                    <p className="mt-1 line-through inline-block text-lg font-medium text-gray-500">
                      &#8377; {product.old_price}
                    </p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <p className="mt-1 text-lg inline-block font-medium text-gray-900">
                      &#8377; {product.new_price}
                    </p>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeSectionCarousel;
