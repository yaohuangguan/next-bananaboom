import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import api from "../../../utils/Api";
const ToDo = () => {
  const [title, settitle] = useState("");
  const [todos, settodos] = useState("");
  const [errors, seterrors] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    if (!title || title.trim() == "")
      return seterrors("可以一起做的事情有很多，老婆");
    const response = await api.post("/api/todo", { todo: title });
    const todos = await response.data;
    settodos(todos);
  };
  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await api.get("/api/todo");
        const todos = await response.data;
        console.log("todos", todos);
        settodos(todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
    return () => {};
  }, []);
  const handleDone = async id => {
    const response = await api.post(`/api/todo/done/${id}`);
    const todos = await response.data;
    settodos(todos);
  };
  const handleTitle = e => {
    return settitle(e.target.value);
  };
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        padding: "40px",
        borderRadius: "50px",
        marginBottom: "20px",
        position: "relative"
      }}
    >
      <span
        style={{ position: "absolute", top: 0, fontSize: "20px" }}
        className="text-secondary"
      >
        100件要一起做的事
      </span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <input
            type="text"
            name="title"
            onChange={handleTitle}
            style={{ borderRadius: "50px" }}
          />
        </label>

        <button className="btn-sm btn-pink" type="submit">
          添加
        </button>
      </form>
      {errors ? <span className="text-danger">{errors}</span> : null}
      <ToDoList todos={todos} handleDone={handleDone}></ToDoList>
    </div>
  );
};

export default ToDo;
