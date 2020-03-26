/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from "next/router";

const ResumeListItem = ({ _id, title, _title, info, _info, url, degree }) => {
  const router = useRouter();
  return (
    <div className="col-md-6 m-4 mx-auto">
      <div className="bg-info rounded">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="text-white">
            <div className="first-content text-center p-2">
              <h3 className="" style={{ fontSize: "20px" }}>
                {router.asPath == "/resume/ch-cn" ? title : _title}
              </h3>
            </div>
          </div>
        </a>
      </div>

      <div className="">
        <h6 className="font-weight-bold">
          {router.asPath == "/resume/ch-cn" ? "简介" : "Details"}
        </h6>
        <a className="badge badge-info">{degree}</a>

        <p className="">
          {router.asPath == "/resume/ch-cn" ? info : _info}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="">
          {" "}
          {router.asPath == "/resume/ch-cn" ? "查看Demo" : "Check out Demo"}
        </a>
      </div>
    </div>
  );
};

export default ResumeListItem;
