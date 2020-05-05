import React, { useRef } from "react";
import Loader from "../../Loader/Loader";
import "./todo.scss";
export interface ITodoListItemProps {
  _id: string;
  loading: boolean;
  index: number;
  todo: string;
  todos: any;
  done: boolean;
  markComplete: any;
  markFail: any;
  todoRef: any;
}
export interface ITodoListProps {
  todos: any[];
  handleDone: any;
  loading: boolean;
}
const ToDoListItem = ({
  _id,
  loading,
  index,
  todo,
  todos,
  done,
  markComplete,
  markFail,
  todoRef,
}: ITodoListItemProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <span className="font-weight-bold">{todos.length - index}.</span>{" "}
        <span className={`${done ? "line-through" : "todo"}`} ref={todoRef}>
          {todo}
        </span>
      </div>

      <span className="done" style={{ cursor: "pointer", fontSize: "20px" }}>
        {!loading ? (
          !done ? (
            <span id={_id} onClick={markFail}>
              ❌
            </span>
          ) : (
            <span id={_id} onClick={markComplete}>
              ✅
            </span>
          )
        ) : (
          <Loader size="20px" color="text-secondary" />
        )}
      </span>
    </div>
  );
};
const ToDoList = ({ todos, handleDone, loading }:ITodoListProps) => {
  const todoRef = useRef(null);
  const markComplete = (e:any) => {
    const id = e.target.id;
    handleDone(id);
  };
  const markFail = (e:any) => {
    const id = e.target.id;
    handleDone(id);
  };

  return (
    <>
      {todos &&
        todos.map(({ todo, done, _id }, index) => (
          <ToDoListItem
            key={_id}
            _id={_id}
            index={index}
            loading={loading}
            todos={todos}
            todo={todo}
            done={done}
            markComplete={markComplete}
            markFail={markFail}
            todoRef={todoRef}
          ></ToDoListItem>
        ))}
    </>
  );
};

export default ToDoList;
