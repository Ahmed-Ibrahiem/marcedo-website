const Form_errors_message = ({ message, style }) => {
  return <p className={`text-sm text-red-600  ${style || ""} `}>{message}</p>;
};

export default Form_errors_message;
