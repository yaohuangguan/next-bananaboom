/* eslint-disable jsx-a11y/anchor-is-valid */

const Logs = props => {
  return (
    <div>
      <p className="text-muted">
        {props.version}<img src="https://img.icons8.com/ios/20/000000/react-native.png"/>
        <a
          href=""
          data-toggle="modal"
          data-target="#modalSocial"
          className="text-secondary"
        >
          {props.check}
        </a>
      </p>

      <div
        className="modal fade"
        id="modalSocial"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
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
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body mb-0 text-center">
              <div>
                <h3>Version 1.0</h3>
                <p>Published at: 2019/08/02</p>
                <p>
                  Created App and homepage components, set up the home route and
                  prepare to launch 2 language option. Deployed on AWS.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 2.0</h3>
                <p>Published at: 2019/08/20</p>
                <p>
                  Finished Chinese and English homepage, resumes and their
                  routes, blog had its first update and added lightbox. Added
                  NotFound route to match any not existed routes to improve user
                  experienxe. Changed some contents of homepage statements.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 2.1</h3>
                <p>Published at: 2019/09/18</p>
                <p>
                  Updated the newest logo to bananaboom which i made from
                  designevo, added footer to show the last day of new updates.
                  Changed some contents of homepage statements.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 2.2</h3>
                <p>Published at: 2019/09/30</p>
                <p>
                  Changed some contents of homepage statements. Fixed various
                  bugs.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 3.0</h3>
                <p>Published at: 2019/10/12</p>
                <p>
                  Uploaded a new feature that allows users subscribing to my
                  website and receive the newest notifications about my blogs.
                  It is integrated in MailChimp Api.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 3.1</h3>
                <p>Published at: 2019/11/02</p>
                <p>
                  Changed contents of Blogs and Homepage. Added section in
                  homepage called my current project. Fixed some bugs during
                  testing.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 3.2</h3>
                <p>Published at: 2019/11/13</p>
                <p>
                  Converted routes to lazy loading and code spliting using
                  React.lazy as this site doesnt require SSR for now. Added
                  ErrorBoundary to catch JavaScript internal error occurance.
                  Fixed bugs.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 3.3</h3>
                <p>Published at: 2019/11/14</p>
                <p>
                  Redecorated the overall user interface, refactored repeating
                  code into more performance friendly code. fixed some bugs.
                </p>
              </div>
              <hr />
              <div>
                <h3>Version 3.4</h3>
                <p>Published at: 2019/11/26</p>
                <p>
                 Added a hamburger menu in order to show the better experience on mobile. Added SSL encryption and uploaded build file on aws Cloudfront with ACM and S3. 
                </p>
              </div>

              {/* end here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
