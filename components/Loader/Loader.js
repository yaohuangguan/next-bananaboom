const Loader = ({ color, size }) => {
  return (
    <div className='text-center'>
      <div
        className={`spinner-border ${color}`}
        style={{ width: `${size}`, height: `${size}` }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
