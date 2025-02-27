import React from "react";
import { useNavigate } from "react-router-dom";
import * as bookService from "../services/BookService";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Button } from "react-bootstrap";

const BookSchema = Yup.object().shape({
    title: Yup.string().trim().required("Title is required!"),
    quantity: Yup.number()
        .typeError("Quantity must be a number!")
        .integer("Quantity must be an integer!")
        .min(1, "Quantity must be at least 1!")
        .required("Quantity is required!"),
});

const AddBook = () => {
    const navigate = useNavigate();

    const handleAdd = async (values, { resetForm }) => {
        try {
            await bookService.saveBook(values);
            toast.success("Book added successfully!");
            resetForm();
            navigate("/");
        } catch (error) {
            toast.error("Failed to add book!");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Add a New Book</h2>
            <Formik
                initialValues={{ title: "", quantity: "" }}
                validationSchema={BookSchema}
                onSubmit={handleAdd}
            >
                {({ isSubmitting }) => (
                    <Form className="d-flex flex-column align-items-center">
                        <div className="mb-3 w-50">
                            <Field name="title" type="text" className="form-control" placeholder="Title" />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3 w-50">
                            <Field name="quantity" type="number" className="form-control" placeholder="Quantity" />
                            <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Book"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AddBook;
