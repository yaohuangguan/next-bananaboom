const Loader = (p: { color?: string; size?: string }): JSX.Element => (
  <div
    className={`spinner-border ${p.color || "white-text"}`}
    style={{ width: `${p.size || ""}`, height: `${p.size || ""}` }}
    role="status"
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loader;
