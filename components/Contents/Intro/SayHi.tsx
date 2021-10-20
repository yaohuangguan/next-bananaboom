import React from 'react'
import { useRouter } from "next/router";

const SayHi = () => {
    const router = useRouter()
    const sayHi = () => (router.pathname === "/" ? "Say Hi" : "打招呼");

    return (
        <>
        <p className="font-weight-bold">{sayHi()}</p>
        <p>
        <i className="fas fa-envelope"></i>Email:
          <a href="mailto:moviegoer24@gmail.com" className='white-text' >
            719919153@qq.com
          </a>
        </p>
        <p>
        <i className="fas fa-newspaper"></i>Blog:
          <a
            href="https://blog.csdn.net/samKnowsCoding"
            target="_blank"
            rel="noopener noreferrer"
            className='white-text'
          >
            samKnowsCoding
          </a>
        </p>
        <p>
        <i className="fab fa-medium"></i>Medium:
          <a
             className='white-text'
            href="https://medium.com/@yaob"
            target="_blank"
            rel="noopener noreferrer"
          >
            @yaob
          </a>
        </p>
      </>
    )
}

export default SayHi
