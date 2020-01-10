import "./Logs.scss";
import LogItem from "./LogItem";
const Logs = ({ version, check,logs }) => {
  const openLogin = e => {
    const modalContainer = document.querySelector("#logs-container");
    modalContainer.removeAttribute("class");
    modalContainer.classList.add("popup");
  };
  const closeLogin = () => {
    document.getElementById("logs-container").classList.add("out");
  };
  return (
    <div>
      <p className="text-dark">
        {version}
        <img src="https://img.icons8.com/ios/20/000000/react-native.png" alt='react' />
        <a
          data-toggle="modal"
          data-target="#modalSocial"
          className="text-info"
          onClick={openLogin}
        >
          {check}
        </a>
      </p>

      <div
        id="logs-container"
        className="modal fade "
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog cascading-modal" role="document">
          <div className="modal-content">
            <div className="modal-header purple-gradient white-text">
              <h4 className="title">
                <i className="fas fa-users"></i> 网站更新日志 Logs of Updates
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeLogin}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body mb-0 text-center">
              {logs && logs.map(({_id, ...other}) => {
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
