import { FaCheck } from "react-icons/fa";
import "./Success_Toast.css";

const Success_Toast = ({ message }) => {
  return (
    <div className="success_operation">
      <p>{message}</p>
      <div className=" w-7.5! h-6.5! flex-center ">
        <FaCheck size={12} />
      </div>
    </div>
  );
};

export default Success_Toast;
