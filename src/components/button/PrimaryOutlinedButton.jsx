const PrimaryOutlinedButton = ({ fullWidth, clickHandler, children }) => {
  return (
    <button
      className={
        `p-2.5 border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-800 
        dark:text-white rounded-xl shadow-md hover:shadow-lg
        transition duration-150 ease-in-out ` + (fullWidth ? "w-full" : "")
      }
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export { PrimaryOutlinedButton };
