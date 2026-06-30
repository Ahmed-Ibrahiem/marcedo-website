import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import ErrorMessageFrom from "../../../../Components/ui/ErrorMessageFrom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ConfirmAdded from "../../../../Components/ui/ConfirmAdded";
import { addNewBrand } from "../../../../services/BrandsServices";

const AddNewBrandPopup = ({ allBrands, setAllBrands, setOpenBrandPopup }) => {
  const [loading, setLoading] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandLink, setBrandLink] = useState("");
  const [warningNameMessage, setWarningNameMessage] = useState("");
  const [linkWarning, setLinkWarning] = useState("");
  const [confirmAdded, setConfirmAdded] = useState(false);

  const handleAddBrand = async () => {
    try {
      setLoading(true);
      if (!brandName) {
        setWarningNameMessage("This field is required");
        return;
      }

      if (!brandLink) {
        setLinkWarning("This field is required");
        return;
      }

      const isExist = allBrands.find(
        (brand) =>
          brand.name.toLowerCase().trim() === brandName.toLowerCase().trim(),
      );

      if (isExist) {
        setWarningNameMessage("This brand is already exist");
        return;
      }

      const addBrand = async () => {
        const data = {
          name: brandName,
          link: brandLink,
        };

        const brandData = await addNewBrand(data);
        setAllBrands((prev) => [...prev, brandData]);
      };

      addBrand();

      setConfirmAdded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{
        y: 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 10,
          duration: 0.3,
          ease: "linear",
        },
      }}
      exit={{
        y: "-100%",
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 10,
          duration: 0.3,
          ease: "linear",
        },
      }}
      className="flex-center fixed top-0 left-0 w-full h-screen bg-black/50 cursor-crosshair z-50"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-120 h-90 flex-start-col relative  bg-white rounded-sm p-2.5 cursor-auto"
      >
        <div className="flex-between gap-5 w-full">
          <h1 className="font-bold">Add New Brand</h1>
          <button
            onClick={() => setOpenBrandPopup(false)}
            className="w-8 h-8 text-sm rounded-sm border border-border flex-center hover:bg-black hover:text-white"
          >
            <FaXmark />
          </button>
        </div>

        <div className="mt-5 flex-start-col gap-5 w-full">
          <div className={`box-form-style relative`}>
            <label className={`label-form-style`} htmlFor="name">
              Brand Name
            </label>
            <input
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
                setWarningNameMessage("");
              }}
              type="text"
              id="name"
              placeholder="Enter Your Brand Name"
              className={`input-form-style`}
            />
            {warningNameMessage && (
              <ErrorMessageFrom
                style={"-bottom-5"}
                message={warningNameMessage}
              />
            )}
          </div>

          <div className={`box-form-style`}>
            <label className={`label-form-style`} htmlFor="link">
              Brand Link
            </label>
            <input
              onChange={(e) => {
                setBrandLink(e.target.value);
                setLinkWarning("");
              }}
              id="link"
              type="text"
              placeholder="Enter Your Brand Link"
              className={`input-form-style`}
            />
            {linkWarning && (
              <ErrorMessageFrom style={"-bottom-5"} message={linkWarning} />
            )}
          </div>
        </div>

        <div className="flex-between gap-5 text-sm font-semibold mt-auto w-full">
          <button
            type="button"
            className="p-2 rounded-sm border border-border hover:bg-gray-light "
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddBrand()}
            type="button"
            className="p-2 rounded-sm border border-border hover:bg-orange hover:border-orange hover:text-white "
          >
            {" "}
            Save
          </button>
        </div>

        {loading && (
          <div className="bg-gray/30 text-xl w-full h-full absolute inset-0 flex-center-col gap-3.5">
            <AiOutlineLoading3Quarters
              size={30}
              className="loading-animate-1"
            />
            <p>Loading...</p>
          </div>
        )}

        {confirmAdded && (
          <ConfirmAdded
            confirmMessage={`Brand "${brandName}" Has Been Added Successfully`}
            actionFunc={() => {
              setConfirmAdded(false);
              setOpenBrandPopup(false);
            }}
          />
        )}
      </form>
    </motion.div>
  );
};

export default AddNewBrandPopup;
