import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({ title: "", quantity: "" });

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                let response = await bookService.getBookById(id);
                if (response.data) {
                    setInitialValues({
                        title: response.data.title,
                        quantity: response.data.quantity,
                    });
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

    const handleSave = async (values) => {
        if (values.title === initialValues.title && values.quantity === initialValues.quantity) {
            toast.warning("Please update at least one field!");
            return;
        }
        try {
            await bookService.updateBook(id, values);
            toast.success("Book updated successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Failed to update book!");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Edit Book</h2>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={BookSchema}
                onSubmit={handleSave}
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
                        <Button type="submit" variant="warning" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default EditBook;

