import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import api from "../../utils/Api";
const dashboard = ({ currentUser }) => {
  const router = useRouter();
  const [newDisplayName, setdisplayName] = useState("");
  const [result, setresult] = useState("");

  const changeDisplayName = async () => {
    if (!newDisplayName || newDisplayName.trim() == "") {
      return setresult("要修改的用户名不能为空");
    }
    if (!currentUser._id) {
      return setresult("Google账户类型暂不支持名称更改");
    }
    const id = currentUser._id;
    const response = await api.post("/api/users/changeusername", {
      newDisplayName,
      id
    });
    const result = await response.data;
    console.log(result);
    setdisplayName(result.newDisplayName);
    setresult(result.message);
    localStorage.setItem("currentUser", JSON.stringify(result.userToSend));
    currentUser = result.userToSend;
    window.location.reload();
  };
  const handleChange = e => {
    setdisplayName(e.target.value);
  };
  const pushTo404 = () =>{
    if(typeof window !== 'undefined'){
      router.push('/notfound')
    }
  } 
  return (
    <Layout>
      <div>
        {currentUser ? (
          <div>
            <div>
              用户名:{currentUser.displayName} => {newDisplayName}{" "}
            </div>
            <input type="text" value={newDisplayName} onChange={handleChange} />
            <button
              className="btn-sm btn-hover color-3"
              onClick={changeDisplayName}
            >
              修改用户名
            </button>
            <br />
            <div className="text-danger">{result ? result : null}</div>
          </div>
        ) : pushTo404()}
      </div>
    </Layout>
  );
};

export default dashboard;
