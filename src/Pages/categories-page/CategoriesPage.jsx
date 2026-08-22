import React, { useEffect, useLayoutEffect, useState } from "react";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import { Link, useParams } from "react-router-dom";
import { getCategoryBySlug } from "../../services/CategoriesServices";
import { getProductsByCategories } from "../../services/ProductsServices";
import {
  getCategoriesPageInfo,
  getFilterProducts,
} from "../../services/categoriesPageServices";
import LoadingScreen from "../../Components/ui/Loading/LoadingScreen";
import CategoriesSideBar from "./components/CategoriesSideBar/CategoriesSideBar";
import CategoriesContent from "./components/CategoriesContent/CategoriesContent";
import { FaBoxesStacked, FaBoxOpen, FaBoxTissue } from "react-icons/fa6";
import { useCategoriesContext } from "./context/CategoriesContext";

const CategoriesPage = () => {
  const { isLoading, isError, categoriesPageInfo } = useCategoriesContext();

  useLayoutEffect(() => {
    window.scrollTo({top: 0});
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && !isError && categoriesPageInfo && (
        <div>
          <Our_banner page_data={{ title: "Categories" }} />
          <div className="categories-container container mt-10 flex gap-12.5">
            <CategoriesSideBar />
            <CategoriesContent />
          </div>
        </div>
      )}

      {!isLoading && !categoriesPageInfo && (
        <div className="w-full py-20 px-5 flex-center-col gap-8">
          <div className="flex-center-col ">
            <FaBoxOpen className="text-orange text-8xl!" />
            <h2 className=" text-4xl font-semibold">Oops...!</h2>
          </div>
          <p className="text-lg text-gray">Something Went Wrong</p>
          <Link
            className="px-5 py-2.5 rounded-sm text-white! bg-orange border-2 border-orange hover:bg-transparent hover:text-orange! font-semibold"
            to={"/home"}
          >
            Go Back Home
          </Link>
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
