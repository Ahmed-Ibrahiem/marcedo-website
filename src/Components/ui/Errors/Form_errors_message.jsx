import style from "./Form_errors_message.module.css";
const Form_errors_message = ({ message }) => {
  return <p className={style.message}>{message}</p>;
};

export default Form_errors_message;
