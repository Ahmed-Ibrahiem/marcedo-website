import { Link } from "react-router-dom";
import style from "./Coming_soon.module.css";
import { use_notification_context } from "../../Context/Notification_provider";
const Custom_message_toast = () => {
  const { all_message, there_is_message } = use_notification_context();

  return (
    there_is_message && (
      <div className={style.message_container}>
        {all_message.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
      </div>
    )
  );
};

const Message = ({ message }) => {
  return (
    <div className={style.message}>
      <h3>
        {message && message.title
          ? message.title
          : "This Feature Will Comming Soon"}
      </h3>
      {message && message.link && (
        <Link to={message.link.url}>{message.link.name}</Link>
      )}
    </div>
  );
};

export default Custom_message_toast;
