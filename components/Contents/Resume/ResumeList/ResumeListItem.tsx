/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from "next/router";

const ResumeListItem = ({ _id, title, _title, info, _info, url, degree }) => {
  const router = useRouter();
  return (
    <div className="col-md-6 mb-4">
      <div className="bg-primary" style={{ borderRadius: "50px" }}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="text-white">
            <div className="first-content text-center p-3">
              <h3 className="card-title" style={{ fontSize: "25px",letterSpacing:'3px' }}>
                {router.asPath == "/resume/ch-cn" ? title : _title}
              </h3>
            </div>
          </div>
        </a>
      </div>
      <div className="card-body white">
        <h4 className="text-uppercase font-weight-bold">
          {router.asPath == "/resume/ch-cn" ? "简介" : "Details"}
        </h4>
        <a className="badge badge-primary">{degree}</a>

        <p className="text-muted">
          {router.asPath == "/resume/ch-cn" ? info : _info}
        </p>
      </div>
    </div>
  );
};

export default ResumeListItem;
