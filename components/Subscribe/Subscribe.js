/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import SocialFooter from "../Footer/SocialFooter";
import { getLoading } from "../../utils/Utils";
import { useRouter } from "next/router";
import "./Subscribe.scss";
import Logs from "../Contents/Logs/Logs";
import Loader from "../Loader/Loader";
import api from "../../utils/Api";

const Subscribe = ({
  title,
  info,
  copyright,
  web_version,
  log,
  logs_content,
  likes,
  _id
}) => {
  const router = useRouter();
  const [email, setemail] = useState(null);
  const [send, setsend] = useState(false);
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState("");
  const validEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await api.post("/api/auth/subscribe", { email });
      const data = await response.data;
      setresult(data.status);
    } catch (error) {
      setresult(error.status);
    }
    setloading(false);
  };
  useEffect(() => {
    function test() {
      if (document.getElementById("mce-EMAIL").value == "") {
        setsend(false);
      }
      if (validEmail()) {
        setsend(true);
      } else {
        setsend(false);
      }
    }
    test();
  });
  const getEmail = e => {
    setemail(e.target.value);
    e.target.style.color = "#6a82fb";
  };

  const subscribeButton = () => {
    return router.pathname === "/" ? "Subscribe" : "订阅";
  };

  return (
    <>
      <div className="text-center">
        <form
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate form-a"
          onSubmit={handleSubmit}
        >
          <div className="subscribe-button">
            <span className="subscribe-button-text">
              <a
                href="https://s3.us-east-2.amazonaws.com/www.bananaboom.space/Mailchimp%E2%80%99s+Legal+Policies.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {info}
              </a>
            </span>

            <label className="font-weight-bold" htmlFor="email">
              {title}

              <input
                type="email"
                name="EMAIL"
                className="form-control form-control-lg form-control-a text-center "
                id="mce-EMAIL"
                onChange={getEmail}
                placeholder="Please enter email address"
                required
              />
            </label>
          </div>

          <div className="clear">
            {result ? <div className="text-secondary">{result}</div> : null}
            <button
              type="submit"
              disabled={!send}
              id="mc-embedded-subscribe"
              className="btn purple-gradient"
            >
              {loading ? <Loader></Loader> : subscribeButton()}
            </button>
          </div>
        </form>

        <div className="information">
          <Logs version={web_version} check={log} logs={logs_content}></Logs>
          <p className="text-dark">{copyright}</p>
        </div>
        <SocialFooter likes={likes} _id={_id}></SocialFooter>
      </div>
    </>
  );
};

export default Subscribe;
