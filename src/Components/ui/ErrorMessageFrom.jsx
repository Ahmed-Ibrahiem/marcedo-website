import React from "react";

const ErrorMessageFrom = ({ message, style }) => {
  return (
    <p
      className={`absolute left-0 top-[calc(100%)] text-xs font-semibold text-red-500 ${style || ""}`}
    >
      {message}
    </p>
  );
};

export default ErrorMessageFrom;
