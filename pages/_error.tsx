import React from 'react'
import Layout from '../components/Layout/Layout'
import Link from 'next/link'
function Error({ statusCode }) {
  return (
    <Layout>
      <div className="purple-gradient text-white" style={{ height: "100vh" }}>
            <div className="row">
              <div className="col-md-6 mx-auto pt-5 text-center">
                <div className="orange w-100"></div>
                <h3>Error:{statusCode} <br/>请求不存在或正在建设</h3>
  
               
                <br />
                <h3>Oops! The Page You Requested is eating banana and busy!</h3>
               
                <div className="mx-auto">
                  <Link href="/">
                    <input
                      type="button"
                      className="btn btn-outline-white btn-xl"
                      value={"Take Me Back Now!!!"}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error