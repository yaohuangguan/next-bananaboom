import "./Logs.scss";
import LogItem from "./LogItem";
const Logs = ({ version, logs }) => {
  const openLogs = e => {
    const modalContainer = document.querySelector(".logs-container");
    modalContainer.classList.remove("out");
    modalContainer.classList.add("popup");
  };
  const closeLogs = () => {
    document.querySelector(".logs-container").classList.add("out");
  };
  return (
    <div>
      <p className="text-dark">
        <a
          className="text-dark"
          onClick={openLogs}
          style={{ textDecoration: "underline" }}
        >
          {version}
          <i className="fab fa-react"></i>
        </a>
      </p>

      <div className="logs-container">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header purple-gradient white-text">
              <h4 className="title">网站更新日志 Logs of Updates</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeLogs}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body mb-0 text-center">
              {logs &&
                logs.map(({ _id, ...other }) => {
                  return <LogItem key={_id} {...other}></LogItem>;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
