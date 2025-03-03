import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as bookService from "../services/BookService";
import { toast } from "react-toastify";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryTerm, setCategoryTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        const getAll = async () => {
            let data = await bookService.getAllBooks();
            setBooks(data);
        };
        getAll();
    }, []);

    const handleShowModal = (id) => {
        setSelectedBookId(id);
        setShowModal(true);
    };

    // Lọc sách theo tiêu chí tìm kiếm
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryTerm === "" || book.categories?.name.toLowerCase().includes(categoryTerm.toLowerCase()))
    );

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBookId(null);
    };

    const handleDelete = async () => {
        if (selectedBookId) {
            try {
                await bookService.deleteBook(selectedBookId);
                setBooks(books.filter((book) => book.id !== selectedBookId));
                toast.success("Book deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete book!");
            }
        }
        handleCloseModal();
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Library</h2>
            {/* Form tìm kiếm */}
            <Form className="d-flex mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by title..."
                    className="me-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder="Search by category..."
                    className="me-2"
                    value={categoryTerm}
                    onChange={(e) => setCategoryTerm(e.target.value)}
                />
                <Button variant="secondary" onClick={() => { setSearchTerm(""); setCategoryTerm(""); }}>
                    Clear
                </Button>
            </Form>

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
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.quantity}</td>
                            <td>{book.categories?.name}</td>
                            <td>
                                <Link to={`/books/edit/${book.id}`}>
                                    <Button variant="warning" className="me-2">
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleShowModal(book.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">
                            No books found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this book?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BookList;
