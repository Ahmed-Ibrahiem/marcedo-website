import React, { memo, useEffect, useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbPackage } from "react-icons/tb";
import { getProductShipping } from "../../../services/productDetailsServices";

const ProductShipping = ({ productData }) => {
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    if (!productData) return;

    const getShipping = async () => {
      const shipping = await getProductShipping(productData.id);
      if (!shipping) return;
      setShippingInfo(shipping);
    };

    getShipping();
  }, [productData]);

  return (
    <>
      {shippingInfo && (
        <ul className="flex-start-col gap-5 text-sm! ">
          <li className="flex-start gap-2.5 text-gray!">
            <TbPackage className="text-2xl " />
            <span>
              Orders ship within {shippingInfo.estimated_delivery_days}
            </span>
          </li>
          {shippingInfo.is_free && (
            <li className="flex-start gap-2.5 text-gray!">
              <LiaShippingFastSolid className="text-2xl" />
              <span>Hoorey ! This item ships free to the US</span>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default React.memo(ProductShipping);
