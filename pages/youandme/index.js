import React,{useEffect} from 'react'
import {useRouter} from 'next/router'
const index = ({currentUser}) => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      if(currentUser){
        if(currentUser.vip){
          return null
        } 
      }
     return router.back();
    };
    checkLogin();
    return () => {};
  },[currentUser]);
  const getVip = () => currentUser ? currentUser.vip : null
  return (
    <div>
    {getVip() ? (<div className='row'>
      <div className="content col-md-6 p-3 m-3">
      <h1>Sam & Cennifer</h1>
        只有我们知道啊，宝贝 <br/>
        这是咱俩的秘密基地
      </div>

      <div className='input'>
        <input type="text"/> 
          <input type="submit" value='❤' />
      </div>
    </div>):null}
    </div>
     

  )
}

export default index
