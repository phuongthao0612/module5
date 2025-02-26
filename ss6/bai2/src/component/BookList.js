import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as bookService from "../services/BookService";
import { toast } from "react-toastify";
import { Table, Button, Container } from "react-bootstrap";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getAll = async () => {
            let data = await bookService.getAllBooks();
            setBooks(data);
        };
        getAll();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await bookService.deleteBook(id);
                setBooks(books.filter((book) => book.id !== id));
                toast.success("Book deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete book!");
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Library</h2>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/books/create">
                    <Button variant="primary">Add a new Book</Button>
                </Link>
            </div>
            <Table striped bordered hover>
                <thead className="table-dark">
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.quantity}</td>
                        <td>
                            <Link to={`/books/edit/${book.id}`}>
                                <Button variant="warning" className="me-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleDelete(book.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default BookList;
