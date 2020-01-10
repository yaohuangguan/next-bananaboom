import { useRouter } from "next/router";
import { useEffect } from "react";
const dashboard = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      return currentUser ? null : router.back();
    };
    checkLogin();
    return () => {};
  },[currentUser,router]);
  return (
    <div>
      {currentUser ? (
        <div>{currentUser.displayName}</div>
      ) : (
        <h2>You must log in to see this page</h2>
      )}
    </div>
  );
};

export default dashboard;
