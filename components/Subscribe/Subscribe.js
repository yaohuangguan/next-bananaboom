/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import SocialFooter from "../Footer/SocialFooter";
import { getLoading } from "../../utils/Utils";
import { useRouter } from "next/router";
import "./Subscribe.scss";
import Logs from "../Contents/Logs/Logs";

const mailApi = `https://qq.us20.list-manage.com/subscribe/post?u=192d7d7d1dcff6b2519629804&amp;id=4b2f990265`;
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
  const validEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const onLoading = () => {
    setloading(true);
    setTimeout(() => {
      document.getElementById("mce-EMAIL").value = "";
      const subscribe = document.getElementById("mc-embedded-subscribe");
      subscribe.textContent =
        router.pathname === "/" ? "Thank you!" : "感谢关注!";
    }, 5000);
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
  const subscribeButtonLoading = () => {
    return router.pathname === "/" ? "Subscribing..." : "正在关注...";
  };

  const subscribeButton = () => {
    return router.pathname === "/" ? "Subscribe" : "订阅";
  };
 
  return (
    <>
      <div className="text-center">
        <form
          action={mailApi}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate form-a"
          noValidate
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
            <button
              type="submit"
              disabled={!send}
              id="mc-embedded-subscribe"
              className="btn purple-gradient"
              onClick={onLoading}
            >
              {loading ? (
                <div>
                  {getLoading("purple")}
                  {subscribeButtonLoading()}
                </div>
              ) : (
                subscribeButton()
              )}
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
