import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as bookService from "../services/BookService";
import { toast } from "react-toastify";


const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                let response = await bookService.getBookById(id);
                if (response.data) {
                    setTitle(response.data.title);
                    setQuantity(response.data.quantity);
                } else {
                    toast.error("Book not found!");
                    navigate("/");
                }
            } catch (error) {
                toast.error("Error fetching book!");
            }
        };
        getBookDetails();
    }, [id, navigate]);

    const handleSave = async () => {
        if (!title.trim() || quantity === "") {
            toast.warning("Please update at least one field!");
            return;
        }

        const updatedBook = {};
        if (title.trim()) updatedBook.title = title;
        if (quantity !== "") updatedBook.quantity = Number(quantity);
        try {
            await bookService.updateBook(id, updatedBook);
            toast.success("Book updated successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Failed to update book!");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Edit Book</h2>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)} />
            <input type="number" value={quantity}
                   onChange={(e) => setQuantity(e.target.value)} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default EditBook;
