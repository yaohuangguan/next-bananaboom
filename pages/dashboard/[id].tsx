import { useRouter } from "next/router";
import Layout from '../../components/Layout/Layout'
import { useEffect } from "react";
const dashboard = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      return currentUser ? null : router.back();
    };
    checkLogin();
    return () => {};
  },[currentUser]);
  return (
    <Layout>
      <div>
        {currentUser ? (
          <div>
            <div>{currentUser.displayName}</div>
            <input type="file" name="" id=""/>
          </div>
        ) : (
          <h2>You must log in to see this page</h2>
        )}
      </div>
    </Layout>
  );
};

export default dashboard;
