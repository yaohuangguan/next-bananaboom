/* eslint-disable no-useless-escape */
import {useState,useEffect} from "react";
import "./Subscribe.scss";
import Logs from "../Contents/Logs/Logs";
const mailApi = `https://qq.us20.list-manage.com/subscribe/post?u=192d7d7d1dcff6b2519629804&amp;id=4b2f990265`
const Subscribe = ({ title, info, copyright, web_version, log }) =>  {
  const [email, setemail] = useState(null)
  const [send, setsend] = useState(false)
  const validEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  useEffect(() => {
    function test(){
      if(validEmail()){
         setsend(true) 
      } else {
         setsend(false)
      }}
      test()
    
  }, [validEmail])
  const getEmail = e => {
    setemail(e.target.value)
    e.target.style.color = "#6a82fb";
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
            target="blank"
            noValidate
          >
            <div className="mt-4 mb-2">{title}</div>{" "}
            <input
              type="email"
              name="EMAIL"
              className=" form-control form-control-lg form-control-a text-center"
              id="mce-EMAIL"
              onChange={getEmail}
              placeholder="请输入邮箱地址 Please enter email address"
              required
            />
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_0140596b9a2ba4744248b81e5_42a1ca9c11"
                className="form-control form-control-lg form-control-a"
                tabIndex="-1"
              />
            </div>
            <div className="clear">
              <input
                type="submit"
                value="Subscribe"
                disabled={!send}
                id="mc-embedded-subscribe"
                className="btn purple-gradient"
              />
            </div>
          </form>

          <div className="information">
            <p className="text-muted">
            <a
                href="https://s3.us-east-2.amazonaws.com/www.bananaboom.space/Mailchimp%E2%80%99s+Legal+Policies.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary"
              >
                     {info}
             
              </a>

            </p>
            <p className="text-muted">
             {copyright}
            </p>

            <Logs
              version={web_version}
              check={log}
            ></Logs>
          </div>
          <br />
          <br />
          <br />
        </div>
      </>
    );

}

export default Subscribe;
