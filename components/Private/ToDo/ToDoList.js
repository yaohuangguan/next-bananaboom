import React from "react";

const ToDoList = ({ todos, handleDone }) => {
  const mapTodo = () => {
    return (
      <div start="1">
        {todos &&
          todos.map(({ todo, done, _id }, index) => (
            <div key={_id} style={{ display: "flex", justifyContent:'space-between' }}>
              <div>
                <span>{index + 1}.</span> <span className="title">{todo}</span>
              </div>
              
                <span
                  className="done"
                  style={{ cursor: "pointer",fontSize:'20px' }}
                >
                  {!done ? (
                    <span id={_id} onClick={handleDone}>
                      ❌
                    </span>
                  ) : (
                    <span id={_id} onClick={handleDone}>
                      ✅
                    </span>
                  )}
                </span>
              </div>

          ))}
      </div>
    );
  };
  return <>{mapTodo()}</>;
};

export default ToDoList;
