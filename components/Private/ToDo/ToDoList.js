import React from "react";

const ToDoList = ({ todos, handleDone }) => {
  const mapTodo = () => {
    return (
      <>
        {todos &&
          todos.map(({ todo, done, _id }) => (
            <div
              key={_id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="title">{todo}</div>
              <div className="done">
                {!done ? (
                  <span id={_id} onClick={handleDone}>
                    ❌
                  </span>
                ) : (
                  <span id={_id} onClick={handleDone}>
                    ✅
                  </span>
                )}
              </div>
            </div>
          ))}
      </>
    );
  };
  return <>{mapTodo()}</>;
};

export default ToDoList;
