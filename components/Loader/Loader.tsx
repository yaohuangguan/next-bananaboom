const Loader = (p: { color: any; size: any }): JSX.Element => (
  <div className="text-center">
    <div
      className={`spinner-border ${p.color|| 'white-text'}`}
      style={{ width: `${p.size ||''}`, height: `${p.size || ''}` }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
