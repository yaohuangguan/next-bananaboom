/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from "next/router";

const ResumeListItem = ({ _id, title, _title, info, _info, url, degree }) => {
  const router = useRouter();
  return (
    <div className="col-md-6 mb-4">
      <div className="card gradient-card">
        <div
          className="card-image"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg')",
            overflow: "hidden"
          }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <div className="text-white d-flex h-100 blue-gradient-rgba">
              <div className="first-content align-self-center p-3">
                <h3 className="card-title" style={{ fontSize: "25px" }}>
                  {router.asPath == "/resume/ch-cn" ? title : _title}
                </h3>
                <p className="mb-0">
                  {router.asPath == "/resume/ch-cn"
                    ? "提示: 会打开外部链接"
                    : "This will open external link"}
                </p>
              </div>
            </div>
          </a>
        </div>

        <div className="third-content ml-auto mr-4 mb-2">
          <h6 className="font-weight-bold float-right">
            {" "}
            <span className="text-muted"></span>{" "}
            {router.asPath == "/resume/ch-cn" ? title : _title}
          </h6>
          <br />
          <a className="badge badge-primary float-right">{degree}</a>
        </div>

        <div className="card-body white">
          <h4 className="text-uppercase font-weight-bold">Details</h4>
          <p className="text-muted">
            {router.asPath == "/resume/ch-cn" ? info : _info}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeListItem;
