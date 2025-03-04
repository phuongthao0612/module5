import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as bookService from "../services/BookService";
import {toast} from "react-toastify";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Container, Button} from "react-bootstrap";
import * as categoryService from "../services/CategoryService";

const BookSchema = Yup.object().shape({
    title: Yup.string().trim().required("Title is required!"),
    quantity: Yup.number()
        .typeError("Quantity must be a number!")
        .integer("Quantity must be an integer!")
        .min(1, "Quantity must be at least 1!")
        .required("Quantity is required!"),
});

const EditBook = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({title: "", quantity: "", categories: "",});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                // Lấy danh mục từ API
                const categoryList = await categoryService.getAllCategories();
                setCategories(categoryList);

                let response = await bookService.getBookById(id);
                if (response.data) {
                    setInitialValues({
                        title: response.data.title,
                        quantity: response.data.quantity,
                        categories: response.data.categories ? response.data.categories.id : "", // Chỉ lấy ID

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
        if (values.title === initialValues.title &&
            values.quantity === initialValues.quantity &&
            values.categories === initialValues.categories) {
            toast.warning("Please update at least one field!");
            return;
        }
        try {
            const selectedCategory = categories.find((p) => String(p.id) === String(values.categories));

            const updatedBook = {
                ...values,
                categories: selectedCategory || null,
            };
            await bookService.updateBook(id, updatedBook);
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
                {({isSubmitting, setFieldValue}) => (
                    <Form className="d-flex flex-column align-items-center">
                        <div className="mb-3 w-50">
                            <Field name="title" type="text" className="form-control" placeholder="Title"/>
                            <ErrorMessage name="title" component="div" className="text-danger"/>
                        </div>
                        <div className="mb-3 w-50">
                            <Field name="quantity" type="number" className="form-control" placeholder="Quantity"/>
                            <ErrorMessage name="quantity" component="div" className="text-danger"/>
                        </div>
                        <div className="mb-3 w-50">
                            <Field
                                as="select"
                                name="categories"
                                className="form-select"
                                onChange={(e) => setFieldValue("categories", e.target.value || null)}
                            >
                                <option value="">Chọn phân loại</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categories" component="div" className="text-danger"/>
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

