import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { addNewTodo, getTodo ,finishTodo} from "../../../service";
import Loader from "../../Loader/Loader";
import "./todo.scss";
const ToDo = () => {
  const [title, settitle] = useState("");
  const [todos, settodos] = useState([]);
  const [errors, seterrors] = useState("");
  const [loading, setloading] = useState(false);
  const [doneloading, setDoneloading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || title.trim() == "") return seterrors("不能为空");
    if (!loading) {
      setloading(true);
      const todos = await addNewTodo({ todo: title });
      settodos(todos);
      setloading(false);
    }
  };
  useEffect(() => {
    setloading(true);
    const refreshTodo = async () => {
      try {
        const todos = await getTodo();
        console.log("todos", todos);
        setloading(false);
        settodos(todos);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    refreshTodo();
    return () => {};
  }, []);
  const handleDone = async (id: string) => {
    try {
      setDoneloading(true);
      const todos = await finishTodo(id);
      settodos(todos);
      setDoneloading(false);
    } catch (error) {
      setDoneloading(false);

      seterrors(error + "");
    }
  };
  const handleTitle = (e: any) => {
    return settitle(e.target.value);
  };
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: "40px",
        borderRadius: "50px",
        marginBottom: "20px",
        position: "relative",
      }}
    >
      <span
        style={{ position: "absolute", top: 0, fontSize: "20px" }}
        className="text-secondary font-weight-bold"
      >
        Todo List
      </span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" style={{ position: "relative" }}>
          <input
            type="text"
            name="title"
            className="todo-input"
            onChange={handleTitle}
          />
          <button className="submit-button" type="submit">
            {!loading ? (
              <i className="fas fa-plus fa-lg"></i>
            ) : (
              <Loader size="20px" color="text-secondary" />
            )}
          </button>
        </label>
      </form>
      {errors ? <span className="text-danger">Error: {errors}</span> : null}
      {!loading ? (
        <ToDoList
          todos={todos}
          handleDone={handleDone}
          loading={doneloading}
        ></ToDoList>
      ) : (
        <Loader color={"text-secondary"} size={"60px"}></Loader>
      )}
    </div>
  );
};

export default ToDo;
