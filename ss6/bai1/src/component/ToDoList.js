import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/todos")
            .then(response => setTodos(response.data.slice(0, 3)))
            .catch(error => toast.error("Lỗi khi lấy dữ liệu!"));
    }, []);

    const addTodo = () => {
        if (!newTodo.trim()) {
            toast.warning("Vui lòng nhập nội dung!");
            return;
        }

        const newTask = { title: newTodo, completed: false };

        axios.post("http://localhost:8080/todos", newTask)
            .then(response => {
                setTodos([...todos, response.data]);
                setNewTodo("");
                toast.success("Thêm thành công!");
            })
            .catch(error => toast.error("Lỗi khi thêm todo!"));
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Todo List</h2>

            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Nhập todo..."
                style={{ padding: "5px", width: "200px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={addTodo} style={{ padding: "5px 10px" }}>Submit</button>

            <ul style={{ marginTop: "20px", listStyleType: "disc", textAlign: "left" }}>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default TodoList;
