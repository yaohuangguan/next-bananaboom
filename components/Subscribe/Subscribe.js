/* eslint-disable no-useless-escape */
import React from "react";
import "./Subscribe.scss";
import Logs from "../Contents/Logs/Logs";
class Subscribe extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      send: true
    };
  }
  validEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  };
  getEmail = e => {
    this.setState({ email: e.target.value }, () => {
      this.validEmail()
        ? this.setState({ send: false })
        : this.setState({ send: true });
    });
    e.target.style.color = "#6a82fb";
  };

  render() {
    const { title, info, copyright, web_version, log } = this.props;
    return (
      <>
        <div className="text-center">
          <form
            action="https://qq.us20.list-manage.com/subscribe/post?u=192d7d7d1dcff6b2519629804&amp;id=4b2f990265"
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
              onChange={this.getEmail}
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
                disabled={this.state.send}
                id="mc-embedded-subscribe"
                className="btn purple-gradient mt-2 mb-2 btn-rounded"
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
}

export default Subscribe;
