import SectionWrapper from "./SectionWrapper";
import { FaClock, FaLocationDot, FaStore } from "react-icons/fa6";
import { TbTruck } from "react-icons/tb";

const DeliveryInfo = ({ delivery }) => {
  return (
    <SectionWrapper icon={<TbTruck />} title={"Delivery Information"} >
      <div className="flex-start gap-5 items-start! text-sm">
        {/* Customer Data */}
        {delivery.type.trim().toLowerCase() === "pick-up" ? (
          <>
            <div className="flex-start-col gap-1.5">
              <h3 className="font-semibold text-orange">Store Pick Up</h3>
              <ul className="flex-start-col gap-2.5">
                <li className="flex-start gap-1.5">
                  <FaStore className="text-orange" /> <p>Pick Up From Store</p>
                </li>
                <li className="flex-start gap-1.5">
                  <FaLocationDot className="text-orange" />{" "}
                  <p>123 Main St, Cairo, Egypt Working</p>
                </li>
                <li className="flex-start gap-1.5">
                  <FaClock className="text-orange" /> <p>hours: 9AM - 9PM</p>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="text-orange">
              <TbTruck className="text-lg"/>
            </div>
            <ul className="flex-start-col gap-1.5">
              <li className="font-semibold text-orange">Shipping</li>
              <li>
                {delivery.address.firstName} {delivery.address.lastName}
              </li>
              <li>
                {delivery.address.state} , {delivery.address.city}
              </li>
              <li>{delivery.address.address}</li>
              <li>ZIP: {delivery.address.zipCode}</li>
            </ul>
          </>
        )}
      </div>
    </SectionWrapper>
  );
};

export default DeliveryInfo;
