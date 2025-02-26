import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as bookService from "../services/BookService";
import {toast} from "react-toastify";

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();

    const handleAdd = async () => {
        if (!title.trim() || !quantity.trim()) {
            toast.warning("Please enter both title and quantity!");
            return;
        }

        const newBook = {title, quantity: Number(quantity)};

        try {
            await bookService.saveBook(newBook);
            toast.success("Book added successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Failed to add book!");
        }
    };

    return (
        <div style={{textAlign: "center"}}>
            <h2>Add a new Book</h2>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
            <input type="number" value={quantity}
                   onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity"/>
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};

export default AddBook;
