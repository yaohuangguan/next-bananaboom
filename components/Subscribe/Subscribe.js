/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import SocialFooter from "../Footer/SocialFooter";
import { useRouter } from "next/router";
import "./Subscribe.scss";
import Logs from "../Contents/Logs/Logs";
import Loader from "../Loader/Loader";
import api from "../../utils/Api";
import SayHi from "../Contents/Intro/SayHi";
import EMAIL from "./EMAIL";
const Subscribe = ({
  title,
  info,
  copyright,
  web_version,
  logs_content,
  likes,
  _id
}) => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [send, setsend] = useState(false);
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState("");
  const [status, setstatus] = useState("");
  const [brand, setbrand] = useState("");
  const [opening, setopening] = useState(false);
  const emailSuggestions = EMAIL;

  const getSuggestion = email => {
    if (!email) return setopening(true);
    if (opening) {
      setopening(false);
    }
    if (email.includes("@")) {
      let result = emailSuggestions.map(
        each => `${email.split("@")[0] + each}`
      );
      let suggestions = result.filter(each =>
        each.includes(email.split("@")[1])
      );

      return suggestions.map((each, index) => (
        <div
          key={index}
          className="subscribe-suggestion-item"
          onClick={e => {
            setemail(e.target.innerText);
            deleteSuggestion(e);
          }}
        >
          {each}
        </div>
      ));
    } else {
      let suggestions = emailSuggestions.map(each => `${email + each}`);

      return suggestions.map((each, index) => (
        <div
          key={index}
          className="subscribe-suggestion-item"
          onClick={e => {
            setemail(e.target.innerText);
            deleteSuggestion(e);
          }}
        >
          {each}
        </div>
      ));
    }
  };
  const deleteSuggestion = e => {
    if (!email) return;
    setopening(true);
    // const items = document.querySelectorAll('.subscribe-suggestion-item')
    // while(list.lastElementChild){
    //   list.removeChild(list.lastElementChild)
    // }
  };
  const validEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!loading) {
      try {
        setloading(true);
        const response = await api.post("/api/auth/subscribe", { email });
        const data = await response.data;
        setresult(data.message);
        setstatus(data.status);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        setresult("Error happened.");
      }
    }
  };
  useEffect(() => {
    setbrand(window.location.hostname);
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
    getSuggestion(e.target.value);
  };

  const subscribeButton = () => {
    return router.pathname === "/" ? "Subscribe" : "订阅";
  };

  return (
    <div className="subscribe-container">
      <div className="brand-name">
        {brand && brand.split(".")[1] + "." + brand.split(".")[2]}
      </div>
      <div className="subscribe-wrapper">
        <div className="p-2 sayhi">
          <SayHi />
        </div>
        <div className="p-2 subscribe-form">
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
                  className="form-control form-control-a text-center "
                  id="mce-EMAIL"
                  value={email}
                  onChange={getEmail}
                  placeholder="Please enter email address"
                  required
                />
              </label>

              {!opening ? (
                <div className="subscribe-suggestion-list">
                 {getSuggestion(email)}
                </div>
              ) : null}
            </div>

            <div className="clear">
              {status && status === "success" ? (
                <div className="text-success">{result}</div>
              ) : (
                <div className="text-danger">{result}</div>
              )}
              <button
                type="submit"
                disabled={!send}
                id="mc-embedded-subscribe"
                className="btn btn-hover color-3"
              >
                {loading ? <Loader></Loader> : subscribeButton()}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="subscribe-footer">
        <SocialFooter likes={likes} _id={_id}></SocialFooter>
        <div className="information pb-3 text-center">
          <Logs version={web_version} logs={logs_content}></Logs>
          <p className="white-text">{copyright}</p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
