/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from "next/router";
import { randomColor } from "../../../../utils/Utils";

const colors = [`blue`, `orange`, `cyan`, `indigo`, `green`];
const ResumeListItem = ({ _id, title, _title, info, _info, url, degrees }) => {
  const router = useRouter();
  return (
    <div className="col-md-6 m-4 mx-auto">
      <div className={`lighten-2 cyan rounded`}>
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
        <div className="tool-badges mb-3 mt-1">
          {degrees &&
            degrees.map((each, index) => (
              <a key={index} className={`badge lighten-2 ${randomColor(
                colors
              )} white-text mr-3`}>
                {each}
              </a>
            ))}
        </div>

        <p className="">{router.asPath == "/resume/ch-cn" ? info : _info}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="">
          {" "}
          {router.asPath == "/resume/ch-cn" ? "查看Demo" : "Check out Demo"}
        </a>
      </div>
    </div>
  );
};

export default ResumeListItem;
