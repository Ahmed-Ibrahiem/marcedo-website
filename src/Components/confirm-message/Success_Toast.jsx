import "./Success_Toast.css";

const Success_Toast = ({ message }) => {
  return (
    <div className="success_operation">
      <p>{message}</p>
      <div>
        <i className="fa-solid fa-check"></i>
      </div>
    </div>
  );
};

export default Success_Toast;
