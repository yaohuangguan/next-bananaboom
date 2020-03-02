import React, { useEffect, useRef } from "react";
import './todo.scss'
const ToDoList = ({ todos, handleDone }) => {
  const todoRef = useRef(null);
  const markComplete = e => {
    const id = e.target.id;
    handleDone(id);
  };
  const markFail = e => {
    const id = e.target.id;
    handleDone(id);
  };
  const mapTodo = () => {
    return (
      <>
        {todos &&
          todos.map(({ todo, done, _id }, index) => (
            <div
              key={_id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <span>{index + 1}.</span>{" "}
                <span
                  className={`${done ? "line-through" : "todo"}`}
                  ref={todoRef}
                >
                  {todo}
                </span>
              </div>

              <span
                className="done"
                style={{ cursor: "pointer", fontSize: "20px" }}
              >
                {!done ? (
                  <span id={_id} onClick={markFail}>
                    ❌
                  </span>
                ) : (
                  <span id={_id} onClick={markComplete}>
                    ✅
                  </span>
                )}
              </span>
            </div>
          ))}
      </>
    );
  };
  return <>{mapTodo()}</>;
};

export default ToDoList;
