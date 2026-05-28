import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbPackage } from "react-icons/tb";

const ProductShipping = ({ shippingInfo }) => {
  return (
    <ul className="flex-start-col gap-5 text-sm! ">
      <li className="flex-start gap-2.5 text-gray!">
        <TbPackage className="text-2xl " />
        <span>Orders ship within {shippingInfo.estimated_delivery_days}</span>
      </li>
      {shippingInfo.is_free && (
        <li className="flex-start gap-2.5 text-gray!">
          <LiaShippingFastSolid className="text-2xl" />
          <span>Hoorey ! This item ships free to the US</span>
        </li>
      )}
    </ul>
  );
};

export default ProductShipping;
