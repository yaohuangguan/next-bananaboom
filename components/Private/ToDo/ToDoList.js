import React, { useEffect, useRef } from "react";
import Loader from "../../Loader/Loader";
import "./todo.scss";
const ToDoList = ({ todos, handleDone, loading }) => {
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
                <span>{todos.length - index}.</span>{" "}
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
                {loading ? (
                  <Loader size={'20px'} color={'text-secondary'} />
                ) : !done ? (
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
