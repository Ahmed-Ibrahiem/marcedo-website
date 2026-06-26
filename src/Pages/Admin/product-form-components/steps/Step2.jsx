import React, { useEffect, useState } from "react";
import DropDownList from "../../components/DropDownList";
import { getAllBrands } from "../../../../services/BrandsServices";
import { getAllCategories } from "../../../../services/CategoriesServices";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Step2 = ({ ...props }) => {
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getBrands = async () => {
      const res = await getAllBrands();

      const brands = res.map((brand) => ({
        name: brand.name,
        id: brand.id,
      }));

      setAllBrands(brands);
    };

    const getCategories = async () => {
      const res = await getAllCategories();

      const categories = res
        .filter((categ) => !categ.parent_id)
        .map((category) => ({ name: category.name, id: category.id }));

      const subCategories = res
        .filter((categ) => categ.parent_id)
        .map((categ) => ({ name: categ.name, id: categ.id }));

      setAllCategories(categories);
      setSubCategories(subCategories);
    };
    getBrands();
    getCategories();
  }, []);

  return (
    <motion.form
      {...props}
      onSubmit={(e) => e.preventDefault()}
      className="w-full  bg-white rounded-sm p-2.5 shadow-[3px_3px_5px_var(--color-gray-300)] flex-start-col gap-4  "
    >
      <h1 className="font-bold">Basic Information</h1>

      <div className={boxStyle}>
        <label htmlFor="name" className={labelStyle}>
          Product Name
        </label>
        <input
          type="text"
          className={inputStyle}
          placeholder="Enter Product Name"
        />
      </div>

      <div className="w-full flex-start gap-4 flex-wrap sm:flex-nowrap">
        {allBrands.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${boxStyle}  grow`}
          >
            <p className={labelStyle}>Brand</p>
            <DropDownList
              listStyle={"w-full justify-between!"}
              currentSelect={"Select brand"}
              list={allBrands}
            />
          </motion.div>
        ) : (
          <SkeletonLoading />
        )}

        {allSubCategories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${boxStyle} grow`}
          >
            <p className={labelStyle}>Category</p>
            <DropDownList
              listStyle={"w-full justify-between!"}
              currentSelect={"Select category"}
              list={allCategories}
            />
          </motion.div>
        ) : (
          <SkeletonLoading />
        )}

        {allSubCategories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${boxStyle}  grow`}
          >
            <p className={labelStyle}>
              Sub Category <span className="text-gray">(optional)</span>
            </p>
            <DropDownList
              listStyle={"w-full justify-between!"}
              currentSelect={"Select category"}
              list={allSubCategories}
            />
          </motion.div>
        ) : (
          <SkeletonLoading />
        )}
      </div>
      <div className={boxStyle}>
        <label htmlFor="name" className={labelStyle}>
          Short Description
        </label>
        <textarea
          className={`${inputStyle} h-20`}
          placeholder="Enter short description"
        />
      </div>
      <div className="w-full  bg-orange-lite rounded-sm h-20 p-2.5">
        <div className="flex-start text-lg gap-1 font-bold text-orange">
          <div className="image-box w-6 h-6 ">
            <img src="/assets/images/idea.png" alt="" />
          </div>
          <h4>Tip</h4>
        </div>
        <p className="mt-2.5 text-sm">
          You can add product images, attributes, variants, pricing and more in
          the next steps.
        </p>
      </div>
    </motion.form>
  );
};

const SkeletonLoading = () => {
  return (
    <div className={`${boxStyle} w-81.5`}>
      <Skeleton width={100} height={15} />
      <Skeleton className="w-30! md:w-60! " height={35} />
    </div>
  );
};

const boxStyle = `
flex-start-col w-full gap-1.5 text-sm
`;

const inputStyle = `
border border-border p-1.5 rounded-sm w-full outline-transparent focus:outline-1 focus:outline-gray  duration-500!
`;

const labelStyle = `
font-bold
`;

export default Step2;
