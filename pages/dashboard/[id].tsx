
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import {changeUserName} from '../../service'
const dashboard = ({ currentUser, handleTheme,getUserProfile }:any) => {
  const [theme, setTheme] = useState('')
  function handleThemeBeforeServer() {
    if (typeof window !== "undefined") {
      let theme = handleTheme();
      return setTheme(theme);
    }
  }
  useEffect(() => {
    handleThemeBeforeServer();
    return () => {};
  }, []);
  const [newDisplayName, setdisplayName] = useState("");
  const [result, setresult] = useState("");
  const changeDisplayName = async (e) => {
    e.preventDefault();
    if (!newDisplayName || newDisplayName.trim() == "") {
      return setresult("要修改的用户名不能为空");
    }
    if (!currentUser._id) {
      return setresult("Google账户类型暂不支持名称更改");
    }
    const id = currentUser._id;
    const response = await changeUserName(id, {
      newDisplayName
    });
    setresult(response.message);
    getUserProfile();
    setdisplayName('')
  };
  const handleChange = e => {
    setdisplayName(e.target.value);
  };

  return (
    <Layout head={"用户中心 User Control"}>
      <div>
        {currentUser ? (
          <div className="text-center">
         
            此页面其他功能正在开发中...
            <div>
              用户名:{currentUser.displayName} 更改为 {newDisplayName}{" "}
            </div>
            <div className="change-name">
              <input
                className={`change-name-field ${theme === 'night' ? 'white-border':''}`}
                type="text"
                value={newDisplayName}
                onChange={handleChange}
              />
              <button
                className={`change-name-button ${theme === 'night' ? 'white' : ''}`}
                onClick={changeDisplayName}
              >
                修改用户名
              </button>
            </div>
            <br />
            <div className="text-danger">{result ? result : null}</div>
          </div>
        ) : null}
        <style jsx>
          {`
            .change-name {
              position: relative;
              width: 400px;
              margin: 0 auto;
            }
            .change-name-field {
              border-radius: 30px 0px 0px 30px;
              border:2px solid #333;
              width: 55.5%;
              height:30px;
            }
            .change-name-field:focus {
              border: none;
              outline: none;
              border: 2px solid #2eca6a;
              border-color: #2eca6a;
              box-shadow: none;
            }
            .change-name-field:focus + .change-name-button {
              border: 2px solid #2eca6a !important;
              background-color: #2eca6a !important;
            }
            .change-name-button {
              position: absolute;
              height:30px;
              background-color: #333333;
              transition: background-color 0.3s ease, border 0.3s ease;
              top: 0;
              border: 2px solid #333;
              right: 0px;
              border-radius:0px 30px 30px 0px;
              outline: none;
              color:#fff;
            }
            .white{
              background-color: #2eca6a !important;
              color:#fff;
              border: 2px solid #2eca6a;
            }
            .white-border{
              border-color:#fff;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default dashboard;
