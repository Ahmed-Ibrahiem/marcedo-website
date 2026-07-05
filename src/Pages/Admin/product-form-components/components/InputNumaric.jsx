const InputNumaric = ({ inputName, children, ...props }) => {
  const blockInvalidPaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (!/^\d*\.?\d*$/.test(pasted)) {
      e.preventDefault();
    }
  };
  const blockInvalidChar = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className="box-form-style">
      <label className="label-form-style" htmlFor={""}>
        {inputName}
      </label>
      <input
        onKeyDown={blockInvalidChar}
        onPaste={blockInvalidPaste}
        type="number"
        className="input-form-style"
        {...props}
      />
      {children}
    </div>
  );
};
export default InputNumaric;
