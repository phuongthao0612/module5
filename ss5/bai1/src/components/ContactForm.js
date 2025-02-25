import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";

function ContactForm() {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const validateContact = {
        name: Yup.string().required("Tên không được để trống."),
        email: Yup.string()
            .matches(/^[a-zA-Z0-9+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/, "Email không hợp lệ.")
            .required("Email không được để trống."),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Số điện thoại chứa 10 chữ số và không chứa ký tự khác.")
            .required("Số điện thoại không được để trống.")
    };

    const saveContact = (values, { resetForm }) => {
        console.log(values);
        toast.success("Thêm mới thành công!");
        resetForm();
    };

    return (
        <div>
            <Formik initialValues={contact} onSubmit={saveContact} validationSchema={Yup.object(validateContact)}>
                <Form className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Contact Form</h2>
                    <div>
                        Name: <Field name="name" type="text" placeholder="Name" />
                        <ErrorMessage name="name" component="p" className="error" />
                    </div>
                    <div>
                        Email: <Field name="email" type="email" placeholder="Email" />
                        <ErrorMessage name="email" component="p" className="error" />
                    </div>
                    <div>
                        Phone: <Field name="phone" type="text" placeholder="Phone" />
                        <ErrorMessage name="phone" component="p" className="error" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default ContactForm;
