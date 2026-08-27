import { FaRegUser } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";

const CustomerInfo = ({ user }) => {
  return (
    <SectionWrapper icon={<FaRegUser />} title={"Customer"}>
      <div className="flex-start flex-col! sm:flex-row! gap-5 items-start! text-sm">
        {/* Avatar */}
        <div className="w-15 h-15 rounded-full text-2xl flex-center text-orange bg-orange-100 uppercase font-bold">
          {user.name.slice(0, 1)}
        </div>
        {/* Customer Data */}
        <div className="flex-start-col gap-1.5">
          <h3 className="font-semibold sm:line-clamp-1">{user.name}</h3>
          <p className="sm:line-clamp-1 break-all w-full">
            {user.user_email ? user.user_email : user.geust_email}
          </p>
          <p className="p-1.5 rounded-sm text-gray bg-gray-100">
            {user.user_id ? "Customer" : "Guest"}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CustomerInfo;
