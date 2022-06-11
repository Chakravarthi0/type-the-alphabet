const PrimaryButton = ({ fullWidth, clickHandler, children }) => {
  return (
    <button
      className={
        "py-2.5 px-5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out " +
        (fullWidth ? "w-full" : "")
      }
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export { PrimaryButton };
